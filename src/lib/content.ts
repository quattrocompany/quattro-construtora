// src/lib/content.ts
//
// Funções de leitura/escrita do conteúdo do CMS no Firestore.
// Usadas tanto pelas páginas públicas (leitura) quanto pelo Admin (leitura + escrita).
//
// - Páginas (Home, Quem Somos, Serviços, Contato, Privacidade, Termos):
//   1 documento por página na coleção "pages", sobrescrito por inteiro a cada save.
// - Setores, Obras e Posts: coleções próprias, 1 documento por item.

import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  HomeContent,
  QuemSomosContent,
  ServicosContent,
  ContatoContent,
  LegalPageContent,
  Setor,
  Obra,
  BlogPost,
} from '../types/content';

// ---------------------------------------------------------------------------
// Páginas (documento único por página)
// ---------------------------------------------------------------------------

export type PageId = 'home' | 'quemSomos' | 'servicos' | 'contato' | 'privacidade' | 'termos';

// Mapeia cada PageId ao tipo de conteúdo esperado, pra getPageContent/savePageContent
// virem com o tipo certo sem precisar passar genérico manualmente toda vez.
export interface PageContentMap {
  home: HomeContent;
  quemSomos: QuemSomosContent;
  servicos: ServicosContent;
  contato: ContatoContent;
  privacidade: LegalPageContent;
  termos: LegalPageContent;
}

/**
 * Busca o conteúdo de uma página. Retorna null se o documento ainda não
 * existir no Firestore (ex: antes de rodarmos o script de seed).
 */
export const getPageContent = async <K extends PageId>(
  pageId: K
): Promise<PageContentMap[K] | null> => {
  const snap = await getDoc(doc(db, 'pages', pageId));
  if (!snap.exists()) return null;
  return snap.data() as PageContentMap[K];
};

/**
 * Salva (sobrescreve por inteiro) o conteúdo de uma página.
 * Usado pelo botão "Salvar" de cada aba do Admin.
 */
export const savePageContent = async <K extends PageId>(
  pageId: K,
  data: PageContentMap[K]
): Promise<boolean> => {
  try {
    await setDoc(doc(db, 'pages', pageId), data as any);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar a página "${pageId}":`, error);
    return false;
  }
};

// ---------------------------------------------------------------------------
// Setores
// ---------------------------------------------------------------------------

export const getSetores = async (): Promise<Setor[]> => {
  const snap = await getDocs(collection(db, 'setores'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Setor[];
};

/**
 * Cria (sem id) ou atualiza (com id) um setor.
 */
export const saveSetor = async (setor: Setor): Promise<boolean> => {
  try {
    if (setor.id) {
      const { id, ...rest } = setor;
      await updateDoc(doc(db, 'setores', id), rest as any);
    } else {
      await addDoc(collection(db, 'setores'), setor);
    }
    return true;
  } catch (error) {
    console.error('Erro ao salvar setor:', error);
    return false;
  }
};

export const deleteSetor = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'setores', id));
    return true;
  } catch (error) {
    console.error('Erro ao excluir setor:', error);
    return false;
  }
};

// ---------------------------------------------------------------------------
// Obras
// ---------------------------------------------------------------------------

export const getObras = async (): Promise<Obra[]> => {
  const snap = await getDocs(collection(db, 'obras'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Obra[];
};

export const getObrasByCategoria = async (categoriaSlug: string): Promise<Obra[]> => {
  const q = query(collection(db, 'obras'), where('categoriaSlug', '==', categoriaSlug));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Obra[];
};

export const getObraBySlug = async (slug: string): Promise<Obra | null> => {
  const q = query(collection(db, 'obras'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Obra;
};

export const saveObra = async (obra: Obra): Promise<boolean> => {
  try {
    if (obra.id) {
      const { id, ...rest } = obra;
      await updateDoc(doc(db, 'obras', id), rest as any);
    } else {
      await addDoc(collection(db, 'obras'), obra);
    }
    return true;
  } catch (error) {
    console.error('Erro ao salvar obra:', error);
    return false;
  }
};

export const deleteObra = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'obras', id));
    return true;
  } catch (error) {
    console.error('Erro ao excluir obra:', error);
    return false;
  }
};

// ---------------------------------------------------------------------------
// Blog (posts)
// ---------------------------------------------------------------------------

/**
 * Lista posts do blog. Por padrão só traz os publicados (published === true),
 * ordenados do mais novo pro mais antigo — é o que a página pública usa.
 * No Admin, chamar com onlyPublished=false pra ver rascunhos também.
 */
export const getPosts = async (onlyPublished = true): Promise<BlogPost[]> => {
  const postsRef = collection(db, 'posts');
  const q = onlyPublished
    ? query(postsRef, where('published', '==', true), orderBy('date', 'desc'))
    : query(postsRef, orderBy('date', 'desc'));

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as BlogPost[];
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const q = query(collection(db, 'posts'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as BlogPost;
};

export const savePost = async (post: BlogPost): Promise<boolean> => {
  try {
    if (post.id) {
      const { id, ...rest } = post;
      await updateDoc(doc(db, 'posts', id), rest as any);
    } else {
      await addDoc(collection(db, 'posts'), post);
    }
    return true;
  } catch (error) {
    console.error('Erro ao salvar post:', error);
    return false;
  }
};

export const deletePost = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'posts', id));
    return true;
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    return false;
  }
};
