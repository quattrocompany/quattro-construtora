// src/components/Hero.tsx
import React from 'react';
import { ArrowRight, Phone, Star } from 'lucide-react';

export interface HeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  images?: string[];
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow = "4.9 • +15 Anos de Engenharia",
  title = "Engenharia de Alta Performance e Precisão",
  subtitle = "Executamos projetos industriais, corporativos, farmacêuticos e residenciais com rigor técnico NBR, previsibilidade orçamentária e acabamento impecável.",
  images,
  image,
  ctaText = "Solicitar Orçamento",
  ctaLink = "#contato"
}) => {
  const displayImage = image || (images && images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200");

  return (
    <section className="w-full bg-zinc-950 text-white pt-32 pb-20 border-b border-zinc-800 relative overflow-hidden font-['Inter',sans-serif]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Conteúdo Principal */}
        <div className="lg:col-span-7 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5">
            <div className="flex text-amber-500 space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-300 font-['Montserrat',sans-serif]">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-['Montserrat',sans-serif] uppercase tracking-tight leading-[1.05]">
            {title}
          </h1>

          <p className="text-zinc-400 text-sm md:text-base max-w-xl font-normal leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl font-['Montserrat',sans-serif] group"
            >
              <span>{ctaText}</span>
              <div className="w-6 h-6 bg-zinc-950/10 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            <a
              href="tel:11900000000"
              className="inline-flex items-center gap-3 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider font-['Montserrat',sans-serif]"
            >
              <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                <Phone className="w-4 h-4 text-amber-500" />
              </div>
              <span>Fale Conosco</span>
            </a>
          </div>
        </div>

        {/* Imagem de Destaque */}
        <div className="lg:col-span-5 relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
          <img
            src={displayImage}
            alt="Quattro Construtora"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
        </div>

      </div>
    </section>
  );
};