// src/components/Approach_Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShieldCheck, Wrench } from 'lucide-react';

export interface ApproachCardData {
  title: string;
  text: string;
  btnText: string;
  btnLink: string;
}

export interface ApproachProps {
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    card1?: ApproachCardData;
    card2?: ApproachCardData;
    card3?: ApproachCardData;
  };
}

export const Approach_Home: React.FC<ApproachProps> = ({ data }) => {
  const badge = data?.badge || 'NOSSA ABORDAGEM';
  const title = data?.title || 'Engenharia versátil e soluções completas para sua obra';
  const description = data?.description || 'Atuamos em empreendimentos residenciais, habitação social (Minha Casa Minha Vida), obras corporativas, retrofits e adequações técnicas AVCB/CLCB.';

  const card1 = data?.card1 || {
    title: 'Obras Corporativas & Habitação',
    text: 'Execução de edificações industriais, prédios comerciais e projetos habitacionais integrados, incluindo empreendimentos Minha Casa Minha Vida.',
    btnText: 'Saiba Mais',
    btnLink: '/setores'
  };

  const card2 = data?.card2 || {
    title: 'Gestão Turnkey & Regularização',
    text: 'Gerenciamento completo do projeto à entrega final, assegurando conformidade com normas NBR e obtenção de AVCB/CLCB junto aos Bombeiros.',
    btnText: 'Ver Padrão',
    btnLink: '/quem-somos'
  };

  const card3 = data?.card3 || {
    title: 'Retrofit, Reformas & Manutenção',
    text: 'Modernização de edificações, renovação de fachadas, reformas estruturais e adequações técnicas para imóveis comerciais e residenciais.',
    btnText: 'Ver Soluções',
    btnLink: '/servicos'
  };

  return (
    <section className="approach-section">
      <div className="approach-header">
        <div className="lg:col-span-7 space-y-3">
          <span className="approach-badge">{badge}</span>
          <h2 className="approach-title">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="approach-description">
            {description}
          </p>
        </div>
      </div>

      <div className="approach-grid">
        {/* CARD 1: Obras Corporativas */}
        <div className="approach-card approach-card-white">
          <div className="approach-card-content">
            <div className="approach-icon-box approach-icon-box-white">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="approach-card-title text-zinc-950">
              {card1.title}
            </h3>
            <p className="approach-card-text text-zinc-600">
              {card1.text}
            </p>
          </div>

          <div className="approach-notch-wrapper">
            <div className="approach-notch-box">
              <svg className="approach-notch-svg-top" viewBox="0 0 16 16" fill="currentColor">
                <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
              </svg>
              <svg className="approach-notch-svg-right" viewBox="0 0 16 16" fill="currentColor">
                <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
              </svg>

              <Link to={card1.btnLink} className="approach-btn approach-btn-white">
                <span>{card1.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* CARD 2: Gestão Turnkey */}
        <div className="approach-card approach-card-amber">
          <div className="approach-card-content">
            <div className="approach-icon-box approach-icon-box-amber">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="approach-card-title text-zinc-950">
              {card2.title}
            </h3>
            <p className="approach-card-text text-zinc-950 font-medium">
              {card2.text}
            </p>
          </div>

          <div className="approach-notch-wrapper">
            <div className="approach-notch-box">
              <svg className="approach-notch-svg-top" viewBox="0 0 16 16" fill="currentColor">
                <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
              </svg>
              <svg className="approach-notch-svg-right" viewBox="0 0 16 16" fill="currentColor">
                <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
              </svg>

              <Link to={card2.btnLink} className="approach-btn approach-btn-amber">
                <span>{card2.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* CARD 3: Retrofit & Manutenção */}
        <div className="approach-card approach-card-dark">
          <div className="approach-card-content">
            <div className="approach-icon-box approach-icon-box-dark">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="approach-card-title text-white">
              {card3.title}
            </h3>
            <p className="approach-card-text text-zinc-300">
              {card3.text}
            </p>
          </div>

          <div className="approach-notch-wrapper">
            <div className="approach-notch-box">
              <svg className="approach-notch-svg-top" viewBox="0 0 16 16" fill="currentColor">
                <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
              </svg>
              <svg className="approach-notch-svg-right" viewBox="0 0 16 16" fill="currentColor">
                <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
              </svg>

              <Link to={card3.btnLink} className="approach-btn approach-btn-dark">
                <span>{card3.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};