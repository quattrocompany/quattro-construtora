// src/components/AboutMosaic_Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteDoc } from '../lib/siteContent';
import { DEFAULT_HOME, DEFAULT_QUEM } from '../data/siteDefaults';

export const AboutMosaic_Home: React.FC = () => {
  const { aboutMosaic: m } = useSiteDoc('home', DEFAULT_HOME);
  const quem = useSiteDoc('quemsomos', DEFAULT_QUEM);
  return (
    <section className="about-mosaic-section">
      <div className="about-mosaic-overlay" />

      <div className="about-mosaic-container">
        
        {/* COLUNA ESQUERDA: MOSAICO DE IMAGENS COM ESPAÇAMENTO AFINADO */}
        <div className="lg:col-span-6 flex flex-col h-full gap-2.5">
          {/* IMAGEM TOP (AMAZON) */}
          <div className="w-full flex-[1.4] min-h-[240px] sm:min-h-[280px] lg:min-h-0 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm relative group">
            <img
              src={m.img1}
              alt="Obra Industrial Amazon"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* LINHA INFERIOR COM 2 IMAGENS (CIS TAMBORÉ E SEQUOIA) */}
          <div className="w-full flex-1 min-h-[160px] sm:min-h-[180px] lg:min-h-0 flex gap-2.5">
            <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm relative group">
              <img
                src={m.img2}
                alt="Projeto Cis Tamboré"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm relative group">
              <img
                src={m.img3}
                alt="Galpão Logístico Sequoia"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: CONTEÚDO E SELOS */}
        <div className="about-mosaic-right flex flex-col justify-between h-full space-y-6">
          <div className="space-y-5">
            <span className="about-mosaic-badge">Quem Somos</span>

            <h2 className="about-mosaic-title">
              {m.title}
            </h2>

            <p className="about-mosaic-text">
              {m.description}
            </p>

            <div className="about-mosaic-actions">
              <Link to="/quem-somos" className="about-mosaic-btn">
                <span>Sobre a Quattro</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* SELOS OFICIAIS */}
          <div className="about-mosaic-seals-grid">
            <div className="about-mosaic-seal-card">
              <div className="about-seal-img-wrapper">
                <img
                  src={quem.qualidade.seloPbqph}
                  alt="Selo PBQP-H Nível A"
                  className="about-seal-img"
                />
              </div>
              <p className="text-[11px] text-zinc-500 font-sans leading-tight">
                Certificação máxima do Programa Brasileiro da Qualidade e Produtividade do Habitat.
              </p>
            </div>

            <div className="about-mosaic-seal-card">
              <div className="about-seal-img-wrapper">
                <img
                  src={quem.qualidade.seloIso}
                  alt="Selo ISO 9001 - certificação CBG Certificadora Brasileira de Gestão"
                  className="about-seal-img"
                  style={{ height: "4.5rem", width: "auto" }}
                />
              </div>
              <p className="text-[11px] text-zinc-500 font-sans leading-tight">
                Sistema de Gestão da Qualidade certificado pela CBG conforme a norma ABNT NBR ISO 9001:2015.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};