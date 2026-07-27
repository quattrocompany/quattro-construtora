// src/components/Hero.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  images?: string[];
  ctaText?: string;
  ctaLink?: string;
}

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=2000',
  'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000'
];

export const Hero: React.FC<HeroProps> = ({
  eyebrow = "Portfolio em Destaque",
  title = "Engenharia de Alta Performance para as Maiores Marcas do Brasil.",
  subtitle = "Da logística da Amazon ao padrão residencial do Lumini Clube, levamos construção inteligente, segura e acessível para projetos de empreendimentos corporativos, industriais, farmacêuticos e residenciais.",
  images = DEFAULT_IMAGES,
  ctaText = "Solicitar Orçamento",
  ctaLink = "/contato"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-screen min-h-[650px] max-h-[900px] bg-zinc-950 text-white overflow-hidden flex items-center">
      {/* CARROSSEL DE IMAGENS DE FUNDO */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          } transition-transform duration-[7000ms]`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${img}')` }}
          />
          {/* Overlays escuros para leitura e contraste */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/75 to-zinc-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />
        </div>
      ))}

      {/* CONTEÚDO PRINCIPAL (MANTIDO FIXO SOBRE O CARROSSEL) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-20">
        <div className="max-w-3xl space-y-6">
          
          {/* EYEBROW BADGE */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-[0.25em] font-['Montserrat',sans-serif] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{eyebrow}</span>
          </div>

          {/* TÍTULO DO HERO */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white font-['Inter',sans-serif]">
            {title}
          </h1>

          {/* SUBTEXTO */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl font-['Inter',sans-serif]">
            {subtitle}
          </p>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            {ctaLink.startsWith('/') ? (
              <Link
                to={ctaLink}
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 font-['Montserrat',sans-serif]"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <a
                href={ctaLink}
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 font-['Montserrat',sans-serif]"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

            <Link
              to="/setores"
              className="px-8 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-700/80 hover:border-amber-500/50 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 font-['Montserrat',sans-serif]"
            >
              <span>Conhecer Nossas Obras</span>
            </Link>
          </div>

        </div>
      </div>

      {/* CONTROLES DO CARROSSEL DE IMAGENS */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center gap-4">
        {/* Indicadores */}
        <div className="flex items-center gap-2 mr-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Setas de navegação */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-amber-500 hover:border-amber-500/50 transition-all cursor-pointer backdrop-blur-md"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-amber-500 hover:border-amber-500/50 transition-all cursor-pointer backdrop-blur-md"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detalhe de Acabamento no Rodapé do Hero */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-20" />
    </section>
  );
};