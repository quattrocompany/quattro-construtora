// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASqEfW7je_6yCi5vuQOvLzi6DAsRN9lYo",
  authDomain: "site-quattro-construtora.firebaseapp.com",
  projectId: "site-quattro-construtora",
  storageBucket: "site-quattro-construtora.firebasestorage.app",
  messagingSenderId: "655597182938",
  appId: "1:655597182938:web:cdb4f2a57b86986876eae3",
  measurementId: "G-F0X5MYB23L"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);