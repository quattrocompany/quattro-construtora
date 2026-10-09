import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbConecta } from '../firebase';

export interface VagaDivulgada { id: string; cargo: string; area: string; local: string; }

/** Vagas ativas marcadas no Quattro Conecta (Vagas e Carreira) para divulgação neste site. */
export async function listarVagasDivulgadas(site: 'inc' | 'construtora'): Promise<VagaDivulgada[]> {
  try {
    const snap = await getDocs(query(collection(dbConecta, 'vagas_internas'), where('divulgar', '==', true), where('status', '==', 'ativo')));
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as any) }))
      .filter((v) => Array.isArray(v.divulgarSites) && v.divulgarSites.includes(site))
      .map((v) => ({ id: v.id, cargo: String(v.cargo || ''), area: String(v.area || ''), local: String(v.local || '') }));
  } catch {
    return []; // sem vagas ou sem conexão: o formulário segue só com a opção geral
  }
}
