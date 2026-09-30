// src/lib/firebase.ts
// Ponto único de acesso ao Firebase/Firestore do projeto.
// A inicialização do app fica em src/firebase.ts (antes havia uma segunda
// inicialização duplicada aqui).

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

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
