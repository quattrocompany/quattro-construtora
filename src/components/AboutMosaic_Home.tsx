// src/components/AboutMosaic_Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const AboutMosaic_Home: React.FC = () => {
  return (
    <section className="about-mosaic-section">
      <div className="about-mosaic-overlay" />

      <div className="about-mosaic-container">
        
        {/* COLUNA ESQUERDA: MOSAICO DE IMAGENS COM ESPAÇAMENTO AFINADO */}
        <div className="lg:col-span-6 flex flex-col h-full gap-2.5">
          {/* IMAGEM TOP (AMAZON) */}
          <div className="w-full flex-[1.4] min-h-[240px] sm:min-h-[280px] lg:min-h-0 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm relative group">
            <img
              src="/img/Amazon_Img1.jpg"
              alt="Obra Industrial Amazon"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* LINHA INFERIOR COM 2 IMAGENS (CIS TAMBORÉ E SEQUOIA) */}
          <div className="w-full flex-1 min-h-[160px] sm:min-h-[180px] lg:min-h-0 flex gap-2.5">
            <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm relative group">
              <img
                src="/img/CisTambore_Img1.jpg"
                alt="Projeto Cis Tamboré"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm relative group">
              <img
                src="/img/Sequoia_Img1.jpg"
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
              Solução completa para a excelência da sua construção
            </h2>

            <p className="about-mosaic-text">
              A Quattro Construtora conduz todas as etapas da sua obra com máxima transparência, segurança técnica e rigor orçamentário em todo o Brasil.
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
                  src="/selos/SELO_pbqph.png"
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
                  src="/selos/SELO_ISO9001.png"
                  alt="Selo ISO 9001:2015"
                  className="about-seal-img"
                />
              </div>
              <p className="text-[11px] text-zinc-500 font-sans leading-tight">
                Padrão internacional de qualidade nos processos de engenharia civil.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};