import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutMosaic_Home: React.FC = () => {
  return (
    <section className="about-mosaic-section">
      <div className="about-mosaic-overlay" />

      <div className="about-mosaic-container">
        {/* LADO ESQUERDO: MOSAICO VISUAL */}
        <div className="about-mosaic-left">
          <div className="about-mosaic-top-img">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000"
              alt="Engenharia Quattro Construtora"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="about-mosaic-stat-card">
            <CheckCircle2 className="w-8 h-8 text-zinc-950" />
            <div>
              <span className="text-3xl font-black font-['Montserrat']">100%</span>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mt-1 font-['Montserrat']">
                Conformidade Técnica
              </p>
            </div>
          </div>

          <div className="about-mosaic-bottom-img">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"
              alt="Acompanhamento do Canteiro de Obras"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* LADO DIREITO: CONTEÚDO E SELOS OFICIAIS */}
        <div className="about-mosaic-right">
          <span className="about-mosaic-badge">QUEM SOMOS</span>
          
          <h2 className="about-mosaic-title">
            Solução completa para a excelência da sua construção
          </h2>
          
          <p className="about-mosaic-text">
            A Quattro Construtora conduz todas as etapas da sua obra com máxima transparência, segurança técnica e rigor orçamentário em todo o Brasil.
          </p>

          <div className="about-mosaic-actions">
            <Link to="/quem-somos" className="about-mosaic-btn">
              <span>Sobre a Quattro</span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
            </Link>
          </div>

          {/* SELOS OFICIAIS DE CERTIFICAÇÃO */}
          <div className="about-mosaic-seals-grid">
            <div className="about-mosaic-seal-card">
              <div className="about-seal-img-wrapper">
                <img
                  src="/selos/SELO_pbqph.png"
                  alt="Selo PBQP-H - Qualidade na Construção Civil"
                  className="about-seal-img"
                />
              </div>
              <p className="text-[11px] text-zinc-600 font-sans leading-tight">
                Certificação máxima do Programa Brasileiro da Qualidade do Habitat.
              </p>
            </div>

            <div className="about-mosaic-seal-card">
              <div className="about-seal-img-wrapper">
                <img
                  src="/selos/SELO_ISO9001.png"
                  alt="Selo ISO 9001 - Gestão da Qualidade"
                  className="about-seal-img"
                />
              </div>
              <p className="text-[11px] text-zinc-600 font-sans leading-tight">
                Padrão internacional de qualidade nos processos de engenharia.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};