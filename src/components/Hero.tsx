// src/components/Hero.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlide {
  badge: string;
  subtituloHeader: string;
  titulo: string;
  descricao: string;
  imagem: string;
  ctaText?: string;
  ctaLink?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    badge: "RESIDENCIAL DE ALTO PADRÃO",
    subtituloHeader: "Muito Além do Projeto: Conheça a Estrutura do Lumini 2",
    titulo: "LUMINI CLUBE RESIDENCIAL 2",
    descricao: "Engenharia de alta performance e sofisticação arquitetônica integradas ao seu estilo de vida.",
    imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2500",
    ctaText: "SAIBA MAIS",
    ctaLink: "#contato"
  },
  {
    badge: "INFRAESTRUTURA PARA GIGANTES GLOBAIS",
    subtituloHeader: "Engenharia de precisão e agilidade em escala global",
    titulo: "GALPÃO LOGÍSTICO AMAZON",
    descricao: "Megaobra corporativa executada sob os mais rigorosos padrões de prazos e excelência técnica.",
    imagem: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=2500",
    ctaText: "VER DETALHES",
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
    <section className="relative w-full h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-zinc-950">
      
      {/* Slides */}
      {DEFAULT_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100 z-10' 
              : 'opacity-0 scale-105 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image com Overlay Suave (não bloqueia totalmente a foto) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.imagem}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/40" />

          {/* Conteúdo Central - Alinhamento & Tipografia Ratio */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 mt-16 max-w-[1600px] mx-auto">
            
            {/* Subtítulo / Eyebrow Text no estilo Ratio */}
            <p className="text-zinc-300 text-xs md:text-sm font-light tracking-[0.3em] uppercase mb-6 max-w-3xl">
              {slide.subtituloHeader}
            </p>
            
            {/* TÍTULO PRINCIPAL: Ultra-fino, gigante, caixa alta e espaçado */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-extralight tracking-[0.18em] uppercase text-white leading-[1.1] font-sans max-w-6xl my-2">
              {slide.titulo}
            </h1>

            {/* Descrição curta */}
            <p className="mt-6 text-zinc-400 text-xs md:text-sm font-light max-w-xl tracking-widest font-sans leading-relaxed">
              {slide.descricao}
            </p>

            {/* BOTÃO CTA ESTILO RATIO (Pílula Outline Fina) */}
            <div className="mt-12">
              <a 
                href={slide.ctaLink} 
                className="inline-block border border-white/60 hover:border-amber-500 rounded-full px-10 py-3.5 text-[11px] font-semibold tracking-[0.25em] text-white hover:text-zinc-950 hover:bg-amber-500 transition-all duration-500 uppercase shadow-[0_0_25px_rgba(0,0,0,0.5)]"
              >
                {slide.ctaText}
              </a>
            </div>

          </div>
        </div>
      ))}

      {/* NAVEGAÇÃO LATERAL MINIMALISTA (Setas finas nas bordas da tela) */}
      <button
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-amber-500 transition-colors focus:outline-none"
      >
        <ChevronLeft className="w-10 h-10 stroke-[1]" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Próximo slide"
        className="absolute right-6 md:left-auto md:right-12 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-amber-500 transition-colors focus:outline-none"
      >
        <ChevronRight className="w-10 h-10 stroke-[1]" />
      </button>

      {/* BARRA DE DETALHE INFERIOR (Gold Accent Bar do Tema Ratio) */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 z-30 opacity-80" />

      {/* Indicadores do Paginador */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {DEFAULT_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-[2px] transition-all duration-500 ${
              idx === currentSlide ? 'w-12 bg-amber-500' : 'w-4 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

    </section>
  );
};