// src/lib/firebase.ts
// Ponto único de acesso ao Firebase/Firestore do projeto.
// A inicialização do app fica em src/firebase.ts (antes havia uma segunda
// inicialização duplicada aqui).

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, dbConecta, storageConecta } from '../firebase';

export { db };

// ---------------------------------------------------------------------------
// Leads (formulário de contato / LeadForm)
// ---------------------------------------------------------------------------

export interface Lead {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  assunto?: string;
  mensagem?: string;
  termoAceito?: boolean;
  obraId?: string; // referencia Obra.id, quando o lead parte da página de uma obra
  origem?: string;
  createdAt?: any;
}

export type LeadData = Omit<Lead, 'id' | 'createdAt'>;

const cut = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/**
 * Salva a captação de lead (B2B/B2C) na coleção 'leads' do Firestore.
 * Só os campos esperados são enviados (lista fechada) e todos têm tamanho
 * máximo — o mesmo limite é exigido em firestore.rules.
 * Retorna true/false para o formulário decidir o feedback ao usuário.
 */
export const saveLead = async (data: LeadData): Promise<boolean> => {
  try {
    const payload: Record<string, unknown> = {
      nome: cut(data.nome, 120),
      email: cut(data.email, 160),
      telefone: cut(data.telefone, 30),
      empresa: cut(data.empresa, 120),
      assunto: cut(data.assunto, 60),
      mensagem: cut(data.mensagem, 2000),
      termoAceito: data.termoAceito === true,
      origem: 'Site Oficial Quattro',
      createdAt: serverTimestamp(),
    };
    if (data.obraId) payload.obraId = cut(String(data.obraId), 80);
    await addDoc(collection(db, 'leads'), payload);
    return true;
  } catch (error) {
    console.error('Erro ao salvar lead no Firestore:', error);
    return false;
  }
};

// ---------------------------------------------------------------------------
// Candidaturas (formulário Trabalhe Conosco / CareerForm)
// ---------------------------------------------------------------------------

export interface Candidatura {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  areaInteresse: string;
  mensagem?: string;
  curriculoUrl: string;
  curriculoNome?: string;
  termoAceito?: boolean;
  origem?: string;
  createdAt?: any;
}

export type CandidaturaData = Omit<Candidatura, 'id' | 'createdAt' | 'curriculoUrl'> & {
  curriculo: File;
};

/**
 * Envia o currículo (PDF/DOC/DOCX) para o Storage e grava a candidatura no
 * Firestore (coleção 'candidaturas'). Mesmo esquema de validação do saveLead:
 * lista fechada de campos, tamanhos máximos espelhados em firestore.rules e
 * storage.rules.
 */
const salvarNoProprio = async (data: CandidaturaData): Promise<boolean> => {
  try {
    const caminho = `curriculos/${Date.now()}_${data.curriculo.name}`;
    const storageRef = ref(storage, caminho);
    await uploadBytes(storageRef, data.curriculo, { contentType: data.curriculo.type });
    const curriculoUrl = await getDownloadURL(storageRef);

    const payload: Record<string, unknown> = {
      nome: cut(data.nome, 120),
      email: cut(data.email, 160),
      telefone: cut(data.telefone, 30),
      areaInteresse: cut(data.areaInteresse, 60),
      mensagem: cut(data.mensagem, 2000),
      curriculoUrl: cut(curriculoUrl, 500),
      curriculoNome: cut(data.curriculo.name, 200),
      termoAceito: data.termoAceito === true,
      origem: 'Site Oficial Quattro - Trabalhe Conosco',
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, 'candidaturas'), payload);
    return true;
  } catch (error) {
    console.error('Erro ao salvar candidatura no Firestore:', error);
    return false;
  }
};

/**
 * Cópia da candidatura para o Banco de Currículos do Quattro Conecta (RH).
 * Falhar aqui nunca deve impedir o envio da candidatura: erros só vão ao console.
 */
const enviarParaConecta = async (data: CandidaturaData): Promise<void> => {
  try {
    const nomeSeguro = data.curriculo.name.replace(/[^\w.\-]+/g, '_');
    const caminho = `curriculos_recebidos_site/${Date.now()}_${nomeSeguro}`;
    const storageRef = ref(storageConecta, caminho);
    await uploadBytes(storageRef, data.curriculo, { contentType: data.curriculo.type });
    const arquivoUrl = await getDownloadURL(storageRef);

    await addDoc(collection(dbConecta, 'curriculos_recebidos_site'), {
      nome: cut(data.nome, 120),
      email: cut(data.email, 160),
      telefone: cut(data.telefone, 30),
      areaInteresse: cut(data.areaInteresse, 60),
      cartaRecomendacao: cut(data.mensagem, 2000),
      arquivoUrl: cut(arquivoUrl, 700),
      arquivoNome: cut(data.curriculo.name, 200),
      termoAceito: data.termoAceito === true,
      origem: 'site_quattro_construtora',
      status: 'pendente_processamento',
      criadoEm: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao enviar candidatura ao Quattro Conecta:', error);
  }
};

/**
 * Salva a candidatura no Firebase do site (painel /admin) e, em paralelo,
 * envia uma cópia ao Banco de Currículos do Quattro Conecta.
 * O retorno depende só do salvamento no próprio site.
 */
export const saveCandidatura = async (data: CandidaturaData): Promise<boolean> => {
  const [ok] = await Promise.all([salvarNoProprio(data), enviarParaConecta(data)]);
  return ok;
};
