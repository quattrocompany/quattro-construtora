// ============================================================================
// src/pages/Blog/BlogIndex.tsx
// ============================================================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Loader2, ChevronRight } from 'lucide-react';
import type { BlogPost } from '../../types';

// TODO (Etapa 2/5 do plano): trocar por uma leitura real da coleção 'posts'
// no Firestore. Por enquanto a lista fica vazia e a seção mostra um estado
// "em breve" para não quebrar a página.
const fetchPosts = async (): Promise<BlogPost[]> => {
  return [];
};

export const BlogIndex: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/BG_CTA_QuattroInc_Site.jpeg"
            alt="Quattro Construtora - Blog"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat']">
              <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-amber-500 font-bold">Blog</span>
            </nav>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              NOTÍCIAS E <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                CONTEÚDOS
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Acompanhe as últimas tendências, análises de obras e inovações do setor no Brasil e no mundo.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          <div className="mb-12 space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Últimas Atualizações
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Artigos Recentes
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-zinc-300 rounded-3xl">
              <p className="text-zinc-500 font-sans text-sm">
                Nenhum artigo publicado ainda. Em breve, novidades por aqui.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const postDate = new Date(post.date).toLocaleDateString('pt-BR');

                return (
                  <div key={post.id} className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden group hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col h-full">
                    <div className="aspect-video overflow-hidden border-b border-zinc-100">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    
                    <div className="p-7 sm:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat'] mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" /> {postDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-amber-500" /> {post.author}
                        </span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-950 font-['Montserrat'] leading-snug line-clamp-2 mb-3">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-zinc-600 font-sans leading-relaxed line-clamp-3 mb-6 flex-1">
                        {post.excerpt}
                      </p>
                      
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 group-hover:text-amber-600 transition-colors mt-auto font-['Montserrat']"
                      >
                        <span>Ler Artigo</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};