import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  serverTimestamp 
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

export interface Lead {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  empreendimentoId?: string;
  createdAt?: any;
}

export const getEmpreendimentos = async (): Promise<Empreendimento[]> => {
  const querySnapshot = await getDocs(collection(db, 'empreendimentos'));
  return querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Empreendimento[];
};

export const createLead = async (lead: Omit<Lead, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'leads'), {
    ...lead,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};