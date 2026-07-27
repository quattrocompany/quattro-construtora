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
  Layers,
  Building2,
  Factory,
  Pill,
  Home as HomeIcon,
  Leaf,
  CheckCircle2,
  Medal
} from 'lucide-react';

// ============================================================================
// DADOS ESTÁTICOS DA PÁGINA A QUATTRO
// ============================================================================

const METRICAS_IMPACTO = [
  { num: '+15 Anos', label: 'De inteligência construtiva e governança nacional.' },
  { num: '+1.000.000 m²', label: 'Construídos em obras corporativas, industriais e residenciais.' },
  { num: '100%', label: 'Compromisso com orçamentos firmados e gestão de riscos.' },
  { num: 'Nível A', label: 'Certificação PBQP-H e ISO 9001:2015 com processos auditados.' }
];

const PILARES_PADRAO = [
  {
    icon: HardHat,
    title: 'Rigor Técnico & NBRs',
    desc: 'Execução estrita conforme as normas ABNT e parâmetros internacionais de desempenho estrutural e durabilidade.'
  },
  {
    icon: Clock,
    title: 'Previsibilidade Física e Financeira',
    desc: 'Monitoramento do cronograma em tempo real com relatórios gerenciais periódicos e custo controlado.'
  },
  {
    icon: Layers,
    title: 'Engenharia Consultiva',
    desc: 'Agilidade para readequações executivas em campo sem comprometer a data final de entrega.'
  },
  {
    icon: FileCheck2,
    title: 'Turnkey Legal & Compliance',
    desc: 'Gerenciamento completo de licenças, aprovações sanitárias, Habite-se, AVCB e licenças ambientais.'
  }
];

const PROVA_SOCIAL_OBRAS = [
  {
    icon: Factory,
    title: 'Industrial & Logística',
    desc: 'Megaobra de distribuição para a Amazon e parque operacional do Grupo Sequoia (3.000 m²).'
  },
  {
    icon: Building2,
    title: 'Corporativo',
    desc: 'Sedes e centrais da Vivo / Telefônica, além de edifícios empresariais como Unique Tower e Memorial Trade Tower.'
  },
  {
    icon: Pill,
    title: 'Farmacêutico & Saúde',
    desc: 'Instalações para Lavoisier / DASA (4.000 m²), Hospitalis e complexos de ensino da UNICID.'
  },
  {
    icon: HomeIcon,
    title: 'Residencial de Escala',
    desc: 'Megacomplexos como o Lumini Clube Residencial (Fases 1, 2 e 3) e Jardim Califórnia (440 unidades).'
  }
];

const TRAJETORIA_TIMELINE = [
  {
    fase: 'Fundação',
    desc: 'Início com foco em engenharia consultiva e obras técnicas de alta complexidade.'
  },
  {
    fase: 'Expansão & Incorporação',
    desc: 'Cobertura logística em todo o Brasil e criação do braço imobiliário (Quattro Inc).'
  },
  {
    fase: 'Acreditação Máxima',
    desc: 'Conquista do PBQP-H Nível A e ISO 9001:2015.'
  },
  {
    fase: 'Grandes Contas B2B',
    desc: 'Consolidação em multinacionais de logística, telecom e farmacêutica (Amazon, Vivo, DASA).'
  },
  {
    fase: 'Escala Residencial',
    desc: 'Expansão da marca com megacomplexos residenciais de milhares de unidades entregues.'
  }
];

const VALORES_GOVERNANCA = [
  { title: 'Rigor Técnico', desc: 'Padrão executivo acima da norma.' },
  { title: 'Previsibilidade', desc: 'Cumprimento de prazos e custos.' },
  { title: 'Integridade', desc: 'Compliance e transparência.' },
  { title: 'Segurança', desc: 'Proteção integral do trabalhador.' },
  { title: 'ESG', desc: 'Construção consciente e sustentável.' }
];

// ============================================================================
// COMPONENTE PRINCIPAL (RESPONSIVO MESTRE 1440PX)
// ============================================================================

