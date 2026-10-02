// src/lib/siteContent.ts
// Leitura do conteúdo editado em /admin (coleção site_data) pelas páginas públicas.
// Regra de ouro: a página SEMPRE começa mostrando o conteúdo padrão (o mesmo que
// já estava no ar) e só troca quando o Firestore responde com algo publicado.
// Assim nada pisca em branco e, se o Firestore falhar, o site continua inteiro.
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const isObj = (v: any) => v !== null && typeof v === 'object' && !Array.isArray(v);

/** Mescla o que veio do Firestore sobre o padrão: campo que falta (ou de tipo errado) ganha o valor padrão. Listas vindas do Firestore substituem as do padrão. */
export function mergeDeep<T>(base: T, extra: any): T {
  if (!isObj(base) || !isObj(extra)) return (extra === undefined || extra === null ? base : extra) as T;
  const out: any = { ...extra };
  for (const k of Object.keys(base as any)) {
    const b = (base as any)[k];
    const e = extra[k];
    if (isObj(b)) out[k] = mergeDeep(b, e);
    else if (Array.isArray(b)) out[k] = Array.isArray(e) ? e : b;
    else out[k] = e === undefined || e === null || typeof e !== typeof b ? b : e;
  }
  return out;
}

const cache = new Map<string, Promise<any | null>>();

const lerDoc = (id: string): Promise<any | null> => {
  let p = cache.get(id);
  if (!p) {
    p = getDoc(doc(db, 'site_data', id))
      .then((snap) => (snap.exists() ? snap.data() : null))
      .catch((error) => {
        console.error(`Erro ao ler site_data/${id} (usando o conteúdo padrão):`, error);
        cache.delete(id);
        return null;
      });
    cache.set(id, p);
  }
  return p;
};

/** Conteúdo da página: o padrão primeiro, o publicado no /admin assim que chegar. */
export function useSiteDoc<T>(docId: string, padrao: T): T {
  const [conteudo, setConteudo] = useState<T>(padrao);
  useEffect(() => {
    let ativo = true;
    lerDoc(docId).then((dados) => {
      if (ativo && dados) setConteudo(mergeDeep(padrao, dados));
    });
    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId]);
  return conteudo;
}

/** Só dígitos do telefone, para montar tel: e wa.me. */
export const soDigitos = (s: string) => s.replace(/\D/g, '');

export const hrefTelefone = (tel: string) => `tel:${soDigitos(tel)}`;

export const hrefWhatsapp = (tel: string) => {
  const d = soDigitos(tel);
  return `https://wa.me/${d.startsWith('55') ? d : `55${d}`}`;
};

import { DEFAULT_CONTATO_INFO, type ContatoInfo } from '../data/siteDefaults';

/** Telefone, e-mail, endereço e horário (cabeçalho, rodapé, home e página Contato). */
export const useContato = (): ContatoInfo => useSiteDoc<ContatoInfo>('contato', DEFAULT_CONTATO_INFO);

/** Link do Google Maps montado a partir do endereço cadastrado. */
export const hrefMapa = (c: ContatoInfo) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.enderecoLinha1}, ${c.enderecoLinha2}`)}`;
