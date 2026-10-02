// src/lib/blog.ts
// Leitura pública do Blog. A fonte oficial é o documento site_data/blog
// (editado em /admin > Blog). Se esse documento ainda não existir — ou o
// Firestore não responder — usa a lista estática de src/data/blogPosts.ts,
// para o site nunca ficar sem artigos.
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { BlogPost } from '../types';
import { blogPosts as blogPostsEstaticos } from '../data/blogPosts';

const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const semTags = (html: string) =>
  html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** Converte um artigo salvo pelo /admin (campo capaImage) para o formato BlogPost usado nas páginas. */
const doCms = (p: any): BlogPost => {
  const title = String(p?.title ?? '');
  const content = String(p?.content ?? '');
  const texto = semTags(content);
  const excerpt = String(p?.excerpt ?? '').trim() || (texto.length > 180 ? `${texto.slice(0, 180)}…` : texto);
  return {
    id: p?.id !== undefined ? String(p.id) : undefined,
    slug: slugify(String(p?.slug ?? '') || title),
    title,
    excerpt,
    content,
    coverImage: String(p?.capaImage || p?.coverImage || ''),
    author: String(p?.author ?? ''),
    date: String(p?.date ?? ''),
    published: p?.published !== false,
  };
};

const ordenar = (lista: BlogPost[]) =>
  [...lista].sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));

/** Artigos publicados, do mais novo para o mais antigo. */
export const getPostsPublicados = async (): Promise<BlogPost[]> => {
  try {
    const snap = await getDoc(doc(db, 'site_data', 'blog'));
    const posts = snap.exists() ? snap.data().posts : undefined;
    if (Array.isArray(posts)) {
      // O documento existe: ele manda (mesmo que a lista esteja vazia).
      return ordenar(posts.map(doCms).filter((p) => p.published && p.slug && p.title));
    }
  } catch (error) {
    console.error('Erro ao ler o blog no Firestore (usando a lista estática):', error);
  }
  return ordenar(blogPostsEstaticos.filter((p) => p.published));
};

export const getPostPorSlug = async (slug: string): Promise<BlogPost | null> =>
  (await getPostsPublicados()).find((p) => p.slug === slug) ?? null;

/**
 * Formata "2025-04-21" como 21/04/2025 sem passar por new Date(): datas só com
 * dia são lidas como UTC e, no Brasil (UTC-3), apareciam um dia antes.
 */
export const formatarData = (iso: string): string => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR');
};
