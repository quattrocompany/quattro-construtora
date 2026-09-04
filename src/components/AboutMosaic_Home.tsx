// src/components/AboutMosaic_Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export interface AboutMosaicProps {
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    statNumber?: string;
    statLabel?: string;
    img1?: string;
    img2?: string;
    img3?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export const AboutMosaic_Home: React.FC<AboutMosaicProps> = ({ data }) => {
  const badge = data?.badge || 'QUEM SOMOS';
  const title = data?.title || 'Solução completa para a excelência da sua construção';
  const description = data?.description || 'A Quattro Construtora conduz todas as etapas da sua obra com máxima transparência, segurança técnica e rigor orçamentário em todo o Brasil.';
  const statNumber = data?.statNumber || '100%';
  const statLabel = data?.statLabel || 'Conformidade Técnica';
  const img1 = data?.img1 || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000';
  const img2 = data?.img2 || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800';
  const img3 = data?.img3 || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800';

  return (
    <section className="about-mosaic-section">
      <div className="about-mosaic-overlay" />

      <div className="about-mosaic-container">
        {/* LADO ESQUERDO: MOSAICO COM 3 IMAGENS */}
        <div className="about-mosaic-left">
          <div className="about-mosaic-top-img">
            <img src={img1} alt="Engenharia Quattro Construtora" className="w-full h-full object-cover" />
          </div>

          <div className="about-mosaic-stat-card">
            <CheckCircle2 className="w-8 h-8 text-zinc-950" />
            <div>
              <span className="text-3xl font-black font-['Montserrat']">{statNumber}</span>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mt-1 font-['Montserrat']">
                {statLabel}
              </p>
            </div>
          </div>

          <div className="about-mosaic-bottom-img">
            <img src={img2} alt="Acompanhamento do Canteiro" className="w-full h-full object-cover" />
          </div>

          {img3 && (
            <div className="col-span-12 rounded-2xl overflow-hidden border border-zinc-200/80 h-[140px] shadow-sm mt-2">
              <img src={img3} alt="Detalhe do Mosaico" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* LADO DIREITO: 2 LINHAS DE TEXTO (TÍTULO + DESCRIÇÃO) */}
        <div className="about-mosaic-right">
          <span className="about-mosaic-badge">{badge}</span>
          
          <h2 className="about-mosaic-title">
            {title}
          </h2>
          
          <p className="about-mosaic-text">
            {description}
          </p>

          <div className="about-mosaic-actions">
            <Link to={data?.ctaLink || '/quem-somos'} className="about-mosaic-btn">
              <span>{data?.ctaText || 'Sobre a Quattro'}</span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};