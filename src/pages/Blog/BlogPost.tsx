// ============================================================================
// src/pages/Blog/BlogPost.tsx
// ============================================================================
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import type { BlogPost as BlogPostType } from '../../types';

// TODO (Etapa 2/5 do plano): trocar por uma leitura real do Firestore
// (coleção 'posts', filtrando por slug).
const fetchPostBySlug = async (_slug: string): Promise<BlogPostType | null> => {
  return null;
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      try {
        const data = await fetchPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error("Erro ao carregar o post:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900">Artigo não encontrado</h2>
        <Link to="/blog" className="text-amber-600 hover:underline">Voltar para o blog</Link>
      </div>
    );
  }

  const postDate = new Date(post.date).toLocaleDateString('pt-BR');

  return (
    <div className="w-full bg-white text-zinc-900 font-['Inter',sans-serif]">
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={post.coverImage} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center space-y-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors font-['Montserrat',sans-serif] mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para o Blog</span>
          </Link>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">{post.title}</h1>
          
          <div className="flex items-center justify-center gap-6 text-xs font-semibold text-zinc-400 font-['Montserrat',sans-serif] pt-6">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-500" /> {postDate}</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-amber-500" /> {post.author}</span>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white/90 backdrop-blur-xs">
        <div className="max-w-[800px] mx-auto px-6">
          <div 
            className="prose prose-zinc prose-lg max-w-none prose-headings:font-bold prose-a:text-amber-600 prose-img:rounded-2xl [&>p]:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </div>
  );
};