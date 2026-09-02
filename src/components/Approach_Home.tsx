import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShieldCheck, Wrench } from 'lucide-react';

export const Approach_Home: React.FC = () => {
  return (
    <section className="approach-section">
      <div className="approach-header">
        <div className="lg:col-span-7 space-y-3">
          <span className="approach-badge">NOSSA ABORDAGEM</span>
          <h2 className="approach-title">
            Engenharia versátil e soluções completas para sua obra
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="approach-description">
            Atuamos em empreendimentos residenciais, habitação social (Minha Casa Minha Vida), obras corporativas, retrofits e adequações técnicas AVCB/CLCB.
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
              Obras Corporativas & Habitação
            </h3>
            <p className="approach-card-text text-zinc-600">
              Execução de edificações industriais, prédios comerciais e projetos habitacionais integrados, incluindo empreendimentos Minha Casa Minha Vida.
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

              <Link to="/setores" className="approach-btn approach-btn-white">
                <span>Saiba Mais</span>
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
              Gestão Turnkey & Regularização
            </h3>
            <p className="approach-card-text text-zinc-950 font-medium">
              Gerenciamento completo do projeto à entrega final, assegurando conformidade com normas NBR e obtenção de AVCB/CLCB junto aos Bombeiros.
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

              <Link to="/quem-somos" className="approach-btn approach-btn-amber">
                <span>Ver Padrão</span>
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
              Retrofit, Reformas & Manutenção
            </h3>
            <p className="approach-card-text text-zinc-300">
              Modernização de edificações, renovação de fachadas, reformas estruturais e adequações técnicas para imóveis comerciais e residenciais.
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

              <Link to="/servicos" className="approach-btn approach-btn-dark">
                <span>Ver Soluções</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};