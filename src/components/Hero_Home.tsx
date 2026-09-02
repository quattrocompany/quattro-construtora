// src/components/Hero_Home.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type HeroMode = 'single' | 'carousel' | 'video';

interface HeroMedia {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export const Hero_Home: React.FC = () => {
  const mode = 'carousel' as HeroMode;

  const mediaList: HeroMedia[] = [
    { type: 'image', url: '/img/bg_hero1.avif', alt: 'Quattro Construtora - Obra 1' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000', alt: 'Quattro Construtora - Obra 2' },
    { type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-architectural-model-of-a-house-41561-large.mp4' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (mode !== 'carousel' || mediaList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mode, mediaList.length]);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
      {/* 1. MÍDIA DE FUNDO FULL WIDTH */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {mode === 'single' && (
          <img
            src="/img/bg_hero1.avif"
            alt="Quattro Construtora"
            className="w-full h-full object-cover object-center"
          />
        )}

        {mode === 'video' && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src={mediaList[2].url} type="video/mp4" />
          </video>
        )}

        {mode === 'carousel' && (
          <>
            {mediaList.map((media, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {media.type === 'video' ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                  >
                    <source src={media.url} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={media.url}
                    alt={media.alt || 'Quattro Construtora'}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* 2. LAYER BLUR EM TODA A ALTURA DO HERO */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />

      {/* 3. CONTEÚDO */}
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-between min-h-[50vh]">
        <div className="max-w-xl space-y-6 mt-8 sm:mt-12 mb-auto">
          {/* Chamada Principal Ajustada (Aumentado e Entrelinhas Reduzido) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.92]">
            ENGENHARIA <br />
            <span className="text-amber-500">DE ALTA PERFORMANCE</span> <br />
            E PRECISÃO
          </h1>

          {/* Descrição Ajustada (Tamanho do Texto Aumentado) */}
          <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed font-sans max-w-xl">
            Executamos projetos industriais, corporativos, farmacêuticos e residenciais com rigor técnico NBR, previsibilidade orçamentária e acabamento impecável.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Link
              to="/servicos"
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl group"
            >
              <span>Saiba Mais</span>
              <div className="w-6 h-6 bg-zinc-950/10 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              to="/contato"
              className="inline-flex items-center text-zinc-200 hover:text-amber-500 text-xs font-bold uppercase tracking-wider transition-colors py-3.5"
            >
              <span>Fale Conosco</span>
            </Link>
          </div>
        </div>

        {/* 4. CONTADOR GRÁFICO DE SLIDES */}
        {mode === 'carousel' && (
          <div className="flex items-center gap-2 pt-8">
            {mediaList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para o slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  index === currentIndex
                    ? 'w-10 bg-amber-500'
                    : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};