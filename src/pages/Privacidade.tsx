// src/pages/Privacidade.tsx
import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2
} from 'lucide-react';
import { Hero } from '../components/Hero';

// ============================================================================
// DADOS ESTÁTICOS DA PÁGINA DE PRIVACIDADE
// ============================================================================

const HERO_PRIVACIDADE_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000',
  'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000'
];

const DIREITOS_LGPD = [
  {
    titulo: 'Confirmação e Acesso',
    desc: 'Direito de obter confirmação da existência de tratamento e acesso facilitado aos seus dados pessoais.'
  },
  {
    titulo: 'Correção e Atualização',
    desc: 'Direito de solicitar a correção de dados incompletos, inexatos ou desatualizados mantidos em nossos sistemas.'
  },
  {
    titulo: 'Anonimização ou Eliminação',
    desc: 'Direito de requerer a eliminação ou bloqueio de dados desnecessários, excessivos ou tratados em desacordo com a LGPD.'
  },
  {
    titulo: 'Revogação do Consentimento',
    desc: 'Direito de revogar a autorização concedida para o tratamento de dados a qualquer momento de forma gratuita.'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL POLITICA DE PRIVACIDADE
// ============================================================================

export const Privacidade: React.FC = () => {
  return (
    <div className="w-full bg-white text-zinc-900 font-['Inter',sans-serif] selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO COM MESMA ALTURA E FORMATO DA HOMEPAGE                             */}
      {/* ========================================================================= */}
      <Hero 
        eyebrow="Compliance & Governança"
        title="Política de Privacidade e Proteção de Dados."
        subtitle="A Quattro Construtora reafirma seu compromisso com a transparência, segurança e respeito à privacidade dos seus clientes, parceiros e colaboradores."
        images={HERO_PRIVACIDADE_IMAGES}
        ctaText="Falar Conosco"
        ctaLink="/contato"
      />

      {/* ========================================================================= */}
      {/* 2. CONTEÚDO INSTITUCIONAL DA POLÍTICA DE PRIVACIDADE                      */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* NAVEGAÇÃO LATERAL / SUMÁRIO */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 block font-['Montserrat',sans-serif]">
                    Lei nº 13.709/2018
                  </span>
                  <h3 className="text-base font-extrabold text-zinc-950">
                    Conformidade LGPD
                  </h3>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-200" />

              <nav className="space-y-2 text-xs font-semibold text-zinc-600 font-['Montserrat',sans-serif]">
                <a href="#coleta" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  1. Coleta de Dados Pessoais
                </a>
                <a href="#finalidade" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  2. Finalidade do Tratamento
                </a>
                <a href="#compartilhamento" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  3. Compartilhamento e Segurança
                </a>
                <a href="#direitos" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  4. Direitos dos Titulares
                </a>
                <a href="#cookies" className="block p-2 rounded-xl hover:bg-white hover:text-amber-600 transition-colors">
                  5. Cookies e Tecnologias
                </a>
              </nav>
            </div>

            <div className="p-6 bg-zinc-950 text-white rounded-3xl border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-500 font-['Montserrat',sans-serif]">
                <Lock className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Última Atualização</span>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Esta Política foi atualizada pela última vez em <strong>27 de Julho de 2026</strong>.
              </p>
            </div>
          </aside>

          {/* TEXTO NORMATIVO COMPLETO */}
          <div className="lg:col-span-8 space-y-12 text-zinc-700 text-sm md:text-base leading-relaxed font-normal">
            
            {/* INTRODUÇÃO */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
                Aviso de Privacidade
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950">
                Compromisso com a Segurança da Informação
              </h2>
              <p>
                A <strong>Quattro Company Construtora e Incorporadora Ltda.</strong> ("Quattro Construtora") valoriza a privacidade dos usuários e titulares que navegam em seus canais digitais, contratam seus serviços de engenharia ou estabelecem relações comerciais e institucionais.
              </p>
              <p>
                Esta Política descreve como coletamos, armazenamos, utilizamos e protegemos seus dados pessoais de acordo com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD).
              </p>
            </div>

            {/* SEÇÃO 1: COLETA DE DADOS */}
            <div id="coleta" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                1. Coleta de Dados Pessoais
              </h3>
              <p>
                Coletamos informações pessoais estritamente necessárias para prestação de serviços executivos, envio de propostas comerciais e atendimento institucional. Os dados podem incluir:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-zinc-600">
                <li><strong>Dados de identificação civil:</strong> Nome completo, CPF, RG ou documento de identificação;</li>
                <li><strong>Dados de contato profissional:</strong> E-mail corporativo, número de telefone/WhatsApp e endereço comercial;</li>
                <li><strong>Dados corporativos:</strong> Razão social da empresa, cargo ocupado e segmento de atuação;</li>
                <li><strong>Dados de navegação técnica:</strong> Endereço IP, dados de geolocalização e logs de acesso no site.</li>
              </ul>
            </div>

            {/* SEÇÃO 2: FINALIDADE */}
            <div id="finalidade" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                2. Finalidade do Tratamento
              </h3>
              <p>
                O tratamento de dados pessoais pela Quattro Construtora fundamenta-se nas seguintes hipóteses legais previstas na LGPD:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                  <h4 className="font-bold text-zinc-950 text-xs uppercase font-['Montserrat',sans-serif]">Execução de Contrato</h4>
                  <p className="text-xs text-zinc-600">Elaboração de orçamentos, projetos e cumprimento de obrigações firmadas em obras.</p>
                </div>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                  <h4 className="font-bold text-zinc-950 text-xs uppercase font-['Montserrat',sans-serif]">Legítimo Interesse</h4>
                  <p className="text-xs text-zinc-600">Atendimento a vizinhos de obras, homologação de fornecedores e relacionamento B2B.</p>
                </div>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                  <h4 className="font-bold text-zinc-950 text-xs uppercase font-['Montserrat',sans-serif]">Cumprimento Legal</h4>
                  <p className="text-xs text-zinc-600">Atendimento a normas regulamentadoras (NBR, ANVISA, MTE e prefeituras).</p>
                </div>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                  <h4 className="font-bold text-zinc-950 text-xs uppercase font-['Montserrat',sans-serif]">Consentimento</h4>
                  <p className="text-xs text-zinc-600">Envio de comunicados técnicos, relatórios de obras e newsletters institucionais.</p>
                </div>
              </div>
            </div>

            {/* SEÇÃO 3: COMPARTILHAMENTO E SEGURANÇA */}
            <div id="compartilhamento" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                3. Compartilhamento e Segurança
              </h3>
              <p>
                A Quattro Construtora não comercializa dados pessoais. O compartilhamento de dados ocorre unicamente para a viabilização técnica das obras e projetos, com:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-zinc-600">
                <li>Órgãos públicos, cartórios e prefeituras para aprovações de Habite-se, AVCB e licenças ambientais;</li>
                <li>Projetistas terceirizados e auditores independentes homologados sob acordos estritos de confidencialidade (NDA);</li>
                <li>Provedores de tecnologia em nuvem e softwares de gestão em tempo real auditados internacionalmente.</li>
              </ul>
            </div>

            {/* SEÇÃO 4: DIREITOS DOS TITULARES */}
            <div id="direitos" className="space-y-6 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                4. Direitos dos Titulares (Art. 18 LGPD)
              </h3>
              <p>
                Nos termos do Artigo 18 da LGPD, você possui direitos integrais sobre os seus dados pessoais armazenados em nossas plataformas:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DIREITOS_LGPD.map((item, idx) => (
                  <div key={idx} className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-amber-600">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <h4 className="font-bold text-zinc-950 text-xs font-['Montserrat',sans-serif] uppercase">{item.titulo}</h4>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SEÇÃO 5: COOKIES */}
            <div id="cookies" className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
                5. Cookies e Tecnologias de Navegação
              </h3>
              <p>
                Utilizamos cookies essenciais para garantir o funcionamento adequado das ferramentas do site, bem como cookies analíticos para mensuração de tráfego e melhoria da experiência do usuário. Você pode desativar o armazenamento de cookies nas configurações do seu navegador a qualquer momento.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Privacidade;