// src/pages/Contato.tsx
import React from 'react';
import { Phone, Mail, MapPin, Clock, HelpCircle } from 'lucide-react';
import { Hero } from '../components/Hero';
import { LeadForm } from '../components/LeadForm';

const HERO_CONTATO_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2000',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000'
];

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
      {/* HERO SECTION */}
      <Hero 
        eyebrow="Canais de Atendimento"
        title="Fale com a equipe técnica da Quattro."
        subtitle="Estamos prontos para atender suas demandas de novos projetos, dúvidas operacionais, parcerias comerciais ou atendimento comunitário."
        images={HERO_CONTATO_IMAGES}
        ctaText="Enviar Mensagem"
        ctaLink="#formulario"
      />

      {/* SEÇÃO PRINCIPAL DE CONTATO E FORMULÁRIO */}
      <section id="formulario" className="py-20 bg-[#f8f9f6] border-t border-zinc-200/80">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* FORMULÁRIO ESQUERDA */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <LeadForm showSubjectSelect={true} />
          </div>

          {/* CANAIS DIREITA (ALINHADO PERFEITAMENTE) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-1.5">
              <span className="approach-badge">Atendimento Direto</span>
              <h2 className="approach-title">
                Outras Formas de Contato
              </h2>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-3 pt-2">
              {CANAIS_DIRETOS.map((canal, idx) => {
                const CanalIcon = canal.icon;
                return (
                  <div 
                    key={idx}
                    className="p-5 bg-white border border-zinc-200/80 rounded-2xl flex items-center gap-4 hover:border-amber-500/40 transition-colors shadow-xs flex-1"
                  >
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 shrink-0">
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
                          className="text-xs md:text-sm font-bold text-zinc-950 hover:text-amber-600 transition-colors block font-sans leading-snug"
                        >
                          {canal.info}
                        </a>
                      ) : (
                        <p className="text-xs md:text-sm font-bold text-zinc-950 font-sans leading-snug">
                          {canal.info}
                        </p>
                      )}

                      <p className="text-[11px] text-zinc-500 font-sans">
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

      {/* PERGUNTAS FREQUENTES */}
      <section className="py-20 bg-white border-t border-zinc-200/80">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="approach-badge">ESCLARECIMENTOS RÁPIDOS</span>
            <h2 className="approach-title">
              Dúvidas Frequentes sobre Atendimento
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FAQS_CONTATO.map((faq, idx) => (
              <div key={idx} className="bg-[#f8f9f6] border border-zinc-200/80 p-6 md:p-7 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-amber-600 font-['Montserrat']">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Dúvida Frequente</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-950 font-['Montserrat'] leading-snug">{faq.pergunta}</h3>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">{faq.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};