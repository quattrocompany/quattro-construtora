// src/pages/QuemSomos.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  ArrowRight, 
  HardHat, 
  ChevronRight,
  FileCheck2,
  Layers,
  Building2,
  Factory,
  Pill,
  Home as HomeIcon,
  CheckCircle2,
  LineChart,
  ShieldAlert,
  Leaf
} from 'lucide-react';

const PILARES_PADRAO = [
  {
    icon: HardHat,
    title: 'Rigor Técnico ABNT',
    desc: 'Execução estrita das normas vigentes e parâmetros internacionais de desempenho estrutural, garantindo durabilidade máxima ao seu ativo.'
  },
  {
    icon: LineChart,
    title: 'Gestão Físico-Financeira',
    desc: 'Monitoramento em tempo real com relatórios gerenciais periódicos. Controle absoluto de custos, sem surpresas no orçamento final.'
  },
  {
    icon: Layers,
    title: 'Engenharia Consultiva',
    desc: 'Inteligência aplicada para otimizar projetos. Readequações ágeis em campo que preservam a integridade e a data de entrega.'
  },
  {
    icon: FileCheck2,
    title: 'Turnkey & Compliance',
    desc: 'Solução de ponta a ponta. Gerenciamos todas as etapas, desde licenças e aprovações até o Habite-se, AVCB e entrega das chaves.'
  },
  {
    icon: ShieldAlert,
    title: 'Segurança do Trabalho',
    desc: 'Compromisso inegociável com a vida. Canteiros auditados, equipes treinadas e aplicação rigorosa das NRs, com meta de zero acidentes.'
  },
  {
    icon: Leaf,
    title: 'Sustentabilidade Aplicada',
    desc: 'Canteiros limpos, gestão eficiente de resíduos e aplicação de tecnologias construtivas que reduzem o impacto ambiental.'
  }
];

