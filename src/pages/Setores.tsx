// src/pages/Setores.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  Stethoscope, 
  Wrench, 
  Building2, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  Maximize2, 
  CheckCircle2,
  Filter
} from 'lucide-react';

// ============================================================================
// DADOS ESTÁTICOS DE SETORES E OBRAS
// ============================================================================

const CATEGORIAS_FILTRO = [
  { id: 'todos', label: 'Todos os Setores' },
  { id: 'industrial', label: 'Industrial & Logística' },
  { id: 'hospitalar', label: 'Setor Hospitalar' },
  { id: 'manutencao', label: 'Manutenção & Facilities' },
  { id: 'residencial', label: 'Residencial de Luxo' },
];

const SETORES_DETALHADOS = [
  {
    slug: 'industrial',
    title: 'Industrial & Logística',
    icon: Factory,
    desc: 'Engenharia para galpões logísticos de alta tonelagem, parques fabris, centros de distribuição automatizados e estruturas de grande vão livre.',
    nbrs: ['NBR 15575', 'NBR 6118', 'NBR 8800'],
    diferenciais: [
      'Pisos de alta capacidade de carga com nivelamento a laser.',
      'Sistemas estruturais em concreto pré-moldado e aço.',
      'Cobertoras metálicas com isolamento termoacústico subcoberta.'
    ]
  },
  {
    slug: 'hospitalar',
    title: 'Setor Hospitalar & Saúde',
    icon: Stethoscope,
    desc: 'Projetos e execuções de alta complexidade para centros cirúrgicos, UTIs, laboratórios de análise clínica e salas limpas com contaminação controlada.',
    nbrs: ['RDC 50 ANVISA', 'NBR 7256', 'NBR 12188'],
    diferenciais: [
      'Controle rigoroso de pressão positiva/negativa de ar.',
      'Gases medicinais, redes redundantes de energia e no-breaks.',
      'Revestimentos vinílicos monolíticos bactericidas.'
    ]
  },
  {
    slug: 'manutencao',
    title: 'Manutenção & Facilities',
    icon: Wrench,
    desc: 'Gestão preventiva, corretiva e retrofit de ativos prediais corporativos e industriais, garantindo a continuidade operacional e valorização patrimonial.',
    nbrs: ['NBR 5674', 'NBR 14037', 'NR 35'],
    diferenciais: [
      'Equipes dedicadas presenciais ou sob demanda de campo.',
      'Diagnósticos preditivos por termografia e análise de vibração.',
      'Atendimento emergencial 24/7 para plantas críticas.'
    ]
  },
  {
    slug: 'residencial',
    title: 'Residencial de Luxo',
    icon: Building2,
    desc: 'Construção e incorporação de residências de alto padrão, vilas corporativas e edifícios de arquitetura autoral com métodos construtivos inovadores.',
    nbrs: ['NBR 15575', 'NBR 9575', 'NBR 5410'],
    diferenciais: [
      'Uso otimizado de Light Steel Frame e estruturas mistas.',
      'Automação residencial integrada e eficiência energética.',
      'Acabamentos refinados e rigor no detalhamento executivo.'
    ]
  }
];