export const QuemSomos: React.FC = () => {
  return (
    <div className="w-full bg-white text-zinc-900 font-['Inter',sans-serif] selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (ALTURA HOMEPAGE: h-screen min-h-[650px] max-h-[900px])    */}
      {/* ========================================================================= */}
      <section className="relative w-full h-screen min-h-[650px] max-h-[900px] bg-zinc-950 text-white border-b border-zinc-800 overflow-hidden flex items-center">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none" />
        
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-6 sm:space-y-8 relative z-10 pt-16 sm:pt-20">
          
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat',sans-serif]">
            <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-zinc-600" />
            <span className="text-amber-500 font-bold">A Quattro</span>
          </nav>

          <div className="max-w-4xl space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-500 block font-['Montserrat',sans-serif]">
              A Quattro Construtora
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Engenharia de Alta Performance para Projetos de Grande Porte.
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base md:text-xl font-normal leading-relaxed pt-1 sm:pt-2 max-w-3xl">
              Da infraestrutura logística da Amazon e sedes corporativas da Vivo, à escala e sofisticação do Lumini Clube. Transformamos desafios complexos em realidades sólidas com inteligência, segurança e previsibilidade em todo o Brasil.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                to="/contato"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 font-['Montserrat',sans-serif]"
              >
                <span>Solicitar Apresentação Técnica</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contato"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 font-['Montserrat',sans-serif]"
              >
                <span>Falar com Engenheiro</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MÉTRICAS DE IMPACTO                                                     */}
      {/* ========================================================================= */}
      <section className="bg-zinc-900 border-b border-zinc-800 py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {METRICAS_IMPACTO.map((metric, idx) => (
              <div key={idx} className="border-t-2 border-amber-500 pt-4 sm:pt-6 space-y-1.5 sm:space-y-2">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-500 block font-['Inter',sans-serif]">
                  {metric.num}
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MANIFESTO INSTITUCIONAL                                                 */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
              Quem Somos
            </span>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 leading-tight">
              Soluções End-to-End & Rigor Técnico
            </h2>
            
            <div className="w-12 sm:w-16 h-1 bg-amber-500 rounded-full" />

            <div className="space-y-3 sm:space-y-4 text-zinc-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
              <p>
                A Quattro Construtora é especializada em soluções end-to-end de alta complexidade. Com mais de 1 milhão de metros quadrados executados, construímos nossa reputação onde o rigor técnico é inegociável: de galpões logísticos e plantas industriais a sedes corporativas, ambientes farmacêuticos controlados e complexos residenciais.
              </p>
              <p>
                Atuamos no modelo Turnkey (Design & Build), assumindo o ponto único de responsabilidade por todo o ciclo da obra — dos estudos de viabilidade e projetos ao comissionamento e entrega final.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 shadow-xl sm:shadow-2xl aspect-[4/3] bg-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600" 
                alt="Engenharia Quattro Construtora" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-4 -right-2 md:bottom-8 md:-right-6 bg-zinc-950 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-800 shadow-2xl max-w-[240px] sm:max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 font-['Montserrat',sans-serif]">
                <Award className="w-5 sm:w-6 h-5 sm:h-6 text-amber-500 shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Qualidade Garantida</span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-light leading-relaxed">
                Supervisão de engenharia dedicada em 100% dos canteiros de obra.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. O PADRÃO QUATTRO EM AÇÃO                                               */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-12 sm:space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="max-w-2xl space-y-2 sm:space-y-3">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
                Metodologia Executiva
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950">
                O Padrão Quattro em Ação
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm font-normal leading-relaxed">
              Diferenciais de gestão operacional que garantem tranquilidade e previsibilidade total ao contratante.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PILARES_PADRAO.map((pilar, idx) => {
              const PilarIcon = pilar.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-zinc-200 p-6 sm:p-8 rounded-2xl hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 space-y-3 sm:space-y-4"
                >
                  <div className="p-2.5 sm:p-3 bg-zinc-100 border border-zinc-200 rounded-xl w-fit shadow-xs">
                    <PilarIcon className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-zinc-950">{pilar.title}</h3>
                  
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {pilar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PROVA SOCIAL (GRANDES OBRAS)                                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
              Prova Social
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950">
              Grandes Obras
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PROVA_SOCIAL_OBRAS.map((setor, idx) => {
              const SetorIcon = setor.icon;
              return (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2.5 sm:p-3 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl w-fit">
                    <SetorIcon className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-950">{setor.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{setor.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. POLÍTICA DA QUALIDADE & SUSTENTABILIDADE                              */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-8 sm:space-y-12">
          
          <div className="bg-white border border-zinc-200 p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl sm:rounded-2xl shrink-0">
                <Medal className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
                  Compromisso Institucional
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-950">
                  POLÍTICA DA QUALIDADE QUATTRO
                </h3>
              </div>
            </div>

            <blockquote className="text-zinc-700 text-xs sm:text-sm md:text-base leading-relaxed italic border-l-4 border-amber-500 pl-3 sm:pl-4 font-normal">
              "A Quattro Construtora atua na construção civil e na incorporação de empreendimentos habitacionais, corporativos e industriais com foco na excelência dos produtos e serviços entregues. Assegura a satisfação dos clientes, garante o cumprimento dos requisitos legais e promove a melhoria contínua dos processos, mantendo o compromisso com práticas sustentáveis e inovadoras que respeitam o meio ambiente."
            </blockquote>

            <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-950 font-['Montserrat',sans-serif]">Acreditação:</strong> Selos PBQP-H Nível A e NBR ISO 9001:2015 (chancelados pelo selo ALC).
                </p>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <Leaf className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-950 font-['Montserrat',sans-serif]">Sustentabilidade Aplicada:</strong> Corpo técnico preparado para a execução de obras elegíveis a certificações verdes (LEED e AQUA).
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GOVERNANÇA CORPORATIVA                                                */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
              Diretrizes Estratégicas
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950">
              Governança Corporativa
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* CARD MISSÃO */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-2.5 sm:p-3 bg-white border border-zinc-200 rounded-xl sm:rounded-2xl w-fit">
                  <Target className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950">🎯 Missão</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Entregar engenharia de alta performance com compromisso intransigente em qualidade, segurança e previsibilidade orçamentária, gerando valor sustentável para clientes e sociedade.
                </p>
              </div>
            </div>

            {/* CARD VISÃO */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-2.5 sm:p-3 bg-white border border-zinc-200 rounded-2xl w-fit">
                  <Eye className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950">👁️ Visão</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Ser a parceira estratégica referência no mercado nacional em obras complexas nos setores Industrial, Corporativo, Farmacêutico e Residencial, reconhecida pela excelência técnica e governança.
                </p>
              </div>
            </div>

            {/* CARD VALORES */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="p-2.5 sm:p-3 bg-white border border-zinc-200 rounded-2xl w-fit">
                  <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950">🛡️ Valores</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
                  {VALORES_GOVERNANCA.map((val, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <strong className="text-zinc-950 font-['Montserrat',sans-serif]">• {val.title}:</strong> {val.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TRAJETÓRIA (TIMELINE VERTICAL RESPONSIVA)                              */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-12 sm:space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
              Nossa História
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950">
              Trajetória
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-amber-500 space-y-8 sm:space-y-10">
            {TRAJETORIA_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 sm:w-4 h-3.5 sm:h-4 bg-amber-500 rounded-full border-4 border-zinc-50 group-hover:scale-125 transition-transform" />
                <div className="bg-white border border-zinc-200 p-5 sm:p-8 rounded-2xl shadow-xs space-y-1.5 sm:space-y-2 hover:border-amber-500/50 transition-all">
                  <span className="text-xs sm:text-sm font-extrabold text-amber-600 font-['Montserrat',sans-serif] block uppercase tracking-wider">
                    {item.fase}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CALL TO ACTION FINAL                                                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-zinc-950 text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6 sm:space-y-8">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-amber-500 block font-['Montserrat',sans-serif]">
                Inicie Seu Projeto
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Vamos transformar a sua próxima obra em uma realidade sólida?
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                Conte com a inteligência técnica, a transparência e o Padrão Quattro. Fale com nossa equipe de engenheiros.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link
                  to="/contato"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 hover:-translate-y-0.5 font-['Montserrat',sans-serif]"
                >
                  <span>Solicitar Proposta de Engenharia</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};