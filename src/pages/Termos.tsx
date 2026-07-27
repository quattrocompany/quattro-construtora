// src/pages/Termos.tsx
import React from 'react';
import { 
  Scale, 
  Lock 
} from 'lucide-react';
import { Hero } from '../components/Hero';

// ============================================================================
// DADOS ESTÁTICOS DA PÁGINA DE TERMOS DE USO
// ============================================================================

const HERO_TERMOS_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000',
  'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000'
];

// ============================================================================
// COMPONENTE PRINCIPAL TERMOS DE USO
// ============================================================================

export const Termos: React.FC = () => {
  return (
    <div className="w-full bg-white text-zinc-900 font-['Inter',sans-serif] selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO INSTITUCIONAL                                                      */}
      {/* ========================================================================= */}
      <Hero 
        eyebrow="Aspectos Jurídicos"
        title="Termos e Condições de Uso."
        subtitle="Regras e diretrizes para navegação e utilização das plataformas digitais da Quattro Construtora."
        images={HERO_TERMOS_IMAGES}
        ctaText="Falar Conosco"
        ctaLink="/contato"
      />

      {/* ========================================================================= */}
      {/* 2. CONTEÚDO INSTITUCIONAL DOS TERMOS DE USO                                */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* NAVEGAÇÃO LATERAL / SUMÁRIO */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 block font-['Montserrat',sans-serif]">
                    Regulamento
                  </span>
                  <h3 className="text-base font-extrabold text-zinc-950">
                    Termos Oficiais
                  </h3>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-200" />

              <nav className="space-y-2 text-xs font-semibold text-zinc-600 font-['Montserrat',sans-serif]">
                <a href="#aceitacao" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  1. Aceitação dos Termos
                </a>
                <a href="#uso" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  2. Uso do Site e Conteúdos
                </a>
                <a href="#propriedade" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  3. Propriedade Intelectual
                </a>
                <a href="#limitacao" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  4. Limitação de Responsabilidade
                </a>
                <a href="#foro" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  5. Foro e Legislação
                </a>
              </nav>
            </div>

            <div className="p-6 bg-zinc-950 text-white rounded-3xl border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-500 font-['Montserrat',sans-serif]">
                <Lock className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Última Atualização</span>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Estes Termos foram atualizados pela última vez em <strong>27 de Julho de 2026</strong>.
              </p>
            </div>
          </aside>

          {/* TEXTO NORMATIVO COMPLETO */}
          <div className="lg:col-span-8 space-y-12 text-zinc-700 text-sm md:text-base leading-relaxed font-normal">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
                Condições Gerais
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950">
                Termos de Uso do Portal
              </h2>
              <p>
                Bem-vindo ao portal da <strong>Quattro Company Construtora e Incorporadora Ltda.</strong> ("Quattro Construtora"). Ao acessar ou utilizar nossos canais digitais, você concorda expressamente com os termos e condições descritos neste documento.
              </p>
            </div>

            <div id="aceitacao" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                1. Aceitação dos Termos
              </h3>
              <p>
                O acesso e navegação neste site implicam a aceitação plena e sem reservas de todas as disposições incluídas nestes Termos de Uso. Caso discorde de qualquer condição, solicitamos que interrompa a utilização das plataformas imediatamente.
              </p>
            </div>

            <div id="uso" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                2. Uso do Site e Conteúdos
              </h3>
              <p>
                O usuário se compromete a utilizar os conteúdos, ferramentas e serviços disponibilizados pela Quattro Construtora de forma ética, responsável e alinhada à legislação vigente. É terminantemente proibido utilizar a estrutura do site para a prática de atos ilícitos, invasão de sistemas ou disseminação de códigos maliciosos.
              </p>
            </div>

            <div id="propriedade" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                3. Propriedade Intelectual
              </h3>
              <p>
                Todos os textos, fotos de obras, marcas, logotipos, projetos arquitetônicos, layouts, softwares e acervos técnicos exibidos neste portal pertencem exclusivamente à Quattro Construtora ou a parceiros devidamente autorizados, estando protegidos pela legislação de direitos autorais e propriedade industrial. É vedada a reprodução, cópia ou distribuição não autorizada.
              </p>
            </div>

            <div id="limitacao" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                4. Limitação de Responsabilidade
              </h3>
              <p>
                Empregamos contínuos esforços para manter as informações do portal precisas e atualizadas. No entanto, as imagens de projetos, maquetes virtuais e prazos operacionais possuem caráter meramente ilustrativo e institucional, podendo sofrer modificações sem aviso prévio.
              </p>
            </div>

            <div id="foro" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                5. Foro e Legislação Aplicável
              </h3>
              <p>
                Estes Termos de Uso são regidos e interpretados estritamente em conformidade com as leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de Barueri/SP para dirimir eventuais controvérsias oriundas do uso destas plataformas.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Termos;