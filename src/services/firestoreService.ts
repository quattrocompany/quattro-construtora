import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface LeadData {
  nome: string;
  email: string;
  telefone: string;
  mensagem?: string;
  origem?: string;
}

/**
 * Salva a captação de lead B2B/B2C na coleção 'leads' do Firestore
 */
export async function saveLead(data: LeadData): Promise<boolean> {
  try {
    await addDoc(collection(db, 'leads'), {
      ...data,
      criadoEm: serverTimestamp(),
      origem: data.origem || 'Site Oficial Quattro'
    });
    return true;
  } catch (error) {
    console.error('Erro ao salvar lead no Firestore:', error);
    return false;
  }
}