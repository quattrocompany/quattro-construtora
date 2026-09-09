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

interface LogoData {
  name: string;
  src: string;
  href?: string;
}

const LogoItem: React.FC<{ logo: LogoData }> = ({ logo }) => {
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setAttempt(0);
  }, [logo.src]);

  const getAltPath = (path: string) => {
    if (path.startsWith('/img/')) return path.replace('/img/', '/logos/');
    if (path.startsWith('/logos/')) return path.replace('/logos/', '/img/');
    return path;
  };

  const hasError = attempt >= 2;
  const src = attempt === 0 ? logo.src : getAltPath(logo.src);

  const handleError = () => {
    setAttempt((prev) => prev + 1);
  };

  if (hasError) {
    const fallback = (
      <span className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center leading-tight">
        {logo.name}
      </span>
    );
    return logo.href ? (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center"
      >
        {fallback}
      </a>
    ) : (
      <div className="w-full h-full flex items-center justify-center">{fallback}</div>
    );
  }

  const image = (
    <img
      src={src}
      alt={logo.name}
      className="max-h-full max-w-full object-contain block grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      onError={handleError}
    />
  );

  return logo.href ? (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-full flex items-center justify-center"
      aria-label={logo.name}
    >
      {image}
    </a>
  ) : (
    <div className="w-full h-full flex items-center justify-center">{image}</div>
  );
};

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
    desc: 'Inteligência applied para otimizar projetos. Readequações ágeis em campo que preservam a integridade e a data de entrega.'
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
      { src: '/img/Amazon_Img1.jpg' },
      { src: '/img/CisTambore_Img1.jpg' },
      { src: '/img/Sequoia_Img1.jpg' }
    ],
    logos: [
      { name: 'Amazon', src: '/img/amazon.svg', href: '' },
      { name: 'Sequoia', src: '/img/sequoia.svg', href: '' }
    ]
  },
  {
    icon: Building2,
    title: 'Corporativo & Triple A',
    desc: 'Sedes corporativas de alto padrão tecnológico e edifícios empresariais com foco em eficiência energética, construídos para líderes do setor de telecomunicações.',
    images: [
      { src: '/img/Vivo_Img1.jpeg' },
      { src: '/img/Servidores_Img2.jpeg' },
      { src: '/img/vivo_img3.jpeg' }
    ],
    logos: [
      { name: 'Vivo', src: '/img/vivo.svg', href: '' },
      { name: 'Telefônica', src: '/img/telefonica.svg', href: '' }
    ]
  },
  {
    icon: Pill,
    title: 'Farmacêutico & Saúde',
    desc: 'Instalações de missão crítica e salas limpas para a área da saúde. Infraestrutura hospitalar complexa com rigorosos padrões sanitários para grandes players de medicina diagnóstica.',
    images: [
      { src: '/img/CDR_Img1.jpg' },
      { src: '/img/Lavoisier_Img2.jpg' },
      { src: '/img/HelioBerzaghi_Img3.jpg' }
    ],
    logos: [
      { name: 'DASA', src: '/img/dasa.svg', href: '' },
      { name: 'Lavoisier', src: '/img/lavoisier.svg', href: '' },
      { name: 'Unicid', src: '/img/unicid.svg', href: '' }
    ]
  },
  {
    icon: HomeIcon,
    title: 'Residencial de Escala',
    desc: 'Construção de megacomplexos imobiliários e clubes residenciais com centenas de unidades, integrando industrialização do canteiro para garantir conforto habitacional e pontualidade.',
    images: [
      { src: '/img/Lumini1_Testeira1.avif' },
      { src: '/img/Lumini2_Quarto.png' },
      { src: '/img/piscina_Lumini3.jpg' }
    ],
    logos: [
      { name: 'Lumini', src: '/img/lumini1.svg', href: 'https://www.quattroinc.com.br/empreendimentos/lumini-clube-1' },
      { name: 'Lumini', src: '/img/lumini2.svg', href: 'https://www.quattroinc.com.br/empreendimentos/lumini-clube-2' },
      { name: 'Lumini', src: '/img/lumini3.svg', href: 'https://www.lumini3.com.br/' },
      { name: 'Nova Califórnia', src: '/img/novacalifornia.svg', href: 'https://www.novacalifornia.com.br/' },
      { name: 'Ocean Park', src: '/img/oceanpark.svg', href: 'https://www.oceanosasco.com.br/' }
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
  const [activeSegment, setActiveSegment] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSegment((prev) => (prev + 1) % PROVA_SOCIAL_OBRAS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat']">
        <div className="absolute inset-0 bg-black z-0" />

        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-30">
          <img
            src="/img/QuemSomos_3321.jpg"
            alt="Quattro Construtora - Quem Somos"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden flex items-center justify-end">
          <img
            src="/img/Grafismo.png"
            alt=""
            className="w-[80%] sm:w-[60%] lg:w-[45%] max-w-3xl h-auto object-contain object-right opacity-40 mix-blend-overlay"
          />
        </div>

        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-20 pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-30 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat']">
              <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-amber-500 font-bold">A Quattro</span>
            </nav>

            <h1 className="text-[2.3rem] font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
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
                <span>Entre em contato</span>
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
              
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
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
                <span>Falar Conosco</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-zinc-200/80 shadow-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 flex-1">
              
              <div className="p-7 sm:p-8 flex flex-col justify-between border-b border-zinc-200/80 space-y-4">
                <div className="h-12 flex items-baseline">
                  <span className="text-[2.3rem] font-black text-amber-500 font-['Montserrat'] tracking-tight">+15 Anos</span>
                </div>
                <div className="space-y-2 flex-1 flex flex-col justify-start">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 font-['Montserrat'] min-h-[2.5rem] flex items-center">Inteligência Construtiva</span>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">Atuação pautada por rigor técnico, gestão orçamentária e governança corporativa em todo o país.</p>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex flex-col justify-between border-b border-zinc-200/80 space-y-4">
                <div className="h-12 flex items-baseline">
                  <span className="text-[2.3rem] font-black text-amber-500 font-['Montserrat'] tracking-tight">+1M m²</span>
                </div>
                <div className="space-y-2 flex-1 flex flex-col justify-start">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 font-['Montserrat'] min-h-[2.5rem] flex items-center">Área Construída</span>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">Sólido acervo executivo de alta complexidade nos setores industrial, corporativo e residencial.</p>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="h-12 flex items-baseline">
                  <span className="text-[2.3rem] font-black text-amber-500 font-['Montserrat'] tracking-tight">100%</span>
                </div>
                <div className="space-y-2 flex-1 flex flex-col justify-start">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 font-['Montserrat'] min-h-[2.5rem] flex items-center">Previsibilidade</span>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">Garantia estrita de custos orçados, gestão de riscos e entrega dentro do prazo contratado.</p>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="h-12 flex items-baseline">
                  <span className="text-[2.3rem] font-black text-amber-500 font-['Montserrat'] tracking-tight">Nível A</span>
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
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Engenharia de Alta Performance
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Diferenciais de gestão operacional que garantem previsibilidade total, segurança jurídica e a entrega com um padrão de excelência inquestionável.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 divide-zinc-200/80 border-t border-b border-zinc-200/80">
            {PILARES_PADRAO.map((pilar, idx) => {
              const PilarIcon = pilar.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col space-y-4 p-8 sm:p-10 ${
                    idx % 3 !== 0 ? 'md:border-l md:border-zinc-200/80' : ''
                  } ${
                    idx < 3 ? 'border-b md:border-b md:border-zinc-200/80' : ''
                  }`}
                >
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl w-fit">
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
      <section className="py-20 sm:py-28 bg-zinc-800 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          <div className="block lg:hidden space-y-4 mb-8">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Prova Social
            </span>
            <h2 className="text-[2.3rem] font-extrabold text-white font-['Montserrat'] leading-[1.12] tracking-tight">
              Grandes Obras Executadas
            </h2>
            <p className="text-zinc-300 text-sm font-normal leading-relaxed font-sans">
              Conheça os projetos de alta complexidade que atestam a nossa capacidade técnica e o compromisso inabalável com o resultado final do seu negócio.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* Coluna 1: Slider Fotográfico */}
            <div className="w-full lg:w-1/2 bg-white rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-2xl p-2 sm:p-3 flex-shrink-0 z-10 relative">
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-full lg:min-h-[550px] rounded-xl overflow-hidden">
                {PROVA_SOCIAL_OBRAS.map((setor, idx) => (
                  <div 
                    key={idx} 
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex flex-col gap-2 sm:gap-3 ${
                      activeSegment === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex-1 rounded-lg overflow-hidden relative group">
                      <img 
                        src={setor.images?.[0]?.src || '/img/Amazon_Img1.jpg'} 
                        alt={`Obra principal ${setor.title}`}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="h-[35%] flex gap-2 sm:gap-3">
                      <div className="flex-1 rounded-lg overflow-hidden relative group">
                        <img 
                          src={setor.images?.[1]?.src || '/img/CisTambore_Img1.jpg'} 
                          alt={`Detalhe 1 ${setor.title}`}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      <div className="flex-1 rounded-lg overflow-hidden relative group">
                        <img 
                          src={setor.images?.[2]?.src || '/img/Sequoia_Img1.jpg'} 
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
              
              <div className="hidden lg:block p-8 lg:p-10 lg:pb-6 space-y-3">
                <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                  Prova Social
                </span>
                <h2 className="text-[2.3rem] font-extrabold text-white font-['Montserrat'] leading-[1.12] tracking-tight">
                  Grandes Obras Executadas
                </h2>
                <p className="text-zinc-300 text-base font-normal leading-relaxed font-sans max-w-xl">
                  Conheça os projetos de alta complexidade que atestam a nossa capacidade técnica e o compromisso inabalável com o resultado final do seu negócio.
                </p>
              </div>

              <div className="flex-1 bg-white rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative z-10">
                {PROVA_SOCIAL_OBRAS.map((setor, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col space-y-8 animate-[fadeIn_0.5s_ease-in-out] pb-12 lg:pb-16 ${
                      activeSegment === idx ? 'block' : 'hidden'
                    }`}
                  >
                    {/* Grid de 6 Colunas: 1 para o ícone e 5 para alinhar todos os logos estritamente à direita */}
                    <div className="grid grid-cols-6 gap-2 sm:gap-4 items-center w-full">
                      <div className="col-span-1 p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl w-fit shrink-0">
                        <setor.icon className="w-7 h-7" />
                      </div>
                      
                      {[0, 1, 2, 3, 4].map((i) => {
                        const maxIndex = Math.min(setor.logos.length, 5);
                        const emptySlots = 5 - maxIndex;
                        const logoIndex = i - emptySlots;
                        const logo = logoIndex >= 0 ? setor.logos[logoIndex] : null;

                        return (
                          <div key={i} className="col-span-1 h-7 sm:h-9 flex items-center justify-center min-w-0">
                            {logo ? <LogoItem logo={logo} /> : null}
                          </div>
                        );
                      })}
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
                ))}

                <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-10 flex gap-2 sm:gap-3 z-20">
                  {PROVA_SOCIAL_OBRAS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSegment(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
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
          
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* LADO ESQUERDO: Título, descrição, citação e acreditação */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="space-y-4">
                <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                  Compromisso Institucional
                </span>
                <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                  Política de Qualidade
                </h2>
                <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                  Nossos pilares éticos e certificações oficiais garantem total transparência, segurança técnica e processos rigorosamente auditados em todas as fases.
                </p>
              </div>

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

            {/* LADO DIREITO: Título centralizado e Grid dos 2 Cards de Selos */}
            <div className="lg:col-span-6 flex flex-col space-y-6 lg:pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block text-center font-['Montserrat']">
                Selos e Acreditações Oficiais
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                <div className="bg-white border border-zinc-200/80 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div className="h-16 flex items-center justify-center sm:justify-start">
                    <img 
                      src="/selos/SELO_pbqph.png" 
                      alt="Selo PBQP-H Nível A" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-zinc-950 font-['Montserrat']">
                      PBQP-H Nível A
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                      Certificação máxima do Programa Brasileiro da Qualidade e Produtividade do Habitat. Acreditação auditada que garante conformidade estrita com diretrizes técnicas, padronização de processos e segurança executiva de alto nível.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200/80 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div className="h-16 flex items-center justify-center sm:justify-start">
                    <img 
                      src="/selos/SELO_ISO9001.png" 
                      alt="Selo ISO 9001:2015" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-zinc-950 font-['Montserrat']">
                      ISO 9001:2015
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                      Padrão internacional para Sistemas de Gestão da Qualidade. Homologação oficial que atesta eficiência contínua, governança corporativa transparente e foco absoluto no cumprimento de prazos e excelência operacional.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO PARALLAX */}
      <section 
        className="w-full h-[40vh] sm:h-[50vh] bg-fixed bg-center bg-cover bg-no-repeat relative flex items-center justify-center border-y border-zinc-200/80"
        style={{ backgroundImage: `url('/img/Lumini1_Testeira1.avif')` }}
      >
        <div className="absolute inset-0 bg-zinc-950/0 backdrop-blur-none" />
      </section>

      {/* 6. GOVERNANÇA CORPORATIVA */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Diretrizes Estratégicas
              </span>
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
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
            <div className="bg-white border border-zinc-200/80 p-8 rounded-2xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl w-fit">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Missão</h3>
              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                Entregar engenharia de alta performance com compromisso intransigente em qualidade, segurança e previsibilidade orçamentária, gerando valor sustentável para clientes e sociedade.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 p-8 rounded-2xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Visão</h3>
              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                Ser a parceira estratégica referência no mercado nacional em obras complexas nos setores Industrial, Corporativo, Farmacêutico e Residencial.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 p-8 rounded-2xl shadow-xs hover:shadow-lg hover:border-amber-500/40 transition-all duration-300 space-y-4">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat']">Valores e Ética</h3>
              <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                Atuamos com <strong className="text-zinc-950 font-['Montserrat'] font-semibold">Rigor Técnico</strong> inegociável, asseguramos <strong className="text-zinc-950 font-['Montserrat'] font-semibold">Previsibilidade</strong> total, mantemos <strong className="text-zinc-950 font-['Montserrat'] font-semibold">Integridade</strong> absoluta e valorizamos a <strong className="text-zinc-950 font-['Montserrat'] font-semibold">Segurança</strong> e a sustentabilidade <strong className="text-zinc-950 font-['Montserrat'] font-semibold">(ESG)</strong>.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TRAJETÓRIA (INFOGRÁFICO DE ESCADA RESPONSIVO COM SETAS INDIVIDUAIS) */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat'] overflow-visible">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12 md:space-y-16">
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Nossa História
              </span>
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Trajetória de Crescimento
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Conheça os marcos importantes que consolidaram a marca Quattro como uma referência nacional incontestável na construção de alta complexidade.
              </p>
            </div>
          </div>

          {/* VISUALIZAÇÃO DESKTOP: Infográfico em Escada Ascendente com Arcos/Setas Individuais */}
          <div className="hidden lg:block relative pt-12 pb-16">
            <div className="w-full relative px-4">
              
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10" 
                viewBox="0 0 1000 380" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <defs>
                  <marker 
                    id="arrowhead-desktop" 
                    markerWidth="8" 
                    markerHeight="8" 
                    refX="6" 
                    refY="4" 
                    orient="auto"
                  >
                    <path d="M 0 0 L 8 4 L 0 8 z" fill="#f59e0b" />
                  </marker>
                </defs>

                {/* Arco 1 -> 2 com Seta */}
                <path 
                  d="M 100 270 C 120 180, 260 180, 280 220" 
                  stroke="#f59e0b" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 4" 
                  fill="none" 
                  markerEnd="url(#arrowhead-desktop)"
                />
                
                {/* Arco 2 -> 3 com Seta */}
                <path 
                  d="M 300 220 C 320 130, 460 130, 480 170" 
                  stroke="#f59e0b" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 4" 
                  fill="none" 
                  markerEnd="url(#arrowhead-desktop)"
                />

                {/* Arco 3 -> 4 com Seta */}
                <path 
                  d="M 500 170 C 520 80, 660 80, 680 120" 
                  stroke="#f59e0b" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 4" 
                  fill="none" 
                  markerEnd="url(#arrowhead-desktop)"
                />

                {/* Arco 4 -> 5 com Seta Final */}
                <path 
                  d="M 700 120 C 720 30, 870 30, 890 65" 
                  stroke="#f59e0b" 
                  strokeWidth="3" 
                  fill="none" 
                  markerEnd="url(#arrowhead-desktop)"
                />
              </svg>

              <div className="grid grid-cols-5 gap-6 items-end relative z-20">
                {TRAJETORIA_TIMELINE.map((item, idx) => {
                  const offsets = ['mb-0', 'mb-12', 'mb-24', 'mb-36', 'mb-48'];
                  return (
                    <div key={idx} className={`relative flex flex-col items-center ${offsets[idx]}`}>
                      <div className="w-full bg-[#f8f9f6] border border-zinc-200/80 p-5 rounded-2xl flex flex-col space-y-2 shadow-sm hover:border-amber-500/60 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-amber-500 font-['Montserrat'] tracking-wider">
                            0{idx + 1}
                          </span>
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
                        </div>
                        
                        <h3 className="text-sm font-extrabold text-zinc-950 font-['Montserrat'] leading-tight">
                          {item.fase}
                        </h3>
                        
                        <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* VISUALIZAÇÃO MOBILE / TABLET: Empilhado Verticalmente (Zero espaço desperdiçado) */}
          <div className="block lg:hidden relative pl-6 border-l-2 border-amber-500/80 space-y-6">
            {TRAJETORIA_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform duration-300" />
                <div className="bg-[#f8f9f6] border border-zinc-200/80 p-5 rounded-2xl flex flex-col justify-start space-y-2 shadow-xs hover:border-amber-500/40 hover:bg-white transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-500 font-['Montserrat'] tracking-wider">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider font-['Montserrat']">
                      {item.fase}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-700 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION FINAL COM IMAGEM REDONDA EXPANDIDA VAZANDO NO TOPO */}
      <section className="relative pt-24 sm:pt-28 pb-20 sm:pb-28 bg-zinc-900 text-white font-['Montserrat'] border-t border-zinc-800">
        
        {/* Imagem Redonda Expandida Vazando para a Seção Anterior até alinhar a base com o botão */}
        <div className="absolute -top-36 sm:-top-48 md:-top-56 lg:-top-14 right-6 sm:right-12 lg:right-20 z-30 pointer-events-none">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[520px] lg:h-[520px] rounded-full border-4 border-amber-500 overflow-hidden shadow-2xl bg-zinc-900">
            <img 
              src="/img/Amazon_imgRodape.avif" 
              alt="Engenharia Quattro Construtora" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="relative max-w-2xl lg:max-w-3xl space-y-6">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Inicie Seu Projeto
            </span>

            <h2 className="text-[2.3rem] font-extrabold text-white leading-[1.12]">
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
                <span>Entre em Contato Conosco</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default QuemSomos;