// src/pages/TrabalheConosco.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HardHat, GraduationCap, HeartHandshake, TrendingUp } from 'lucide-react';
import { CareerForm } from '../components/CareerForm';

const BENEFICIOS = [
  {
    icon: HardHat,
    titulo: 'Obras Técnicas e Desafiadoras',
    desc: 'Atue em empreendimentos industriais, corporativos e residenciais de grande porte, com rigor técnico reconhecido pelo mercado.',
  },
  {
    icon: GraduationCap,
    titulo: 'Desenvolvimento Contínuo',
    desc: 'Investimos em capacitação técnica e normativa (NBRs, segurança do trabalho, gestão de obras) para toda a nossa equipe.',
  },
  {
    icon: HeartHandshake,
    titulo: 'Cultura de Respeito',
    desc: 'Mais de 15 anos de mercado construídos com ética, transparência e valorização de quem faz a obra acontecer.',
  },
  {
    icon: TrendingUp,
    titulo: 'Crescimento Real',
    desc: 'Buscamos talentos que queiram crescer junto com a empresa, em um ambiente de meritocracia e oportunidades internas.',
  },
];

export const TrabalheConosco: React.FC = () => {
  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/Amazon_Entrada.jpg"
            alt="Quattro Construtora - Trabalhe Conosco"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat']">
              <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-amber-500 font-bold">Trabalhe Conosco</span>
            </nav>

            <h1 className="text-[2.3rem] font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              FAÇA PARTE DO <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                NOSSO TIME
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Buscamos profissionais comprometidos com a excelência técnica para construir, junto com a gente, os próximos grandes projetos da Quattro Construtora.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO PRINCIPAL: BENEFÍCIOS + FORMULÁRIO */}
      <section className="py-16 sm:py-24 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* FORMULÁRIO ESQUERDA */}
          <div className="lg:col-span-7 flex flex-col justify-stretch">
            <CareerForm />
          </div>

          {/* BENEFÍCIOS DIREITA */}
          <div className="lg:col-span-5 flex flex-col h-full justify-between">
            <div className="space-y-2 pb-2">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Carreira na Quattro
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Por Que Trabalhar com a Gente
              </h2>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-3">
              {BENEFICIOS.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 bg-white border border-zinc-200/80 rounded-2xl flex items-start gap-4 hover:border-amber-500/50 hover:shadow-md transition-all duration-300 shadow-xs flex-1"
                  >
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-950 font-['Montserrat'] leading-snug">
                        {b.titulo}
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-sans leading-normal">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default TrabalheConosco;
