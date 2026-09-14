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
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

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
    ],
    // ESTRUTURA ATUALIZADA COM URL E ALT TEXT PARA O BADGE
    imagens: [
      { url: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200', alt: 'Fachada Principal' },
      { url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200', alt: 'Interior do Galpão' }
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
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200', alt: 'Centro Cirúrgico' }
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
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200', alt: 'Subestação Elétrica' }
    ]
  },
  {
    slug: 'residencial',
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
    // Usando capaImage (nome do atributo que definimos no CMS)
    capaImage: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200',
    resumo: 'Execução de pavimento de alta resistência mecânica, 48 docas niveladoras e sistema de sprinklers K25.',
    destaque: true
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
    destaque: true
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
    destaque: true
  },
  {
    id: 4,
    title: 'Retrofit e Gestão de Facilities Fabril',
    categoriaSlug: 'manutencao',
    categoriaLabel: 'Facilities',
    local: 'Indaiatuba – SP',
    area: '22.000 m²',
    status: 'Concluído',
    capaImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200',
    resumo: 'Modernização completa da subestação elétrica, adequação NR-12 e reforma estrutural de cobertura.',
    destaque: false
  },
  {
    id: 5,
    title: 'Parque Industrial Farmacêutico',
    categoriaSlug: 'industrial',
    categoriaLabel: 'Industrial',
    local: 'Anápolis – GO',
    area: '32.000 m²',
    status: 'Em Execução',
    capaImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200',
    resumo: 'Planta industrial química com salas limpas padrão ISO 7 e tubulações sanitárias em aço inox 316L.',
    destaque: false
  },
  {
    id: 6,
    title: 'Residência Villa Toscana',
    categoriaSlug: 'residencial',
    categoriaLabel: 'Residencial',
    local: 'Campinas – SP',
    area: '1.400 m²',
    status: 'Concluído',
    capaImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    resumo: 'Residência de altíssimo padrão com balanços estruturais audaciosos e fachada autoral ventilada.',
    destaque: false
  }
];

const OBRAS_DESTAQUE = PORTFOLIO_OBRAS.filter((obra) => obra.destaque);

export const Setores: React.FC = () => {
  const [imgIndex, setImgIndex] = useState<Record<string, number>>({});

  const proximaImagem = (slug: string, total: number) => {
    setImgIndex((prev) => ({ ...prev, [slug]: ((prev[slug] ?? 0) + 1) % total }));
  };

  const imagemAnterior = (slug: string, total: number) => {
    setImgIndex((prev) => ({ ...prev, [slug]: ((prev[slug] ?? 0) - 1 + total) % total }));
  };

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        
        {/* MÍDIA DE FUNDO FULL WIDTH */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/Amazon_Entrada.jpg"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SETORES_DETALHADOS.map((setor) => {
              const SetorIcon = setor.icon;
              const imagensSetor = setor.imagens || [];
              const idx = imgIndex[setor.slug] ?? 0;
              const imagemAtual = imagensSetor[idx];

              return (
                <div
                  key={setor.slug}
                  className="flex flex-col sm:flex-row bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
                >
                  {/* Carrossel de imagens */}
                  <div className="relative sm:w-2/5 lg:w-[44%] shrink-0 min-h-[220px] bg-zinc-100">
                    {imagemAtual && (
                      <>
                        <img
                          key={`${setor.slug}-${idx}`}
                          src={imagemAtual.url}
                          alt={imagemAtual.alt || setor.title}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        />
                        
                        {/* BADGE COM O NOME DA FOTO (ALT TEXT) */}
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
                          aria-label="Imagem anterior"
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-950 shadow-md transition-all z-20"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => proximaImagem(setor.slug, imagensSetor.length)}
                          aria-label="Próxima imagem"
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-950 shadow-md transition-all z-20"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                          {imagensSetor.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setImgIndex((prev) => ({ ...prev, [setor.slug]: i }))}
                              aria-label={`Ver imagem ${i + 1}`}
                              className={`h-1.5 rounded-full transition-all ${
                                i === idx ? 'bg-amber-500 w-5' : 'bg-white/70 hover:bg-white w-1.5'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Informações */}
                  <div className="flex-1 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl shrink-0">
                        <SetorIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-zinc-950 font-['Montserrat'] leading-snug">
                        {setor.title}
                      </h3>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {setor.nbrs.map((nbr, idx2) => (
                        <span key={idx2} className="text-[10px] font-mono font-bold bg-[#f8f9f6] border border-zinc-200/80 text-zinc-600 px-2.5 py-1 rounded-md">
                          {nbr}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">{setor.desc}</p>

                    <div className="space-y-2">
                      {setor.diferenciais.map((item, idx2) => (
                        <div key={idx2} className="flex items-start gap-2.5 text-xs text-zinc-700 font-sans leading-tight">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
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
                Uma seleção de projetos que representam o Padrão Quattro de Qualidade em diferentes setores de atuação.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OBRAS_DESTAQUE.map((obra) => (
              <div
                key={obra.id}
                className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between"
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
                    <Link to="/contato" className="block">
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-950 font-['Montserrat'] group-hover:text-amber-600 transition-colors leading-snug">
                        {obra.title}
                      </h3>
                    </Link>

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
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. CALL TO ACTION FINAL COM IMAGEM REDONDA VAZANDO NO TOPO */}
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

            {/* Imagem Redonda: escondida no mobile, aparece a partir do md e vaza para a seção anterior */}
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

    </div>
  );
};