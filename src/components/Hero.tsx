// src/components/Hero.tsx
import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  bgImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow = "Engenharia de Alta Performance",
  title = "Construa o seu projeto na proporção perfeita",
  subtitle = "Mais de 15 anos de excelência técnica em obras industriais, hospitalares, corporativas e residenciais em todo o Brasil.",
  bgImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500",
  ctaText = "Iniciar Projeto",
  ctaLink = "#contato"
}) => {
  return (
    <section className="relative w-full h-screen min-h-[720px] flex items-center justify-center overflow-hidden bg-zinc-950 font-sans">
      {/* Background com efeito de iluminação quente e overlay chumbo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-[10000ms] ease-out"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />

      {/* Conteúdo Centralizado */}
      <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6 z-10 pt-20">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-[0.3em]">
            {eyebrow}
          </span>
        </div>

        {/* Headline Principal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-sans leading-tight drop-shadow-2xl">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>

        {/* Botão de Ação CTA */}
        <div className="pt-4">
          <a 
            href={ctaLink}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/10 hover:scale-105"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Detalhe de Acabamento no Rodapé do Hero */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-20" />
    </section>
  );
};