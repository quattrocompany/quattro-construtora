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
  CheckCircle2,
  Medal
} from 'lucide-react';

const METRICAS_IMPACTO = [
  { num: '+15 Anos', label: 'De inteligência construtiva, precisão técnica e governança nacional.' },
  { num: '+1.000.000 m²', label: 'Área construída em obras corporativas, industriais e residenciais.' },
  { num: '100%', label: 'Compromisso com orçamentos firmados e gestão rigorosa de riscos.' },
  { num: 'Nível A', label: 'Certificações PBQP-H e ISO 9001:2015 com processos auditados.' }
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
    desc: 'Megaobras de distribuição para a Amazon e parque operacional do Grupo Sequoia.'
  },
  {
    icon: Building2,
    title: 'Corporativo',
    desc: 'Sedes e centrais da Vivo / Telefônica, além de edifícios empresariais como Unique Tower e Memorial Trade Tower.'
  },
  {
    icon: Pill,
    title: 'Farmacêutico & Saúde',
    desc: 'Instalações para Lavoisier / DASA, Hospitalis e complexos de ensino da UNICID.'
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
    desc: 'Início focado em engenharia consultiva e obras técnicas de alta complexidade.'
  },
  {
    fase: 'Expansão & Incorporação',
    desc: 'Cobertura logística em todo o Brasil e consolidação do braço imobiliário (Quattro Inc).'
  },
  {
    fase: 'Acreditação Máxima',
    desc: 'Conquista das certificações PBQP-H Nível A e NBR ISO 9001:2015.'
  },
  {
    fase: 'Grandes Contas B2B',
    desc: 'Parcerias estratégicas com multinacionais dos setores de logística, telecomunicações e saúde.'
  },
  {
    fase: 'Escala Residencial',
    desc: 'Expansão da marca com megacomplexos residenciais de milhares de unidades entregues.'
  }
];

const VALORES_GOVERNANCA = [
  { title: 'Rigor Técnico', desc: 'Padrão executivo acima das normas exigidas.' },
  { title: 'Previsibilidade', desc: 'Cumprimento estrito de prazos e orçamentos.' },
  { title: 'Integridade', desc: 'Compliance, ética e total transparência.' },
  { title: 'Segurança', desc: 'Proteção integral do trabalhador e zero acidentes.' },
  { title: 'ESG', desc: 'Construção sustentável com responsabilidade socioambiental.' }
];