const PORTFOLIO_OBRAS = [
  {
    id: 1,
    title: 'Centro de Distribuição Logístico Amazon',
    categoriaSlug: 'industrial',
    categoriaLabel: 'Industrial',
    local: 'Cajamar – SP',
    area: '45.000 m²',
    status: 'Concluído',
    imagem: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200',
    resumo: 'Execução de pavimento de alta resistência mecânica, 48 docas niveladoras e sistema de sprinklers K25.'
  },
  {
    id: 2,
    title: 'Complexo Hospitalar São Lucas - Ala OESTE',
    categoriaSlug: 'hospitalar',
    categoriaLabel: 'Hospitalar',
    local: 'São Paulo – SP',
    area: '12.800 m²',
    status: 'Concluído',
    imagem: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200',
    resumo: 'Construção de 8 novas salas cirúrgicas inteligentes, 30 leitos de UTI e central de esterilização CME.'
  },
  {
    id: 3,
    title: 'Lumini Clube Residencial II',
    categoriaSlug: 'residencial',
    categoriaLabel: 'Residencial',
    local: 'Alphaville – Barueri/SP',
    area: '8.500 m²',
    status: 'Em Execução',
    imagem: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200',
    resumo: 'Condomínio de residências contemporâneas em Steel Frame com certificação de eficiência energética.'
  },
  {
    id: 4,
    title: 'Retrofit e Gestão de Facilities Fabril',
    categoriaSlug: 'manutencao',
    categoriaLabel: 'Facilities',
    local: 'Indaiatuba – SP',
    area: '22.000 m²',
    status: 'Concluído',
    imagem: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200',
    resumo: 'Modernização completa da subestação elétrica, adequação NR-12 e reforma estrutural de cobertura.'
  },
  {
    id: 5,
    title: 'Parque Industrial Farmacêutico',
    categoriaSlug: 'industrial',
    categoriaLabel: 'Industrial',
    local: 'Anápolis – GO',
    area: '32.000 m²',
    status: 'Em Execução',
    imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200',
    resumo: 'Planta industrial química com salas limpas padrão ISO 7 e tubulações sanitárias em aço inox 316L.'
  },
  {
    id: 6,
    title: 'Residência Villa Toscana',
    categoriaSlug: 'residencial',
    categoriaLabel: 'Residencial',
    local: 'Campinas – SP',
    area: '1.400 m²',
    status: 'Concluído',
    imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    resumo: 'Residência de altíssimo padrão com balanços estruturais audaciosos e fachada autoral ventilada.'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL SETORES
// ============================================================================

export const Setores: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  const obrasFiltradas = categoriaAtiva === 'todos'
    ? PORTFOLIO_OBRAS
    : PORTFOLIO_OBRAS.filter((obra) => obra.categoriaSlug === categoriaAtiva);

  return (
    <div className="w-full bg-white text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden pt-20 md:pt-24">
      
      {/* ========================================================================= */}
      {/* 1. HERO INSTITUCIONAL (PADRÃO DE GRID MESTRE: max-w-[1440px] px-6 md:px-12) */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-amber-600 font-bold">Setores & Obras</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Capacidade Técnica Multisetorial
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-950 tracking-tight leading-tight">
              Soluções de engenharia sob medida para cada setor.
            </h1>
            <p className="text-zinc-600 text-base md:text-lg font-normal leading-relaxed pt-2">
              Conheça nossas áreas de especialização técnica e navegue pelo portfólio de obras que atestam o Padrão Quattro de Qualidade em todo o país.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. VISÃO GERAL DOS SETORES                                               */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Especialidades
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950">
              Setores de Atuação
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SETORES_DETALHADOS.map((setor) => {
              const SetorIcon = setor.icon;
              return (
                <div 
                  key={setor.slug}
                  className="bg-zinc-50 border border-zinc-200 p-8 md:p-10 rounded-3xl hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 bg-white border border-zinc-200 rounded-2xl group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors shadow-xs">
                        <SetorIcon className="w-7 h-7 text-amber-600" />
                      </div>
                      
                      <div className="flex gap-2 flex-wrap justify-end">
                        {setor.nbrs.map((nbr, idx) => (
                          <span key={idx} className="text-[10px] font-mono font-bold bg-white border border-zinc-200 text-zinc-600 px-2.5 py-1 rounded-md">
                            {nbr}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-2xl font-extrabold text-zinc-950">{setor.title}</h3>
                    <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-normal">{setor.desc}</p>

                    <div className="pt-2 space-y-2">
                      {setor.diferenciais.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200">
                    <button
                      onClick={() => setCategoriaAtiva(setor.slug)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
                    >
                      <span>Ver Obras Deste Setor</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GALERIA & FILTRO DE OBRAS                                             */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
                Acervo Executivo
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950">
                Obras em Destaque
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
              <Filter className="w-4 h-4 text-zinc-400 shrink-0 mr-1 hidden sm:block" />
              {CATEGORIAS_FILTRO.map((cat) => {
                const isActive = categoriaAtiva === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCategoriaAtiva(cat.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-zinc-950 shadow-md scale-105'
                        : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {obrasFiltradas.map((obra) => (
              <div 
                key={obra.id}
                className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img 
                      src={obra.imagem} 
                      alt={obra.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-950/80 text-amber-500 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                        {obra.categoriaLabel}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md ${
                        obra.status === 'Concluído' 
                          ? 'bg-emerald-500/90 text-white' 
                          : 'bg-amber-500/90 text-zinc-950'
                      }`}>
                        {obra.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <h3 className="text-xl font-bold text-zinc-950 group-hover:text-amber-600 transition-colors leading-snug">
                      {obra.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {obra.resumo}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 font-medium border-t border-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{obra.local}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{obra.area}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-6">
                  <Link
                    to="/contato"
                    className="w-full py-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 hover:text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Solicitar Projeto Similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ÂNCORA DE CONVERSÃO / CTA                                             */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-zinc-950 text-white">
        <div className="max-w-[1440px] mx-auto bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 block">
              Consultoria Técnica de Engenharia
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Sua obra precisa de rigor técnico e previsibilidade absoluta?
            </h2>

            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              Fale diretamente com os engenheiros responsáveis da Quattro Construtora. Analisamos o escopo do seu projeto e desenvolvemos a proposta ideal para o seu setor.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                to="/contato"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Falar com um Engenheiro</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/servicos"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Ver Serviços & Engenharia</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};