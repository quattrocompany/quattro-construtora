// src/pages/Setores.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Factory, Stethoscope, Wrench, Building2, ArrowRight, MapPin, Maximize2, CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Verifique se o caminho do import está correto

// Vamos usar os ícones dinamicamente depois
const iconMap: Record<string, any> = {
  'industrial': Factory,
  'hospitalar': Stethoscope,
  'manutencao': Wrench,
  'residencial': Building2
};

export const Setores: React.FC = () => {
  const [setoresData, setSetoresData] = useState<any[]>([]);
  const [obrasData, setObrasData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState<Record<string, number>>({});

  // BUSCA OS DADOS NO FIREBASE AO CARREGAR A PÁGINA
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const docRef = doc(db, 'site_data', 'portfolio');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dados = docSnap.data();
          if (dados.setores) setSetoresData(dados.setores);
          if (dados.obras) setObrasData(dados.obras);
        } else {
          console.log("Nenhum dado encontrado no Firebase.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const proximaImagem = (slug: string, total: number) => {
    setImgIndex((prev) => ({ ...prev, [slug]: ((prev[slug] ?? 0) + 1) % total }));
  };

  const imagemAnterior = (slug: string, total: number) => {
    setImgIndex((prev) => ({ ...prev, [slug]: ((prev[slug] ?? 0) - 1 + total) % total }));
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f8f9f6]">
        <div className="flex flex-col items-center gap-4 text-amber-500">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="font-['Montserrat'] font-bold tracking-widest text-sm text-zinc-900 uppercase">Carregando Portfólio...</p>
        </div>
      </div>
    );
  }

  const OBRAS_DESTAQUE = obrasData.filter((obra) => obra.destaque);

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img src="/img/Amazon_Entrada.jpg" alt="Quattro Construtora" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat']">
              <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-amber-500 font-bold">Setores</span>
            </nav>
            <h1 className="text-[2.3rem] font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              SOLUÇÕES SOB MEDIDA <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">PARA CADA SETOR</span>
            </h1>
            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Conheça nossas áreas de especialização técnica e navegue pelo portfólio de obras que atestam o Padrão Quattro de Qualidade em todo o país.
            </p>
            <div className="pt-2">
              <Link to="/contato" className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2 font-['Montserrat']">
                <span>Entre em Contato</span><ArrowRight className="w-4 h-4" />
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
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">Especialidades</span>
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">Setores de Atuação</h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Engenharia especializada por segmento, com normas técnicas e soluções construtivas adequadas às exigências de cada setor.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {setoresData.map((setor) => {
              const SetorIcon = iconMap[setor.id] || Building2; // Fallback para ícone genérico
              const imagensSetor = setor.imagens || [];
              const idx = imgIndex[setor.slug] ?? 0;
              const imagemAtual = imagensSetor[idx];

              return (
                <div key={setor.slug} className="flex flex-col sm:flex-row bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300">
                  <div className="relative sm:w-2/5 lg:w-[44%] shrink-0 min-h-[220px] bg-zinc-100">
                    {imagemAtual && (
                      <>
                        <img src={imagemAtual.url} alt={imagemAtual.alt || setor.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" />
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
                        <button type="button" onClick={() => imagemAnterior(setor.slug, imagensSetor.length)} className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-950 shadow-md transition-all z-20"><ChevronLeft className="w-4 h-4" /></button>
                        <button type="button" onClick={() => proximaImagem(setor.slug, imagensSetor.length)} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-950 shadow-md transition-all z-20"><ChevronRight className="w-4 h-4" /></button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                          {imagensSetor.map((_: any, i: number) => (
                            <button key={i} type="button" onClick={() => setImgIndex((prev) => ({ ...prev, [setor.slug]: i }))} className={`h-1.5 rounded-full transition-all ${i === idx ? 'bg-amber-500 w-5' : 'bg-white/70 hover:bg-white w-1.5'}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex-1 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl shrink-0"><SetorIcon className="w-5 h-5" /></div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-zinc-950 font-['Montserrat'] leading-snug">{setor.title}</h3>
                    </div>
                    {/* Exibe badges se existirem (pode precisar cadastrar isso no painel depois) */}
                    {setor.nbrs && (
                      <div className="flex gap-2 flex-wrap">
                        {setor.nbrs.map((nbr: string, idx2: number) => (
                          <span key={idx2} className="text-[10px] font-mono font-bold bg-[#f8f9f6] border border-zinc-200/80 text-zinc-600 px-2.5 py-1 rounded-md">{nbr}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">{setor.desc}</p>
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
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">Acervo Executivo</span>
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">Obras em Destaque</h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">Uma seleção de projetos que representam o Padrão Quattro de Qualidade.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OBRAS_DESTAQUE.map((obra) => (
              <div key={obra.id} className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img src={obra.capaImage} alt={obra.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-950/80 text-amber-500 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 font-['Montserrat']">
                        {obra.categoriaLabel || obra.categoriaSlug}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md font-['Montserrat'] ${obra.status === 'Concluído' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-zinc-950'}`}>
                        {obra.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-4">
                    <Link to="/contato" className="block"><h3 className="text-lg sm:text-xl font-bold text-zinc-950 font-['Montserrat'] group-hover:text-amber-600 transition-colors leading-snug">{obra.title}</h3></Link>
                    <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">{obra.resumo}</p>
                    <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 font-medium border-t border-zinc-100">
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" /><span>{obra.local}</span></div>
                      <div className="flex items-center gap-1.5 font-sans"><Maximize2 className="w-3.5 h-3.5 text-amber-500 shrink-0" /><span>{obra.area}</span></div>
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
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">Consultoria Técnica de Engenharia</span>
              <h2 className="text-[2.3rem] font-extrabold text-white leading-[1.12]">Sua obra precisa de rigor técnico e previsibilidade absoluta?</h2>
              <p className="text-zinc-400 text-sm md:text-base font-sans font-normal leading-relaxed">Fale diretamente com os engenheiros responsáveis da Quattro Construtora.</p>
              <div className="pt-2">
                <Link to="/contato" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 font-['Montserrat']">
                  <span>Falar com um Engenheiro</span><ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center md:justify-end pointer-events-none">
              <div className="relative -mt-40 md:-mt-48 lg:-mt-32 xl:-mt-40">
                <div className="w-72 h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] xl:w-[440px] xl:h-[440px] rounded-full border-4 border-amber-500 overflow-hidden shadow-2xl bg-zinc-900">
                  <img src="/img/Amazon_imgRodape.avif" alt="Engenharia Quattro Construtora" className="w-full h-full object-cover object-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};