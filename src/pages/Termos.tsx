// src/pages/Termos.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  Lock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const Termos: React.FC = () => {
  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
            alt="Quattro Construtora - Termos de Uso"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat']">
              <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-amber-500 font-bold">Termos de Uso</span>
            </nav>

            <h1 className="text-[2.3rem] font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              TERMOS E CONDIÇÕES <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                DE USO
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Regras e diretrizes para navegação e utilização das plataformas digitais da Quattro Construtora.
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

      {/* 2. CONTEÚDO INSTITUCIONAL DOS TERMOS DE USO */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* NAVEGAÇÃO LATERAL / SUMÁRIO */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 bg-[#f8f9f6] border border-zinc-200/80 rounded-3xl space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 block font-['Montserrat']">
                    Regulamento
                  </span>
                  <h3 className="text-base font-extrabold text-zinc-950 font-['Montserrat']">
                    Termos Oficiais
                  </h3>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-200/80" />

              <nav className="space-y-2 text-xs font-semibold text-zinc-600 font-['Montserrat']">
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
              <div className="flex items-center gap-2 text-amber-500 font-['Montserrat']">
                <Lock className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Última Atualização</span>
              </div>
              <p className="text-xs text-zinc-400 font-normal leading-relaxed font-sans">
                Estes Termos foram atualizados pela última vez em <strong>27 de Julho de 2026</strong>.
              </p>
            </div>
          </aside>

          {/* TEXTO NORMATIVO COMPLETO */}
          <div className="lg:col-span-8 space-y-12 text-zinc-700 text-sm md:text-base leading-relaxed font-normal font-sans">

            <div className="space-y-4">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Condições Gerais
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.15] tracking-tight">
                Termos de Uso do Portal
              </h2>
              <p>
                Bem-vindo ao portal da <strong>Quattro Company Construtora e Incorporadora Ltda.</strong> ("Quattro Construtora"). Ao acessar ou utilizar nossos canais digitais, você concorda expressamente com os termos e condições descritos neste documento.
              </p>
            </div>

            <div id="aceitacao" className="space-y-4 pt-6 border-t border-zinc-200/80">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat']">
                1. Aceitação dos Termos
              </h3>
              <p>
                O acesso e navegação neste site implicam a aceitação plena e sem reservas de todas as disposições incluídas nestes Termos de Uso. Caso discorde de qualquer condição, solicitamos que interrompa a utilização das plataformas imediatamente.
              </p>
            </div>

            <div id="uso" className="space-y-4 pt-6 border-t border-zinc-200/80">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat']">
                2. Uso do Site e Conteúdos
              </h3>
              <p>
                O usuário se compromete a utilizar os conteúdos, ferramentas e serviços disponibilizados pela Quattro Construtora de forma ética, responsável e alinhada à legislação vigente. É terminantemente proibido utilizar a estrutura do site para a prática de atos ilícitos, invasão de sistemas ou disseminação de códigos maliciosos.
              </p>
            </div>

            <div id="propriedade" className="space-y-4 pt-6 border-t border-zinc-200/80">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat']">
                3. Propriedade Intelectual
              </h3>
              <p>
                Todos os textos, fotos de obras, marcas, logotipos, projetos arquitetônicos, layouts, softwares e acervos técnicos exibidos neste portal pertencem exclusivamente à Quattro Construtora ou a parceiros devidamente autorizados, estando protegidos pela legislação de direitos autorais e propriedade industrial. É vedada a reprodução, cópia ou distribuição não autorizada.
              </p>
            </div>

            <div id="limitacao" className="space-y-4 pt-6 border-t border-zinc-200/80">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat']">
                4. Limitação de Responsabilidade
              </h3>
              <p>
                Empregamos contínuos esforços para manter as informações do portal precisas e atualizadas. No entanto, as imagens de projetos, maquetes virtuais e prazos operacionais possuem caráter meramente ilustrativo e institucional, podendo sofrer modificações sem aviso prévio.
              </p>
            </div>

            <div id="foro" className="space-y-4 pt-6 border-t border-zinc-200/80">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat']">
                5. Foro e Legislação Aplicável
              </h3>
              <p>
                Estes Termos de Uso são regidos e interpretados estritamente em conformidade com as leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de Barueri/SP para dirimir eventuais controvérsias oriundas do uso destas plataformas.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CALL TO ACTION FINAL COM IMAGEM REDONDA VAZANDO NO TOPO (some no mobile) */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-20 sm:pb-28 bg-zinc-900 text-white font-['Montserrat'] border-t border-zinc-800 overflow-visible">

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">

            <div className="relative max-w-2xl space-y-6">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Dúvidas Jurídicas
              </span>

              <h2 className="text-[2.3rem] font-extrabold text-white leading-[1.12]">
                Precisa esclarecer algo sobre estes Termos de Uso?
              </h2>

              <p className="text-zinc-400 text-sm md:text-base font-sans font-normal leading-relaxed">
                Nossa equipe está à disposição para esclarecer qualquer ponto relacionado às condições de uso das nossas plataformas digitais.
              </p>

              <div className="pt-2">
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 font-['Montserrat']"
                >
                  <span>Entre em Contato</span>
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

    </div>
  );
};

export default Termos;
