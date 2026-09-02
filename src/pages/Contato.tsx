// src/pages/Contato.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';

const CANAIS_DIRETOS = [
  {
    icon: Phone,
    titulo: 'Telefone & WhatsApp Comercial',
    info: '+55 (11) 4003-0000',
    sub: 'Segunda a Sexta, das 08h às 18h',
    href: 'https://wa.me/551140030000'
  },
  {
    icon: Mail,
    titulo: 'E-mail Institucional',
    info: 'contato@quattroconstrutora.com.br',
    sub: 'Resposta média em até 24h úteis',
    href: 'mailto:contato@quattroconstrutora.com.br'
  },
  {
    icon: MapPin,
    titulo: 'Sede Administrativa',
    info: 'Al. Rio Negro, 503 - Conj 907',
    sub: 'Alphaville Industrial – Barueri / SP - CEP 06454-000',
    href: 'https://www.google.com/maps/dir/-23.5012724,-46.8485149/Quattro+Construtora,+Al.+Rio+Negro,+503+-+Conj+907+-+Alphaville+Industrial,+Barueri+-+SP,+06454-000/@-23.5017254,-46.8509089,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x94ce574f51a7c4bd:0x6406a5f3e39d192b!2m2!1d-46.8486349!2d-23.5022332?entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    icon: Clock,
    titulo: 'Horário de Atendimento',
    info: 'Seg a Qui: 08h às 18h | Sex: 08h às 17h',
    sub: 'Plantão de emergências para obras ativas 24/7',
    href: null
  }
];

const FAQS_CONTATO = [
  {
    pergunta: 'Sou vizinho de uma obra em andamento. Como relatar um imprevisto?',
    resposta: 'Selecione a opção "Sou Vizinho de Obra" no formulário. Essa mensagem é direcionada com prioridade ao engenheiro residente.'
  },
  {
    pergunta: 'Como cadastrar minha empresa para ser fornecedor de insumos?',
    resposta: 'Utilize a opção "Sou Fornecedor / Parceria Comercial". Nosso departamento de suprimentos analisará suas homologações técnicas.'
  },
  {
    pergunta: 'Qual o prazo médio de retorno para solicitações de cotação?',
    resposta: 'Propostas preliminares são enviadas em até 48 horas úteis após o recebimento dos memoriais descritivos ou projetos.'
  }
];

export const Contato: React.FC = () => {
  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        {/* MÍDIA DE FUNDO FULL WIDTH */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/BG_CTA_QuattroInc_Site.jpeg"
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

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              FALE COM A NOSSA <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                EQUIPE TÉCNICA
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Estamos prontos para atender suas demandas de novos projetos, dúvidas operacionais, parcerias comerciais ou atendimento comunitário.
            </p>

            <div className="pt-2">
              <a
                href="#formulario"
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2 font-['Montserrat']"
              >
                <span>Enviar Mensagem</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO PRINCIPAL DE CONTATO E FORMULÁRIO (LAYOUT COMPACTADO E SIMÉTRICO) */}
      <section id="formulario" className="py-16 sm:py-24 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* FORMULÁRIO ESQUERDA */}
          <div className="lg:col-span-7">
            <LeadForm showSubjectSelect={true} />
          </div>

          {/* CANAIS DIREITA (BOXES REAJUSTADOS EM TAMANHO E ESPAÇAMENTO PARA EQUILÍBRIO VISUAL) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="space-y-2">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Atendimento Direto
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Outras Formas <br className="hidden sm:block" />
                de Contato
              </h2>
            </div>

            <div className="flex flex-col gap-3 pt-1">
              {CANAIS_DIRETOS.map((canal, idx) => {
                const CanalIcon = canal.icon;
                return (
                  <div 
                    key={idx}
                    className="p-4 sm:p-4.5 bg-white border border-zinc-200/80 rounded-2xl flex items-center gap-4 hover:border-amber-500/50 hover:shadow-md transition-all duration-300 shadow-xs"
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
                          rel="noreferrer"
                          className="text-xs sm:text-sm font-bold text-zinc-950 hover:text-amber-600 transition-colors block font-['Montserrat'] leading-snug"
                        >
                          {canal.info}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm font-bold text-zinc-950 font-['Montserrat'] leading-snug">
                          {canal.info}
                        </p>
                      )}

                      <p className="text-[11px] text-zinc-500 font-sans leading-normal">
                        {canal.sub}
                      </p>
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
              Dúvidas Frequentes sobre Atendimento
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {FAQS_CONTATO.map((faq, idx) => (
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
        </div>
      </section>

    </div>
  );
};

export default Contato;