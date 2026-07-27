// ============================================================================
// src/pages/Blog/BlogIndex.tsx
// ============================================================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { Hero } from '../../components/Hero';
import { fetchWordPressPosts } from '../../services/wordpressService';

export const BlogIndex: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchWordPressPosts(1, 10);
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
    <div className="w-full text-zinc-900 font-['Inter',sans-serif]">
      <Hero 
        eyebrow="Conteúdo Técnico"
        title="Notícias & Blog"
        subtitle="Acompanhe as últimas tendências, obras e inovações da Quattro Construtora."
        images={['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000']}
      />

      <section className="py-24 bg-white/90 backdrop-blur-xs border-b border-zinc-200/80">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800';
                const authorName = post._embedded?.author?.[0]?.name || 'Equipe Quattro';
                const postDate = new Date(post.date).toLocaleDateString('pt-BR');

                return (
                  <div key={post.id} className="bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img src={imageUrl} alt={post.title.rendered} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 md:p-8 space-y-4">
                      <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 font-['Montserrat',sans-serif]">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-amber-500" /> {postDate}</span>
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-amber-500" /> {authorName}</span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-950 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <div className="text-sm text-zinc-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors pt-4 group-hover:translate-x-1 duration-300 font-['Montserrat',sans-serif]">
                        <span>Ler Artigo</span>
                        <ArrowRight className="w-4 h-4" />
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