// src/pages/Setores.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, 
  Stethoscope, 
  Wrench, 
  Building2, 
  ArrowRight, 
  MapPin, 
  Maximize2, 
  CheckCircle2,
  Filter,
  ChevronRight
} from 'lucide-react';

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

export const Setores: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  const obrasFiltradas = categoriaAtiva === 'todos'
    ? PORTFOLIO_OBRAS
    : PORTFOLIO_OBRAS.filter((obra) => obra.categoriaSlug === categoriaAtiva);

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        {/* MÍDIA DE FUNDO FULL WIDTH */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/BG_CTA_QuattroInc_Site.jpeg"
            alt="Quattro Construtora - Setores de Atuação"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* LAYER BLUR EM TODA A ALTURA DO HERO */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />

        {/* CONTEÚDO */}
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat']">
              <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-amber-500 font-bold">Setores</span>
            </nav>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              SOLUÇÕES SOB MEDIDA <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                PARA CADA SETOR
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Conheça nossas áreas de especialização técnica e navegue pelo portfólio de obras que atestam o Padrão Quattro de Qualidade em todo o país.
            </p>

            <div className="pt-2">
              <Link
                to="/contato"
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2 font-['Montserrat']"
              >
                <span>Falar com Engenheiro</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISÃO GERAL DOS SETORES */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Especialidades
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Setores de Atuação
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SETORES_DETALHADOS.map((setor) => {
              const SetorIcon = setor.icon;
              return (
                <div 
                  key={setor.slug}
                  className="bg-[#f8f9f6] border border-zinc-200/80 p-7 sm:p-8 rounded-3xl hover:border-amber-500/50 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between group shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl">
                        <SetorIcon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex gap-2 flex-wrap justify-end">
                        {setor.nbrs.map((nbr, idx) => (
                          <span key={idx} className="text-[10px] font-mono font-bold bg-white border border-zinc-200/80 text-zinc-600 px-2.5 py-1 rounded-md">
                            {nbr}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-['Montserrat'] leading-snug">{setor.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">{setor.desc}</p>

                    <div className="pt-2 space-y-2">
                      {setor.diferenciais.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 font-sans leading-tight">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200/80">
                    <a
                      href="#portfolio"
                      onClick={() => setCategoriaAtiva(setor.slug)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 transition-colors font-['Montserrat']"
                    >
                      <span>Ver Obras Deste Setor</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. GALERIA & FILTRO DE OBRAS (PORTFÓLIO) */}
      <section id="portfolio" className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Acervo Executivo
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
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
                    className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer font-['Montserrat'] ${
                      isActive
                        ? 'bg-amber-500 text-zinc-950 shadow-md scale-105'
                        : 'bg-white border border-zinc-200/80 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
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
                className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between"
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
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-950/80 text-amber-500 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 font-['Montserrat']">
                        {obra.categoriaLabel}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md font-['Montserrat'] ${
                        obra.status === 'Concluído' 
                          ? 'bg-emerald-500/90 text-white' 
                          : 'bg-amber-500/90 text-zinc-950'
                      }`}>
                        {obra.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-950 font-['Montserrat'] group-hover:text-amber-600 transition-colors leading-snug">
                      {obra.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                      {obra.resumo}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 font-medium border-t border-zinc-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{obra.local}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-sans">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{obra.area}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-6">
                  <Link
                    to="/contato"
                    className="w-full py-3 rounded-xl bg-[#f8f9f6] hover:bg-zinc-950 hover:text-white border border-zinc-200/80 text-zinc-900 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 font-['Montserrat']"
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

      {/* 4. CALL TO ACTION FINAL */}
      <section className="py-20 sm:py-28 bg-zinc-950 text-white font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-14 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Consultoria Técnica de Engenharia
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12]">
                Sua obra precisa de rigor técnico e previsibilidade absoluta?
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-sans font-normal leading-relaxed">
                Fale diretamente com os engenheiros responsáveis da Quattro Construtora. Analisamos o escopo do seu projeto e desenvolvemos a proposta ideal para o seu setor.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  to="/contato"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 inline-flex items-center justify-center gap-2 font-['Montserrat']"
                >
                  <span>Falar com um Engenheiro</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/servicos"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 font-['Montserrat']"
                >
                  <span>Ver Serviços & Engenharia</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Setores;