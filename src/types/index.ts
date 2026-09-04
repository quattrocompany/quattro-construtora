// src/types/index.ts

// Formato normalizado de post do blog. Substitui o shape bruto que vinha
// da API do WordPress (post._embedded, post.title.rendered, etc.).
// TODO (Etapa 2/5 do plano): popular via Firestore (coleção 'posts').
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML
  coverImage: string;
  author: string;
  date: string; // ISO date string
}
