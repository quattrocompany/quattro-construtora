import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlide {
  eyebrow: string;
  titulo: string;
  imagem: string;
  ctaText: string;
  ctaLink: string;
}

// Textos baseados na sua diretriz: mantive o template onde faltava info
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Construct Your Website in the Perfect Ratio",
    titulo: "THE ONLY WAY\nTO BUILD", // O \n força a quebra de linha igual ao tema
    imagem: "/img/bg_hero1.avif",
    ctaText: "PURCHASE",
    ctaLink: "#contato"
  },
  {
    eyebrow: "Infraestrutura para Gigantes Globais",
    titulo: "ENGENHARIA DE\nALTA PERFORMANCE",
    imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2500",
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
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-zinc-950 font-sans">
      
      {DEFAULT_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 z-10' 
              : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* 1. Imagem de Fundo com leve efeito de Ken Burns (scale) */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out ${
              index === currentSlide ? 'scale-100' : 'scale-110'
            }`}
            style={{ backgroundImage: `url('${slide.imagem}')` }}
          />
          
          {/* 2. Overlay Chumbo (Garante leitura sem matar a imagem) */}
          <div className="absolute inset-0 bg-zinc-950/60" />

          {/* 3. Container Principal - Alinhado à ESQUERDA e com mesma margem do Header */}
          <div className="absolute inset-0 flex items-center z-20">
            <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 pt-20">
              
              {/* Box de Conteúdo Limitado para não esticar demais */}
              <div className="max-w-5xl text-left">
                
                {/* Eyebrow: Texto leve, Sentence case, tamanho médio */}
                <p className="text-zinc-200 text-base md:text-xl font-light mb-4 drop-shadow-md">
                  {slide.eyebrow}
                </p>
                
                {/* Título: Gigante, Thin, Caixa Alta, tracking largo e permite quebra de linha */}
                <h1 className="text-5xl sm:text-7xl md:text-[90px] lg:text-[110px] xl:text-[130px] font-thin tracking-[0.08em] md:tracking-[0.15em] uppercase text-white leading-[1.05] drop-shadow-2xl whitespace-pre-line">
                  {slide.titulo}
                </h1>

                {/* Botão: Pill Outline, super delicado */}
                <div className="mt-12">
                  <a 
                    href={slide.ctaLink} 
                    className="inline-block rounded-full border border-white/50 px-10 py-3.5 text-[10px] md:text-[11px] font-medium tracking-[0.25em] text-white uppercase transition-all duration-500 hover:border-amber-500 hover:text-zinc-950 hover:bg-amber-500 backdrop-blur-sm"
                  >
                    {slide.ctaText}
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ========================================= */}
      {/* NAVEGAÇÃO LATERAL (Setas finas nas bordas) */}
      {/* ========================================= */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/40 hover:text-amber-500 transition-colors focus:outline-none"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-10 h-10 md:w-12 md:h-12 stroke-[0.5]" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/40 hover:text-amber-500 transition-colors focus:outline-none"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-10 h-10 md:w-12 md:h-12 stroke-[0.5]" />
      </button>

      {/* Linha de acabamento ouro sutil na base (opcional para dar um toque da construtora) */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500/30 z-30" />
    </section>
  );
};