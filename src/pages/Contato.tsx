// src/pages/Contato.tsx
import { useImagens } from '../lib/siteContent';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';
import { FAQS_PADRAO, getFaqs, type FaqPublico } from '../lib/faq';
import { useContato, hrefWhatsapp, hrefMapa } from '../lib/siteContent';
import type { ContatoInfo } from '../data/siteDefaults';

const montarCanais = (c: ContatoInfo) => [
  { icon: Phone, titulo: 'Telefone & WhatsApp Comercial', info: c.comercialPhone, sub: '', href: hrefWhatsapp(c.comercialPhone) as string | null },
  { icon: Mail, titulo: 'E-mail Institucional', info: c.comercialEmail, sub: 'Resposta média em até 24h úteis', href: `mailto:${c.comercialEmail}` as string | null },
  { icon: MapPin, titulo: 'Sede Administrativa', info: c.enderecoLinha1, sub: c.enderecoLinha2, href: hrefMapa(c) as string | null },
  { icon: Clock, titulo: 'Horário de Atendimento', info: c.horario, sub: '', href: null as string | null },
];

export const Contato: React.FC = () => {
  const img = useImagens();
  const contato = useContato();
  const CANAIS_DIRETOS = montarCanais(contato);
  // Perguntas marcadas em /admin > Contato como "Mostrar também na página Contato".
  const [faqs, setFaqs] = useState<FaqPublico[]>(FAQS_PADRAO);
  useEffect(() => {
    getFaqs().then(setFaqs);
  }, []);
  const faqsContato = faqs.filter((f) => f.destaque);

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        {/* MÍDIA DE FUNDO FULL WIDTH */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src={img.bannerContato}
            alt="Quattro Construtora - Atendimento"
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
              <span className="text-amber-500 font-bold">Contato</span>
            </nav>

            <h1 className="text-[2.3rem] font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              FALE COM A NOSSA <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                EQUIPE TÉCNICA
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Estamos prontos para atender suas demandas de novos projetos, dúvidas operacionais, parcerias comerciais ou atendimento comunitário.
            </p>

          </div>
        </div>
      </section>

      {/* 2. SEÇÃO PRINCIPAL DE CONTATO E FORMULÁRIO (SIMETRIA 1:1 EM ALTURA) */}
      <section id="formulario" className="py-16 sm:py-24 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* FORMULÁRIO ESQUERDA */}
          <div className="lg:col-span-7 flex flex-col justify-stretch">
            <LeadForm showSubjectSelect={true} />
          </div>

          {/* CANAIS DIREITA (EXPANDIDO PARA ALINHAR PERFEITAMENTE COM O FORMULÁRIO DA ESQUERDA) */}
          <div className="lg:col-span-5 flex flex-col h-full justify-between">
            <div className="space-y-2 pb-2">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Atendimento Direto
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Outras Formas de Contato
              </h2>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-3">
              {CANAIS_DIRETOS.map((canal, idx) => {
                const CanalIcon = canal.icon;
                return (
                  <div 
                    key={idx}
                    className="p-4 sm:p-5 bg-white border border-zinc-200/80 rounded-2xl flex items-center gap-4 hover:border-amber-500/50 hover:shadow-md transition-all duration-300 shadow-xs flex-1"
                  >
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 shrink-0">
                      <CanalIcon className="w-5 h-5" />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block font-['Montserrat']">
                        {canal.titulo}
                      </span>
                      
                      {canal.href ? (
                        <a 
                          href={canal.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm font-bold text-zinc-950 hover:text-amber-600 transition-colors block font-['Montserrat'] leading-snug"
                        >
                          {canal.info}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm font-bold text-zinc-950 font-['Montserrat'] leading-snug">
                          {canal.info}
                        </p>
                      )}

                      {canal.sub && (
                        <p className="text-[11px] text-zinc-500 font-sans leading-normal">
                          {canal.sub}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. PERGUNTAS FREQUENTES */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Esclarecimentos Rápidos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Tem alguma dúvida? Veja nossa página de FAQ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {faqsContato.map((faq, idx) => (
              <div key={idx} className="bg-[#f8f9f6] border border-zinc-200/80 p-7 sm:p-8 rounded-3xl space-y-3 shadow-xs hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 text-amber-600 font-['Montserrat']">
                  <HelpCircle className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Dúvida Frequente</span>
                </div>
                <h3 className="text-base font-bold text-zinc-950 font-['Montserrat'] leading-snug">{faq.pergunta}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">{faq.resposta}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              to="/duvidas-frequentes"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 font-['Montserrat']"
            >
              <span>Saiba Mais</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contato;