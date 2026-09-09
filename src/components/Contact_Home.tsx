// src/components/Contact_Home.tsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { LeadForm } from './LeadForm';

export const Contact_Home: React.FC = () => {
  return (
    <section id="contato" className="contact-section">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12 items-stretch w-full">
        <div className="lg:col-span-2 flex flex-col justify-between h-full space-y-8 py-2">
          <div className="space-y-3">
            <span className="contact-badge">FALE CONOSCO</span>
            <h2 className="contact-title">
              Pronto para tirar seu projeto do papel com a Quattro Construtora?
            </h2>
            <p className="contact-description">
              Nossa equipe técnica está pronta para entender suas demandas, apresentar soluções de engenharia de precisão e elaborar uma proposta sob medida.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-zinc-200/80">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block font-['Montserrat']">Atendimento Comercial</span>
                <a href="tel:1130450826" className="text-sm font-bold text-zinc-950 hover:text-amber-600 transition-colors">
                  +55 (11) 3045-0826
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block font-['Montserrat']">E-mail Direto</span>
                <a href="mailto:contato@quattroconstrutora.com.br" className="text-sm font-bold text-zinc-950 hover:text-amber-600 transition-colors">
                  contato@quattroconstrutora.com.br
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block font-['Montserrat']">Endereço</span>
                <a
                  href="https://www.google.com/maps/dir/-23.5012724,-46.8485149/Quattro+Construtora,+Al.+Rio+Negro,+503+-+Conj+907+-+Alphaville+Industrial,+Barueri+-+SP,+06454-000/@-23.5017254,-46.8509089,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x94ce574f51a7c4bd:0x6406a5f3e39d192b!2m2!1d-46.8486349!2d-23.5022332?entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-zinc-950 hover:text-amber-600 transition-colors block font-sans"
                >
                  Al. Rio Negro, 503 - Conj 907 - Alphaville Industrial - Barueri/SP
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <LeadForm showSubjectSelect={false} />
        </div>
      </div>
    </section>
  );
};