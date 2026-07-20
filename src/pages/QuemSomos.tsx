// src/pages/QuemSomos.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  HardHat, 
  Clock, 
  ChevronRight,
  FileCheck2,
  Layers
} from 'lucide-react';

// ============================================================================
// DADOS ESTÁTICOS INSTITUCIONAIS
// ============================================================================

const VALORES = [
  {
    icon: Target,
    title: 'Missão',
    desc: 'Entregar obras de alta complexidade com excelência técnica, transparência total e rigoroso cumprimento de prazos e orçamentos, superando as expectativas dos nossos clientes.'
  },
  {
    icon: Eye,
    title: 'Visão',
    desc: 'Ser reconhecida nacionalmente como a construtora referência em engenharia de alta performance nos setores industrial, hospitalar, corporativo e residencial de luxo.'
  },
  {
    icon: ShieldCheck,
    title: 'Valores',
    desc: 'Compromisso ético, conformidade irrestrita com normas NBR e NR-35, segurança no canteiro de obras, inovação tecnológica constante e valorização do capital humano.'
  }
];

const PILARES_METODOLOGICOS = [
  {
    icon: HardHat,
    title: 'Rigor Técnico & NBRs',
    desc: 'Execução estrita conforme as normas técnicas da ABNT, garantindo estanqueidade, resistência estrutural e durabilidade patrimonial.'
  },
  {
    icon: Clock,
    title: 'Gestão de Cronograma',
    desc: 'Controle físico-financeiro detalhado com relatórios gerenciais periódicos para acompanhamento em tempo real pelo cliente.'
  },
  {
    icon: Layers,
    title: 'Flexibilidade de Escopo',
    desc: 'Capacidade técnica para readequações executivas ágeis sem comprometer a data final de entrega estipulada em contrato.'
  },
  {
    icon: FileCheck2,
    title: 'Regularização Integral',
    desc: 'Gerenciamento completo do processo burocrático: aprovações na prefeitura, licenças ambientais, Habite-se, AVCB e CLCB.'
  }
];

const METRICAS_QUATTRO = [
  { num: '+15', label: 'Anos de atuação consolidada no mercado nacional.' },
  { num: '+1.000', label: 'Projetos e obras entregues com o Padrão Quattro.' },
  { num: '100%', label: 'Conformidade com orçamentos e prazos firmados.' },
  { num: 'Nacional', label: 'Capacidade de mobilização logística em todo o Brasil.' }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export const QuemSomos: React.FC = () => {
  return (
    <div className="w-full bg-white text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden pt-20 md:pt-24">
      
      {/* ========================================================================= */}
      {/* 1. HERO INSTITUCIONAL (PADRÃO DE GRID MESTRE: max-w-[1440px] px-6 md:px-12) */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6 relative z-10">
          
          {/* Breadcrumbs de Navegação */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-amber-600 font-bold">A Quattro</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Institucional
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-950 tracking-tight leading-tight">
              Engenharia de precisão para projetos extraordinários.
            </h1>
            <p className="text-zinc-600 text-base md:text-lg font-normal leading-relaxed pt-2">
              A Quattro Construtora nasceu com o propósito de redefinir os padrões de qualidade e transparência na construção civil brasileira, unindo capacidade técnica de ponta à disciplina executiva.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MANIFESTO & TRAJETÓRIA (BRANCO PURO)                                  */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna Visual com Foto de Obra */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl aspect-[4/3] bg-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600" 
                alt="Engenharia Quattro em Ação" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
            </div>

            {/* Card Flutuante de Credibilidade */}
            <div className="absolute -bottom-6 -right-2 md:bottom-8 md:-right-6 bg-zinc-950 text-white p-6 rounded-2xl border border-zinc-800 shadow-2xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-amber-500 shrink-0" />
                <span className="text-sm font-bold uppercase tracking-wider">Qualidade Garantida</span>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Supervisão de engenharia dedicada em 100% dos canteiros de obra.
              </p>
            </div>
          </div>

          {/* Coluna Narrativa */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Nossa História
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 leading-tight">
              Mais de uma década construindo pontes entre o projeto e a realidade.
            </h2>
            
            <div className="w-16 h-1 bg-amber-500 rounded-full" />

            <div className="space-y-4 text-zinc-600 text-sm md:text-base font-normal leading-relaxed">
              <p>
                Com mais de 15 anos de atuação sólida no mercado, a <strong>Quattro Construtora</strong> se destaca pela capacidade de executar desde galpões logísticos de alta tonelagem até hospitais e residências de altíssimo padrão.
              </p>
              <p>
                Entendemos que uma obra é um investimento estratégico. Por isso, eliminamos os gargalos tradicionais da construção civil através de methodologies ágeis de gestão, controle rigoroso de insumos e uso de tecnologia de ponta, como o método construtivo Steel Frame em larga escala.
              </p>
              <p>
                Nossa equipe é formada por engenheiros experientes, projetistas e mestres de obras em contínua atualização com as normas de segurança NR-35 e legislações vigentes.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-zinc-200">
              <div className="space-y-1">
                <span className="text-2xl font-black text-amber-600 block font-mono">+1.000</span>
                <span className="text-xs text-zinc-500 font-medium">Obras Concluídas</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-amber-600 block font-mono">100%</span>
                <span className="text-xs text-zinc-500 font-medium">Atendimento NBR</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MISSÃO, VISÃO E VALORES (CINZA 20% - bg-zinc-50)                      */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Diretrizes Estratégicas
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950">
              O que nos move diariamente em cada obra.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALORES.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-zinc-200 p-8 md:p-10 rounded-3xl hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 space-y-5 shadow-sm group"
                >
                  <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl w-fit group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                    <ItemIcon className="w-7 h-7 text-amber-600" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-zinc-950">{item.title}</h3>
                  
                  <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. O PADRÃO QUATTRO DE QUALIDADE (BRANCO PURO)                           */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
                Metodologia Executiva
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950">
                O Padrão Quattro em Ação
              </h2>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm font-normal leading-relaxed">
              Diferenciais de gestão operacional que garantem tranquilidade e previsibilidade total ao contratante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILARES_METODOLOGICOS.map((pilar, idx) => {
              const PilarIcon = pilar.icon;
              return (
                <div 
                  key={idx}
                  className="bg-zinc-50 border border-zinc-200 p-8 rounded-2xl hover:bg-white hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 space-y-4"
                >
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl w-fit shadow-xs">
                    <PilarIcon className="w-6 h-6 text-amber-600" />
                  </div>

                  <h3 className="text-lg font-extrabold text-zinc-950">{pilar.title}</h3>
                  
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {pilar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NÚMEROS DE IMPACTO (CINZA 20% - bg-zinc-50)                           */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {METRICAS_QUATTRO.map((metric, idx) => (
              <div key={idx} className="border-t-2 border-amber-500 pt-6 space-y-2">
                <span className="text-4xl md:text-5xl font-black text-zinc-950 block font-mono">
                  {metric.num}
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ÂNCORA DE CONVERSÃO / CTA (DARK MODE ENCLOSURE - bg-zinc-950)         */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-zinc-950 text-white">
        <div className="max-w-[1440px] mx-auto bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Efeito Glow de Fundo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 block">
              Inicie Seu Projeto Conosco
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Pronto para construir sua obra com o Padrão Quattro de Qualidade?
            </h2>

            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              Entre em contato com nossa equipe de engenharia para discutir seu projeto, avaliar viabilidade técnica ou solicitar um orçamento detalhado.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                to="/contato"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Solicitar Cotação</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/setores"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Ver Setores de Atuação</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};