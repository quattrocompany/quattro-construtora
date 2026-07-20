// src/components/Hero.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlide {
  eyebrow: string;
  titulo: string;
  imagem: string;
  ctaText?: string;
  ctaLink?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Construa o seu projeto na proporção perfeita",
    titulo: "A ÚNICA FORMA DE CONSTRUIR",
    imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2500",
    ctaText: "VER DETALHES",
    ctaLink: "#contato"
  },
  {
    eyebrow: "Infraestrutura para Gigantes Globais",
    titulo: "ENGENHARIA DE ALTA PERFORMANCE",
    imagem: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=2500",
    ctaText: "NOSSO PORTFÓLIO",
    ctaLink: "#contato"
  }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % DEFAULT_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + DEFAULT_SLIDES.length) % DEFAULT_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-zinc-950">
      
      {DEFAULT_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100 z-10' 
              : 'opacity-0 scale-105 z-0 pointer-events-none'
          }`}
        >
          {/* Imagem de Fundo */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.imagem}')` }}
          />
          {/* Overlay Cinza Chumbo (Elegante, não totalmente preto) */}
          <div className="absolute inset-0 bg-zinc-950/60" />

          {/* Conteúdo Centralizado - Layout Ratio */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 mt-16 max-w-[1800px] mx-auto">
            
            {/* Texto de Apoio (Eyebrow) - Minúsculo, espaçado */}
            <p className="text-zinc-300 text-[11px] md:text-[13px] font-light tracking-[0.3em] uppercase mb-6 drop-shadow-md">
              {slide.eyebrow}
            </p>
            
            {/* Título Estilo Ratio: Gigante, Ultra-Fino (font-thin/weight 100), Caixa Alta */}
            <h1 className="text-5xl sm:text-7xl md:text-[90px] lg:text-[110px] xl:text-[130px] font-thin tracking-[0.1em] md:tracking-[0.15em] uppercase text-white leading-[1.1] max-w-6xl drop-shadow-lg">
              {slide.titulo}
            </h1>

            {/* Botão Estilo Ratio: Pílula, linha fina, hover Ouro */}
            <div className="mt-14">
              <a 
                href={slide.ctaLink} 
                className="inline-block rounded-full border border-white/40 px-12 py-4 text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-white uppercase transition-all duration-500 hover:border-amber-500 hover:text-amber-500 bg-transparent hover:bg-amber-500/10"
              >
                {slide.ctaText}
              </a>
            </div>

          </div>
        </div>
      ))}

      {/* Setas Laterais (Linhas Finas) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/40 hover:text-amber-500 transition-colors"
      >
        <ChevronLeft className="w-12 h-12 stroke-[0.5]" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/40 hover:text-amber-500 transition-colors"
      >
        <ChevronRight className="w-12 h-12 stroke-[0.5]" />
      </button>

      {/* Barra Ouro Inferior (Detalhe sutil) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500/80 z-30" />
    </section>
  );
};