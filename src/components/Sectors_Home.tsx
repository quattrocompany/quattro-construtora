// src/components/Sectors_Home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Building2, Stethoscope, Home, type LucideIcon } from 'lucide-react';

export interface SectorItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: LucideIcon;
  image: string;
}

export const SETORES: SectorItem[] = [
  {
    id: '01',
    title: 'Setor Industrial',
    category: 'Logística & Infraestrutura',
    desc: 'Galpões logísticos, parques fabris e instalações industriais complexas executadas com alto rigor técnico e engenharia de precisão.',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600'
  },
  {
    id: '02',
    title: 'Setor Corporativo',
    category: 'Comercial & Escritórios',
    desc: 'Sedes empresariais e edifícios comerciais funcionais, planejados para otimização de espaços, sustentabilidade e alta produtividade.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600'
  },
  {
    id: '03',
    title: 'Setor Farmacêutico',
    category: 'Salas Limpas & Anvisa',
    desc: 'Projetos de alta complexidade com rigoroso cumprimento de normas sanitárias NBR e especificações regulatórias para laboratórios e salas limpas.',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600'
  },
  {
    id: '04',
    title: 'Setor Residencial',
    category: 'Habitação & MCMV',
    desc: 'Empreendimentos habitacionais multifamiliares e condomínios residenciais integrados, atendendo também ao programa Minha Casa Minha Vida.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600'
  }
];

export const Sectors_Home: React.FC = () => {
  const [activeSector, setActiveSector] = useState(0);
  const current = SETORES[activeSector];
  const IconComponent = current.icon;

  return (
    <section className="sectors-section">
      {/* CABEÇALHO COM ALINHAMENTO GRID 6/6 RIGOROSO */}
      <div className="sectors-header">
        <div>
          <span className="sectors-badge">SETORES DE ATUAÇÃO</span>
          <h2 className="sectors-title">
            Especialistas onde a precisão e a técnica são fundamentais
          </h2>
        </div>
        <div>
          <p className="sectors-description">
            Atendemos às exigências específicas de cada segmento com planejamento rigoroso, equipes qualificadas e total conformidade com as normas NBR.
          </p>
        </div>
      </div>

      {/* SHOWCASE INTERATIVO */}
      <div className="sectors-grid">
        {/* SELEÇÃO DE SETORES (ESQUERDA) */}
        <div className="sectors-nav">
          {SETORES.map((setor, index) => {
            const isSelected = activeSector === index;
            const ItemIcon = setor.icon;

            return (
              <button
                key={setor.id}
                onClick={() => setActiveSector(index)}
                className={`sectors-item-btn ${
                  isSelected ? 'sectors-item-btn-active' : 'sectors-item-btn-inactive'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`sectors-icon-box ${
                      isSelected ? 'sectors-icon-box-active' : 'sectors-icon-box-inactive'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-amber-500' : 'text-zinc-400'}`}>
                        {setor.id}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider block font-['Montserrat'] ${isSelected ? 'text-amber-500' : 'text-zinc-500'}`}>
                        {setor.category}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm font-bold block leading-tight font-['Montserrat']">
                      {setor.title}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                    isSelected ? 'bg-amber-500/20 text-amber-500' : 'text-zinc-400 opacity-0'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* PREVIEW DINÂMICO (DIREITA) */}
        <div className="sectors-preview-card">
          {SETORES.map((setor, index) => (
            <div
              key={setor.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === activeSector ? 'opacity-100 z-0' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={setor.image}
                alt={setor.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            </div>
          ))}

          <div className="relative z-10 p-8 md:p-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 block font-['Montserrat']">
                  {current.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight font-['Montserrat']">
                  {current.title}
                </h3>
              </div>
            </div>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans max-w-xl">
              {current.desc}
            </p>

            <div className="pt-2">
              <Link to="/setores" className="sectors-btn-cta">
                <span>Conhecer Obras do Setor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};