export const QuemSomos: React.FC = () => {
  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION (IMAGEM + MÁSCARA BLUR DEGRADÉ IDÊNTICA À HOME) */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        {/* MÍDIA DE FUNDO FULL WIDTH */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/BG_CTA_QuattroInc_Site.jpeg"
            alt="Quattro Construtora - Quem Somos"
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
              <span className="text-amber-500 font-bold">A Quattro</span>
            </nav>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              CONHEÇA A <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                NOSSA EMPRESA
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Da infraestrutura logística e sedes corporativas à escala de grandes complexos residenciais. Transformamos desafios executivos complexos em soluções sólidas, previsíveis e sustentáveis em todo o Brasil.
            </p>

            <div className="pt-2">
              <Link
                to="/contato"
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2 font-['Montserrat']"
              >
                <span>Solicitar Apresentação Técnica</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MÉTRICAS DE IMPACTO */}
      <section className="bg-white border-b border-zinc-200/80 py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICAS_IMPACTO.map((metric, idx) => (
              <div key={idx} className="bg-white border border-zinc-200/80 p-6 rounded-2xl border-t-4 border-t-amber-500 shadow-xs hover:shadow-md transition-all space-y-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-600 block font-['Montserrat']">{metric.num}</span>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium font-sans">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO INSTITUCIONAL */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Quem Somos
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Soluções End-to-End <br className="hidden sm:block" />
              & Rigor Técnico
            </h2>
            
            <div className="w-16 h-1 bg-amber-500 rounded-full" />

            <div className="space-y-4 text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans">
              <p>
                A Quattro Construtora é especializada em soluções end-to-end de alta complexidade. Com mais de 1 milhão de metros quadrados executados, construímos nossa reputação onde o rigor técnico é inegociável: de galpões logísticos e plantas industriais a sedes corporativas, ambientes farmacêuticos controlados e complexos residenciais.
              </p>
              <p>
                Atuamos no modelo Turnkey (Design & Build), assumindo responsabilidade integral por todo o ciclo da obra — dos estudos de viabilidade e projetos executivos ao comissionamento e entrega final das chaves.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2rem] overflow-hidden border border-zinc-200/80 shadow-2xl aspect-[4/3] bg-zinc-200 group">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600" 
                alt="Engenharia Quattro Construtora" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-2 md:bottom-8 md:-right-6 bg-zinc-950 text-white p-6 rounded-2xl border border-zinc-800 shadow-2xl max-w-xs hidden sm:block backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2 font-['Montserrat']">
                <Award className="w-6 h-6 text-amber-500 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Qualidade Garantida</span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Supervisão técnica de engenharia dedicada em 100% dos canteiros de obra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. O PADRÃO QUATTRO EM AÇÃO */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Metodologia Executiva
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                O Padrão Quattro em Ação
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-sm font-sans leading-relaxed">
              Diferenciais de gestão operacional que garantem previsibilidade total e controle físico-financeiro ao contratante.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILARES_PADRAO.map((pilar, idx) => {
              const PilarIcon = pilar.icon;
              return (
                <div key={idx} className="bg-[#f8f9f6] border border-zinc-200/80 p-7 rounded-3xl hover:border-amber-500/50 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-4">
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                    <PilarIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 font-['Montserrat']">{pilar.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">{pilar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PROVA SOCIAL (GRANDES OBRAS) */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Prova Social
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Grandes Obras Executadas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PROVA_SOCIAL_OBRAS.map((setor, idx) => {
              const SetorIcon = setor.icon;
              return (
                <div key={idx} className="bg-white border border-zinc-200/80 p-8 rounded-3xl space-y-4 shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all duration-300">
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                    <SetorIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-950 font-['Montserrat']">{setor.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">{setor.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. POLÍTICA DA QUALIDADE */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* ESQUERDA: TEXTO INSTITUCIONAL */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                  <Medal className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                    Compromisso Institucional
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12]">
                    POLÍTICA DA QUALIDADE QUATTRO
                  </h3>
                </div>
              </div>

              <blockquote className="text-zinc-700 text-sm md:text-base leading-relaxed italic border-l-4 border-amber-500 pl-4 font-sans">
                "A Quattro Construtora atua na construção civil e na incorporação de empreendimentos habitacionais, corporativos e industriais com foco na excelência dos produtos e serviços entregues. Assegura a satisfação dos clientes, garante o cumprimento dos requisitos legais e promove a melhoria contínua dos processos, mantendo o compromisso com práticas sustentáveis e inovadoras que respeitam o meio ambiente."
              </blockquote>

              <div className="flex items-start gap-3 pt-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                  <strong className="text-zinc-950 font-['Montserrat']">Acreditação Auditada:</strong> Selos PBQP-H Nível A e NBR ISO 9001:2015 auditados e certificados com processos rigorosamente padronizados.
                </p>
              </div>
            </div>

            {/* DIREITA: CARDS DE SELOS COM FONTES EXPANDIDAS E ALTURA PROPORCIONAL */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5 h-full">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block font-['Montserrat']">
                Selos e Acreditações Oficiais
              </span>

              {/* SELO 1: PBQP-H */}
              <div className="bg-[#f8f9f6] p-6 sm:p-7 rounded-3xl border border-zinc-200/80 flex items-center gap-6 shadow-xs hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all duration-300 h-full">
                <div className="h-20 w-36 shrink-0 flex items-center justify-center p-2 bg-white rounded-2xl border border-zinc-200/60 shadow-2xs">
                  <img 
                    src="/selos/SELO_pbqph.png" 
                    alt="Selo PBQP-H Nível A" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-base sm:text-lg font-extrabold text-zinc-950 block font-['Montserrat']">
                    PBQP-H Nível A
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed block">
                    Certificação Máxima de Qualidade e Produtividade no Habitat
                  </span>
                </div>
              </div>

              {/* SELO 2: ISO 9001 */}
              <div className="bg-[#f8f9f6] p-6 sm:p-7 rounded-3xl border border-zinc-200/80 flex items-center gap-6 shadow-xs hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all duration-300 h-full">
                <div className="h-20 w-36 shrink-0 flex items-center justify-center p-2 bg-white rounded-2xl border border-zinc-200/60 shadow-2xs">
                  <img 
                    src="/selos/SELO_ISO9001.png" 
                    alt="Selo ISO 9001:2015" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-base sm:text-lg font-extrabold text-zinc-950 block font-['Montserrat']">
                    ISO 9001:2015
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed block">
                    Sistema de Gestão de Qualidade Auditado e Homologado
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. GOVERNANÇA CORPORATIVA */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Diretrizes Estratégicas
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Governança Corporativa
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Missão</h3>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                Entregar engenharia de alta performance com compromisso intransigente em qualidade, segurança e previsibilidade orçamentária, gerando valor sustentável para clientes e sociedade.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Visão</h3>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                Ser a parceira estratégica referência no mercado nacional em obras complexas nos setores Industrial, Corporativo, Farmacêutico e Residencial, reconhecida pela excelência técnica e governança.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Valores</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 font-sans">
                {VALORES_GOVERNANCA.map((val, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <strong className="text-zinc-950 font-['Montserrat']">• {val.title}:</strong> {val.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRAJETÓRIA */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Nossa História
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Trajetória de Crescimento
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto pl-8 border-l-2 border-amber-500/80 space-y-8">
            {TRAJETORIA_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-amber-500 rounded-full border-4 border-white group-hover:scale-125 transition-transform duration-300" />
                <div className="bg-[#f8f9f6] border border-zinc-200/80 p-6 rounded-2xl shadow-xs space-y-2 hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all duration-300">
                  <span className="text-xs sm:text-sm font-bold text-amber-600 block uppercase tracking-wider font-['Montserrat']">
                    {item.fase}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION FINAL */}
      <section className="py-20 sm:py-28 bg-zinc-950 text-white font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-14 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Inicie Seu Projeto
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12]">
                Vamos transformar o seu próximo projeto em uma solução sólida?
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-sans font-normal leading-relaxed">
                Conte com a inteligência técnica, a transparência e a previsibilidade do Padrão Quattro. Fale diretamente com nossos engenheiros.
              </p>

              <div className="pt-2">
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 font-['Montserrat']"
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

export default QuemSomos;