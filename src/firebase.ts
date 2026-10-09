// src/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Verifica se o Firebase já foi inicializado. Se não, inicializa. Se sim, usa o que já existe.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
// Autenticação do painel /admin (e-mail + senha). A proteção real dos dados
// está em firestore.rules / storage.rules — veja SEGURANCA.md.
export const auth = getAuth(app);

// SEGUNDO APP: envia as candidaturas do "Trabalhe Conosco" também para o Banco
// de Currículos do Quattro Conecta (config pública do Firebase; a segurança vem
// das Storage/Firestore Rules do projeto quattroconecta, não desta chave).
const quattroConectaConfig = {
  apiKey: "AIzaSyDAatBFFwfSnIb7g0u8fLBvBdFY2s4tJ54",
  authDomain: "quattroconecta.firebaseapp.com",
  projectId: "quattroconecta",
  storageBucket: "quattroconecta.firebasestorage.app",
  messagingSenderId: "938507899550",
  appId: "1:938507899550:web:767230b50e19bf172c618f",
};

const conectaApp = getApps().some((a) => a.name === 'quattroconecta')
  ? getApp('quattroconecta')
  : initializeApp(quattroConectaConfig, 'quattroconecta');
export const dbConecta = getFirestore(conectaApp);
export const storageConecta = getStorage(conectaApp);