const PROVA_SOCIAL_OBRAS = [
  {
    icon: Factory,
    title: 'Industrial & Logística',
    desc: 'Projetos de alta tonelagem e megaobras de centros de distribuição para gigantes do e-commerce e transporte, superando desafios de cronograma e especificações técnicas.',
    images: [
      { src: '/img/placeholder.jpg' },
      { src: '/img/placeholder.jpg' },
      { src: '/img/placeholder.jpg' }
    ],
    logos: [
      { name: 'Amazon', src: '/logos/amazon.svg' },
      { name: 'Sequoia', src: '/logos/sequoia.svg' }
    ]
  },
  {
    icon: Building2,
    title: 'Corporativo & Triple A',
    desc: 'Sedes corporativas de alto padrão tecnológico e edifícios empresariais com foco em eficiência energética, construídos para líderes do setor de telecomunicações.',
    images: [
      { src: '/img/placeholder.jpg' },
      { src: '/img/placeholder.jpg' },
      { src: '/img/placeholder.jpg' }
    ],
    logos: [
      { name: 'Vivo', src: '/logos/vivo.svg' },
      { name: 'Telefônica', src: '/logos/telefonica.svg' }
    ]
  },
  {
    icon: Pill,
    title: 'Farmacêutico & Saúde',
    desc: 'Instalações de missão crítica e salas limpas para a área da saúde. Infraestrutura hospitalar complexa com rigorosos padrões sanitários para grandes players de medicina diagnóstica.',
    images: [
      { src: '/img/placeholder.jpg' },
      { src: '/img/placeholder.jpg' },
      { src: '/img/placeholder.jpg' }
    ],
    logos: [
      { name: 'DASA', src: '/logos/dasa.svg' },
      { name: 'Lavoisier', src: '/logos/lavoisier.svg' },
      { name: 'Unicid', src: '/logos/unicid.svg' }
    ]
  },
  {
    icon: HomeIcon,
    title: 'Residencial de Escala',
    desc: 'Construção de megacomplexos imobiliários e clubes residenciais com centenas de unidades, integrando industrialização do canteiro para garantir conforto habitacional e pontualidade.',
    images: [
      { src: '/img/placeholder.jpg' },
      { src: '/img/placeholder.jpg' },
      { src: '/img/placeholder.jpg' }
    ],
    logos: [
      { name: 'Lumini', src: '/logos/lumini.svg' },
      { name: 'Nova Califórnia', src: '/logos/nova-california.svg' },
      { name: 'Ocean Park', src: '/logos/ocean-park.svg' }
    ]
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

export const QuemSomos: React.FC = () => {
  // HOOKS NO TOPO DO COMPONENTE
  const [activeSegment, setActiveSegment] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSegment((prev) => (prev + 1) % PROVA_SOCIAL_OBRAS.length);
    }, 6000); // Muda a cada 6 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat']">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/BG_CTA_QuattroInc_Site.jpeg"
            alt="Quattro Construtora - Quem Somos"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />

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

      {/* 2. MANIFESTO INSTITUCIONAL + QUADRO BENTO (50/50 PERFECT SPLIT) */}
      <section 
        className="relative py-20 sm:py-28 bg-cover bg-center border-b border-zinc-200/80 font-['Montserrat']"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(248, 249, 246, 0.98) 0%, rgba(248, 249, 246, 0.88) 45%, rgba(248, 249, 246, 0.3) 100%), url('/img/BG-Quem-Somos-Home.jpg')`
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 pr-0 lg:pr-6">
            <div className="space-y-6">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Quem Somos
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Soluções End-to-End <br className="hidden sm:block" />
                & Rigor Técnico
              </h2>

              <div className="space-y-4 text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                <p>
                  A Quattro Construtora é especializada em soluções end-to-end de alta complexidade. Com mais de 1 milhão de metros quadrados executados, construímos nossa reputação onde o rigor técnico é inegociável: de galpões logísticos e plantas industriais a sedes corporativas, ambientes farmacêuticos controlados e complexos residenciais.
                </p>
                <p>
                  Atuamos no modelo Turnkey (Design & Build), assumindo responsabilidade integral por todo o ciclo da obra — dos estudos de viabilidade e projetos executivos ao comissionamento e entrega final das chaves.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/contato" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md font-['Montserrat']">
                <span>Falar com Nossos Engenheiros</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-zinc-200/80 shadow-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 flex-1">
              
              <div className="p-7 sm:p-8 flex flex-col justify-between border-b border-zinc-200/80 space-y-4">
                <div className="h-12 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-black text-amber-500 font-['Montserrat'] tracking-tight">+15 Anos</span>
                </div>
                <div className="space-y-2 flex-1 flex flex-col justify-start">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 font-['Montserrat'] min-h-[2.5rem] flex items-center">Inteligência Construtiva</span>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">Atuação pautada por rigor técnico, gestão orçamentária e governança corporativa em todo o país.</p>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex flex-col justify-between border-b border-zinc-200/80 space-y-4">
                <div className="h-12 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-black text-amber-500 font-['Montserrat'] tracking-tight">+1M m²</span>
                </div>
                <div className="space-y-2 flex-1 flex flex-col justify-start">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 font-['Montserrat'] min-h-[2.5rem] flex items-center">Área Construída</span>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">Sólido acervo executivo de alta complexidade nos setores industrial, corporativo e residencial.</p>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="h-12 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-black text-amber-500 font-['Montserrat'] tracking-tight">100%</span>
                </div>
                <div className="space-y-2 flex-1 flex flex-col justify-start">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 font-['Montserrat'] min-h-[2.5rem] flex items-center">Previsibilidade</span>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">Garantia estrita de custos orçados, gestão de riscos e entrega dentro do prazo contratado.</p>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="h-12 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-black text-amber-500 font-['Montserrat'] tracking-tight">Nível A</span>
                </div>
                <div className="space-y-2 flex-1 flex flex-col justify-start">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 font-['Montserrat'] min-h-[2.5rem] flex items-center">Qualidade Máxima</span>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">Acreditação máxima auditada e certificada pelas normas oficiais PBQP-H Nível A e ISO 9001.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. ENGENHARIA DE ALTA PERFORMANCE */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Nosso DNA Executivo
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Engenharia de Alta Performance
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Diferenciais de gestão operacional que garantem previsibilidade total, segurança jurídica e a entrega com um padrão de excelência inquestionável.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILARES_PADRAO.map((pilar, idx) => {
              const PilarIcon = pilar.icon;
              return (
                <div key={idx} className="bg-[#f8f9f6] border border-zinc-200/80 p-8 rounded-3xl flex flex-col justify-start space-y-4 hover:border-amber-500/40 hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                    <PilarIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">{pilar.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-sans">{pilar.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. PROVA SOCIAL */}
      {/* Background alterado para cinza 80% (bg-zinc-800) */}
      <section className="py-20 sm:py-28 bg-zinc-800 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          {/* Título Mobile (Aparece apenas em telas menores) */}
          <div className="block lg:hidden space-y-4 mb-8">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Prova Social
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Montserrat'] leading-[1.12] tracking-tight">
              Grandes Obras Executadas
            </h2>
            <p className="text-zinc-300 text-sm font-normal leading-relaxed font-sans">
              Conheça os projetos de alta complexidade que atestam a nossa capacidade técnica e o compromisso inabalável com o resultado final do seu negócio.
            </p>
          </div>

          {/* Container Principal "L-Shape" Unificado */}
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* Coluna 1: Slider Fotográfico (Fundo Branco, Bordas Arredondadas exceto Canto Inferior Direito) */}
            <div className="w-full lg:w-1/2 bg-white rounded-t-[2rem] rounded-b-none lg:rounded-l-[3rem] lg:rounded-r-none lg:rounded-tr-[3rem] p-4 sm:p-6 lg:p-8 flex-shrink-0 z-10 relative">
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full lg:min-h-[600px] rounded-2xl overflow-hidden">
                {PROVA_SOCIAL_OBRAS.map((setor, idx) => (
                  <div 
                    key={idx} 
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex flex-col gap-2 sm:gap-3 ${
                      activeSegment === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Imagem Principal */}
                    <div className="flex-1 rounded-xl overflow-hidden relative group">
                      <img 
                        src={setor.images?.[0]?.src || '/img/placeholder.jpg'} 
                        alt={`Obra principal ${setor.title}`}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    {/* 2 Imagens Secundárias */}
                    <div className="h-[35%] flex gap-2 sm:gap-3">
                      <div className="flex-1 rounded-xl overflow-hidden relative group">
                        <img 
                          src={setor.images?.[1]?.src || '/img/placeholder.jpg'} 
                          alt={`Detalhe 1 ${setor.title}`}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      <div className="flex-1 rounded-xl overflow-hidden relative group">
                        <img 
                          src={setor.images?.[2]?.src || '/img/placeholder.jpg'} 
                          alt={`Detalhe 2 ${setor.title}`}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 2: Textos e Informações */}
            <div className="w-full lg:w-1/2 flex flex-col">
              
              {/* Cabeçalho Desktop (Transparente, acima da área de texto) */}
              <div className="hidden lg:block p-8 lg:p-12 lg:pb-8 space-y-4">
                <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                  Prova Social
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Montserrat'] leading-[1.12] tracking-tight">
                  Grandes Obras Executadas
                </h2>
                <p className="text-zinc-300 text-base font-normal leading-relaxed font-sans max-w-xl">
                  Conheça os projetos de alta complexidade que atestam a nossa capacidade técnica e o compromisso inabalável com o resultado final do seu negócio.
                </p>
              </div>

              {/* Área de Texto do Segmento (Fundo Branco, conectada na base da Coluna 1) */}
              <div className="flex-1 bg-white rounded-b-[2rem] rounded-t-none lg:rounded-r-[3rem] lg:rounded-l-none p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative z-10">
                {PROVA_SOCIAL_OBRAS.map((setor, idx) => {
                  if (activeSegment !== idx) return null;
                  const SetorIcon = setor.icon;

                  return (
                    <div 
                      key={idx} 
                      className="flex flex-col space-y-8 animate-[fadeIn_0.5s_ease-in-out] pb-12 lg:pb-16"
                    >
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                          <SetorIcon className="w-8 h-8" />
                        </div>
                        
                        <div className="flex items-center gap-5 flex-wrap">
                          {setor.logos.map((logo, i) => (
                            <div key={i} className="h-7 sm:h-9 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                              <img 
                                src={logo.src} 
                                alt={logo.name} 
                                className="max-h-full max-w-[100px] object-contain"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                  const span = document.createElement('span');
                                  span.className = "text-xs font-bold text-zinc-400 uppercase tracking-widest";
                                  span.innerText = logo.name;
                                  (e.target as HTMLElement).parentNode?.appendChild(span);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-['Montserrat'] leading-tight">
                          {setor.title}
                        </h3>
                        <p className="text-base text-zinc-600 font-sans leading-relaxed">
                          {setor.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Dots de Navegação (No canto inferior direito da área de texto) */}
                <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-12 flex gap-2 sm:gap-3 z-20">
                  {PROVA_SOCIAL_OBRAS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSegment(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeSegment === idx ? 'bg-amber-500 w-8' : 'bg-zinc-200 hover:bg-zinc-300 w-2.5'
                      }`}
                      aria-label={`Ir para ${PROVA_SOCIAL_OBRAS[idx].title}`}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. POLÍTICA DE QUALIDADE */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            
            {/* Coluna 1 (Esquerda): Títulos, Parágrafo, Manifesto e Observação */}
            <div className="flex flex-col space-y-6">
              
              {/* Header da Seção */}
              <div className="space-y-4">
                <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                  Compromisso Institucional
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                  Política de Qualidade
                </h2>
                <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                  Nossos pilares éticos e certificações oficiais garantem total transparência, segurança técnica e processos rigorosamente auditados em todas as fases.
                </p>
              </div>

              {/* Manifesto e Observação */}
              <div className="space-y-6 pt-2">
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

            </div>

            {/* Coluna 2 (Direita): Selos com alinhamento rigoroso à esquerda e espaçamento equilibrado */}
            <div className="flex flex-col space-y-6 lg:pl-10 lg:pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block font-['Montserrat']">
                Selos e Acreditações Oficiais
              </span>

              <div className="flex flex-col space-y-8">
                {/* Selo 1: PBQP-H */}
                <div className="flex flex-col items-start space-y-2 group">
                  <div className="h-16 max-w-[200px] flex items-center justify-start">
                    <img 
                      src="/selos/SELO_pbqph.png" 
                      alt="Selo PBQP-H Nível A" 
                      className="max-h-full max-w-full object-contain object-left filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-zinc-950 block font-['Montserrat']">
                      PBQP-H Nível A
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed block max-w-sm">
                      Certificação Máxima de Qualidade e Produtividade no Habitat
                    </p>
                  </div>
                </div>

                {/* Selo 2: ISO 9001 */}
                <div className="flex flex-col items-start space-y-2 group">
                  <div className="h-16 max-w-[200px] flex items-center justify-start">
                    <img 
                      src="/selos/SELO_ISO9001.png" 
                      alt="Selo ISO 9001:2015" 
                      className="max-h-full max-w-full object-contain object-left filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-zinc-950 block font-['Montserrat']">
                      ISO 9001:2015
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed block max-w-sm">
                      Sistema de Gestão de Qualidade Auditado e Homologado
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. GOVERNANÇA CORPORATIVA */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Diretrizes Estratégicas
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Governança Corporativa
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Operamos com total alinhamento aos princípios éticos, valorizando a conformidade legal e o respeito absoluto às diretrizes ambientais e de segurança.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Missão</h3>
              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                Entregar engenharia de alta performance com compromisso intransigente em qualidade, segurança e previsibilidade orçamentária, gerando valor sustentável para clientes e sociedade.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Visão</h3>
              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                Ser a parceira estratégica referência no mercado nacional em obras complexas nos setores Industrial, Corporativo, Farmacêutico e Residencial.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Valores e Ética</h3>
              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                Atuamos com <strong className="text-zinc-950 font-['Montserrat']">Rigor Técnico</strong> inegociável, asseguramos <strong className="text-zinc-950 font-['Montserrat']">Previsibilidade</strong> total, mantemos <strong className="text-zinc-950 font-['Montserrat']">Integridade</strong> absoluta e valorizamos a <strong className="text-zinc-950 font-['Montserrat']">Segurança</strong> e a sustentabilidade <strong className="text-zinc-950 font-['Montserrat']">(ESG)</strong>.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TRAJETÓRIA */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Nossa História
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Trajetória de Crescimento
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Conheça os marcos importantes que consolidaram a marca Quattro como uma referência nacional incontestável na construção de alta complexidade.
              </p>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto pl-8 border-l-2 border-amber-500/80 space-y-8">
            {TRAJETORIA_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[39px] top-1.5 w-4 h-4 bg-amber-500 rounded-full border-4 border-white group-hover:scale-125 transition-transform duration-300" />
                <div className="bg-[#f8f9f6] border border-zinc-200/80 p-6 sm:p-8 rounded-3xl flex flex-col justify-start space-y-3 shadow-xs hover:border-amber-500/40 hover:bg-white hover:shadow-md transition-all duration-300">
                  <span className="text-sm font-extrabold text-amber-600 block uppercase tracking-wider font-['Montserrat']">
                    {item.fase}
                  </span>
                  <p className="text-sm text-zinc-700 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION FINAL */}
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

              <p className="text-zinc-400 text-sm md:text-base font-sans font-normal leading-relaxed">
                Conte com a inteligência técnica, a transparência e a previsibilidade do Padrão Quattro. Fale diretamente com nossos engenheiros especialistas.
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