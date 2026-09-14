// src/pages/Setores.tsx
import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  ChevronLeft,
  Loader2,
  X
} from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SETORES_DETALHADOS = [
  {
    slug: 'industrial',
    id: 'industrial',
    title: 'Industrial & Logística',
    icon: Factory,
    desc: 'Engenharia para galpões logísticos de alta tonelagem, parques fabris, centros de distribuição automatizados e estruturas de grande vão livre.',
    nbrs: ['NBR 15575', 'NBR 6118', 'NBR 8800'],
    diferenciais: [
      'Pisos de alta capacidade de carga com nivelamento a laser.',
      'Sistemas estruturais em concreto pré-moldado e aço.',
      'Cobertoras metálicas com isolamento termoacústico subcoberta.'
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200', alt: 'Fachada Principal' },
      { url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200', alt: 'Interior do Galpão' }
    ]
  },
  {
    slug: 'hospitalar',
    id: 'hospitalar',
    title: 'Setor Hospitalar & Saúde',
    icon: Stethoscope,
    desc: 'Projetos e execuções de alta complexidade para centros cirúrgicos, UTIs, laboratórios de análise clínica e salas limpas com contaminação controlada.',
    nbrs: ['RDC 50 ANVISA', 'NBR 7256', 'NBR 12188'],
    diferenciais: [
      'Controle rigoroso de pressão positiva/negativa de ar.',
      'Gases medicinais, redes redundantes de energia e no-breaks.',
      'Revestimentos vinílicos monolíticos bactericidas.'
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200', alt: 'Centro Cirúrgico' }
    ]
  },
  {
    slug: 'manutencao',
    id: 'manutencao',
    title: 'Manutenção & Facilities',
    icon: Wrench,
    desc: 'Gestão preventiva, corretiva e retrofit de ativos prediais corporativos e industriais, garantindo a continuidade operacional e valorização patrimonial.',
    nbrs: ['NBR 5674', 'NBR 14037', 'NR 35'],
    diferenciais: [
      'Equipes dedicadas presenciais ou sob demanda de campo.',
      'Diagnósticos preditivos por termografia e análise de vibração.',
      'Atendimento emergencial 24/7 para plantas críticas.'
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200', alt: 'Subestação Elétrica' }
    ]
  },
  {
    slug: 'residencial',
    id: 'residencial',
    title: 'Residencial',
    icon: Building2,
    desc: 'Construção e incorporação de residências de alto padrão, vilas corporativas e edifícios de arquitetura autoral com métodos construtivos inovadores.',
    nbrs: ['NBR 15575', 'NBR 9575', 'NBR 5410'],
    diferenciais: [
      'Uso otimizado de Light Steel Frame e estruturas mistas.',
      'Automação residencial integrada e eficiência energética.',
      'Acabamentos refinados e rigor no detalhamento executivo.'
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200', alt: 'Piscina & Lazer' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200', alt: 'Fachada Autoral' }
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
    capaImage: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200',
    resumo: 'Execução de pavimento de alta resistência mecânica, 48 docas niveladoras e sistema de sprinklers K25.',
    descricaoCompleta: 'Execução completa em modelo Turnkey abrangendo terraplenagem, pavimentação rígida de alta capacidade, estrutura em pré-moldados e galeria logística.',
    destaque: true,
    galeriaImages: []
  },
  {
    id: 2,
    title: 'Complexo Hospitalar São Lucas - Ala OESTE',
    categoriaSlug: 'hospitalar',
    categoriaLabel: 'Hospitalar',
    local: 'São Paulo – SP',
    area: '12.800 m²',
    status: 'Concluído',
    capaImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200',
    resumo: 'Construção de 8 novas salas cirúrgicas inteligentes, 30 leitos de UTI e central de esterilização CME.',
    descricaoCompleta: 'Reforma e ampliação hospitalar de alta complexidade mantendo a operação contínua do complexo de saúde existente.',
    destaque: true,
    galeriaImages: []
  },
  {
    id: 3,
    title: 'Lumini Clube Residencial II',
    categoriaSlug: 'residencial',
    categoriaLabel: 'Residencial',
    local: 'Alphaville – Barueri/SP',
    area: '8.500 m²',
    status: 'Em Execução',
    capaImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200',
    resumo: 'Condomínio de residências contemporâneas em Steel Frame com certificação de eficiência energética.',
    descricaoCompleta: 'Condomínio fechado autoral com foco em sustentabilidade, estrutura industrializada leve e acabamentos de altíssimo padrão.',
    destaque: true,
    galeriaImages: []
  }
];

const iconMap: Record<string, any> = {
  'industrial': Factory,
  'hospitalar': Stethoscope,
  'manutencao': Wrench,
  'residencial': Building2
};

export const Setores: React.FC = () => {
  const [setoresData, setSetoresData] = useState<any[]>(SETORES_DETALHADOS);
  const [obrasData, setObrasData] = useState<any[]>(PORTFOLIO_OBRAS);
  const [loading, setLoading] = useState(true);
  
  const [imgIndex, setImgIndex] = useState<Record<string, number>>({});
  const [obraSelecionada, setObraSelecionada] = useState<any | null>(null);
  const [modalImgIndex, setModalImgIndex] = useState(0);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const docRef = doc(db, 'site_data', 'portfolio');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.setores && Array.isArray(data.setores) && data.setores.length > 0) {
            setSetoresData(data.setores);
          }
          if (data.obras && Array.isArray(data.obras) && data.obras.length > 0) {
            setObrasData(data.obras);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const proximaImagem = (slug: string, total: number) => {
    setImgIndex((prev) => ({ ...prev, [slug]: ((prev[slug] ?? 0) + 1) % total }));
  };

  const imagemAnterior = (slug: string, total: number) => {
    setImgIndex((prev) => ({ ...prev, [slug]: ((prev[slug] ?? 0) - 1 + total) % total }));
  };

  const getGaleriaCompleta = (obra: any) => {
    if (!obra) return [];
    const imagens = [];
    if (obra.capaImage) imagens.push({ url: obra.capaImage, alt: 'Imagem Principal' });
    if (obra.galeriaImages && Array.isArray(obra.galeriaImages)) {
      obra.galeriaImages.forEach((img: any) => {
        if (typeof img === 'string') imagens.push({ url: img, alt: '' });
        else if (img && img.url) imagens.push(img);
      });
    }
    return imagens;
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f8f9f6]">
        <div className="flex flex-col items-center gap-4 text-amber-500">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-['Montserrat'] font-bold tracking-widest text-sm text-zinc-900 uppercase">Carregando Acervo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/Amazon_Entrada.jpg"
            alt="Quattro Construtora - Setores de Atuação"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md z-10 pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat']">
              <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-amber-500 font-bold">Setores</span>
            </nav>

            <h1 className="text-[2.3rem] font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
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
                <span>Entre em Contato</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISÃO GERAL DOS SETORES */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Especialidades
              </span>
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Setores de Atuação
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Engenharia especializada por segmento, com normas técnicas e soluções construtivas adequadas às exigências de cada setor.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {setoresData.map((setor) => {
              const SetorIcon = setor.icon ? setor.icon : (iconMap[setor.id] || Building2);
              const imagensSetor = (setor.imagens || []).filter((img: any) => img && img.url && img.url.trim() !== '');
              const idx = imgIndex[setor.slug] ?? 0;
              const imagemAtual = imagensSetor[idx] || imagensSetor[0];

              return (
                <div
                  key={setor.slug}
                  className="flex flex-col sm:flex-row bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
                >
                  <div className="relative sm:w-2/5 lg:w-[45%] shrink-0 min-h-[260px] md:min-h-[320px] bg-zinc-100 flex items-center justify-center">
                    
                    {!imagemAtual && (
                      <Building2 className="w-10 h-10 text-zinc-300" />
                    )}

                    {imagemAtual && (
                      <>
                        <img
                          key={`${setor.slug}-${idx}`}
                          src={imagemAtual.url}
                          alt={imagemAtual.alt || setor.title}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        />
                        
                        {imagemAtual.alt && (
                          <div className="absolute top-3 left-3 z-10 pointer-events-none">
                            <span className="text-[9px] font-bold uppercase tracking-widest bg-zinc-950/80 text-white backdrop-blur-md px-2.5 py-1.5 rounded-md border border-white/10 font-['Montserrat'] shadow-lg">
                              {imagemAtual.alt}
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    {imagensSetor.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => imagemAnterior(setor.slug, imagensSetor.length)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-950 shadow-md transition-all z-20"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => proximaImagem(setor.slug, imagensSetor.length)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-950 shadow-md transition-all z-20"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                          {imagensSetor.map((_: any, i: number) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setImgIndex((prev) => ({ ...prev, [setor.slug]: i }))}
                              className={`h-1.5 rounded-full transition-all ${
                                i === (imgIndex[setor.slug] ?? 0) ? 'bg-amber-500 w-5' : 'bg-white/70 hover:bg-white w-1.5'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl shrink-0">
                        <SetorIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-zinc-950 font-['Montserrat'] leading-snug">
                        {setor.title}
                      </h3>
                    </div>

                    {setor.nbrs && (
                      <div className="flex gap-2 flex-wrap">
                        {setor.nbrs.map((nbr: string, idx2: number) => (
                          <span key={idx2} className="text-[10px] font-mono font-bold bg-[#f8f9f6] border border-zinc-200/80 text-zinc-600 px-2.5 py-1 rounded-md">
                            {nbr}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">{setor.desc}</p>

                    {setor.diferenciais && (
                      <div className="space-y-2 pt-1">
                        {setor.diferenciais.map((item: string, idx2: number) => (
                          <div key={idx2} className="flex items-start gap-2.5 text-xs text-zinc-700 font-sans leading-tight">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. OBRAS EM DESTAQUE */}
      <section id="portfolio" className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Acervo Executivo
              </span>
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Obras em Destaque
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Uma seleção de projetos que representam o Padrão Quattro de Qualidade em diferentes setores de atuação. Clique nas imagens para ver a galeria.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {obrasData.map((obra) => (
              <div
                key={obra.id}
                className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                onClick={() => {
                  setObraSelecionada(obra);
                  setModalImgIndex(0);
                }}
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img
                      src={obra.capaImage}
                      alt={obra.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-950/80 text-amber-500 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 font-['Montserrat']">
                        {obra.categoriaLabel || obra.categoriaSlug}
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

                    <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed line-clamp-3">
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
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. CALL TO ACTION FINAL */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-20 sm:pb-28 bg-zinc-900 text-white font-['Montserrat'] border-t border-zinc-800 overflow-visible">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">
            <div className="relative max-w-2xl space-y-6">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Consultoria Técnica de Engenharia
              </span>

              <h2 className="text-[2.3rem] font-extrabold text-white leading-[1.12]">
                Sua obra precisa de rigor técnico e previsibilidade absoluta?
              </h2>

              <p className="text-zinc-400 text-sm md:text-base font-sans font-normal leading-relaxed">
                Fale diretamente com os engenheiros responsáveis da Quattro Construtora. Analisamos o escopo do seu projeto e desenvolvemos a proposta ideal para o seu setor.
              </p>

              <div className="pt-2">
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 font-['Montserrat']"
                >
                  <span>Falar com um Engenheiro</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex justify-center md:justify-end pointer-events-none">
              <div className="relative -mt-40 md:-mt-48 lg:-mt-32 xl:-mt-40">
                <div className="w-72 h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] xl:w-[440px] xl:h-[440px] rounded-full border-4 border-amber-500 overflow-hidden shadow-2xl bg-zinc-900">
                  <img
                    src="/img/Amazon_imgRodape.avif"
                    alt="Engenharia Quattro Construtora"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL (LAYOUT 2 COLUNAS: 70% GALERIA / 30% INFO) */}
      {obraSelecionada && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-zinc-950/90 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-6xl max-h-[85vh] sm:max-h-[80vh] mt-8 lg:mt-12 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col lg:flex-row">
            
            <button 
              onClick={() => setObraSelecionada(null)} 
              className="absolute top-4 right-4 z-[60] p-2.5 bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 rounded-full backdrop-blur-md transition-colors border border-zinc-800"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* COLUNA ESQUERDA (70%) */}
            <div className="w-full lg:w-[70%] p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar bg-zinc-950/50">
              <div className="w-full h-[35vh] lg:h-[50vh] bg-zinc-950 rounded-2xl overflow-hidden relative flex items-center justify-center shrink-0 border border-zinc-800/50">
                <img 
                  src={getGaleriaCompleta(obraSelecionada)[modalImgIndex]?.url} 
                  alt="Imagem Principal"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {getGaleriaCompleta(obraSelecionada).length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 shrink-0 custom-scrollbar-thin">
                  {getGaleriaCompleta(obraSelecionada).map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setModalImgIndex(idx)} 
                      className={`w-24 h-16 sm:w-28 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        modalImgIndex === idx ? 'border-amber-500 opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="Miniatura" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* COLUNA DIREITA (30%) */}
            <div className="w-full lg:w-[30%] bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-800 flex flex-col p-6 sm:p-8 overflow-y-auto custom-scrollbar">
              <div className="mb-6 pr-8">
                <span className="inline-block bg-zinc-800 text-amber-500 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-3 font-['Montserrat']">
                  {obraSelecionada.categoriaLabel || obraSelecionada.categoriaSlug}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Montserrat'] leading-snug">
                  {obraSelecionada.title}
                </h3>
                <div className="flex flex-col gap-1.5 mt-4 text-xs text-zinc-400 font-sans">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /><span>{obraSelecionada.local}</span></div>
                  <div className="flex items-center gap-2"><Maximize2 className="w-4 h-4 text-amber-500" /><span>{obraSelecionada.area}</span></div>
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-['Montserrat']">
                  Detalhes do Projeto
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {obraSelecionada.descricaoCompleta || obraSelecionada.resumo}
                </p>
              </div>

              <div className="mt-auto shrink-0 pt-6 border-t border-zinc-800">
                <Link 
                  to="/contato" 
                  onClick={() => setObraSelecionada(null)}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Entre em Contato</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};