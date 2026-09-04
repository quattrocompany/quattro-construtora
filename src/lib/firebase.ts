// src/lib/firebase.ts
// Ponto único de acesso ao Firebase/Firestore do projeto.
// (Antes esta lógica estava duplicada entre src/lib/firebase.ts e
// src/services/firestoreService.ts, com nomes de campo inconsistentes
// entre eles: createdAt vs criadoEm. Unificado aqui.)

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

// ---------------------------------------------------------------------------
// Empreendimentos
// ---------------------------------------------------------------------------

export interface Empreendimento {
  id?: string;
  titulo: string;
  slug: string;
  status: 'Lançamento' | 'Em Obras' | 'Entregue';
  endereco: string;
  descricao: string;
  imagemCapa: string;
  galeria: string[];
  createdAt?: any;
}

export const getEmpreendimentos = async (): Promise<Empreendimento[]> => {
  const querySnapshot = await getDocs(collection(db, 'empreendimentos'));
  return querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Empreendimento[];
};

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
  empreendimentoId?: string;
  origem?: string;
  createdAt?: any;
}

export type LeadData = Omit<Lead, 'id' | 'createdAt'>;

/**
 * Salva a captação de lead (B2B/B2C) na coleção 'leads' do Firestore.
 * Retorna true/false para o formulário decidir o feedback ao usuário.
 */
export const saveLead = async (data: LeadData): Promise<boolean> => {
  try {
    await addDoc(collection(db, 'leads'), {
      ...data,
      origem: data.origem || 'Site Oficial Quattro',
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Erro ao salvar lead no Firestore:', error);
    return false;
  }
};
