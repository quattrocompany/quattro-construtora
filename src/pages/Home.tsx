// src/pages/Home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Award, 
  Clock, 
  Globe,
  ChevronLeft,
  ChevronRight,
  Layers,
  Building2,
  Factory,
  Stethoscope,
  Wrench,
  AlertCircle
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { saveLead } from '../services/firestoreService';

// ============================================================================
// DADOS ESTÁTICOS (Isolados do ciclo de renderização do React para performance)
// ============================================================================

const SETORES = [
  {
    id: '01',
    title: 'Industrial & Logística',
    desc: 'Construção de galpões logísticos de alta tonelagem, centros de distribuição automatizados e plantas industriais completas.',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1600',
    slug: 'industrial'
  },
  {
    id: '02',
    title: 'Setor Hospitalar',
    desc: 'Engenharia de precisão para centros cirúrgicos, laboratórios de alta complexidade e áreas de contaminação controlada.',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600',
    slug: 'hospitalar'
  },
  {
    id: '03',
    title: 'Manutenção & Facilities',
    desc: 'Gestão contínua de infraestrutura predial, automação de ativos e manutenção industrial preventiva e corretiva.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600',
    slug: 'manutencao'
  },
  {
    id: '04',
    title: 'Residencial',
    desc: 'Incorporação imobiliária de alto padrão, residências de grande porte e edifícios projetados com arquitetura autoral.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600',
    slug: 'residencial'
  }
];

const PORTFOLIO_ITEMS = [
  { id: 1, title: 'Galpão Logístico Amazon', tag: 'Industrial', img: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1000' },
  { id: 2, title: 'Lumini Clube Residencial 2', tag: 'Residencial', img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1000' },
  { id: 3, title: 'Complexo Hospitalar São Lucas', tag: 'Hospitalar', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000' },
  { id: 4, title: 'Centro de Distribuição Mercado Livre', tag: 'Industrial', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000' },
];

const METRICAS = [
  { num: '+15', label: 'Anos de experiência comprovada no mercado de engenharia e construção civil.' },
  { num: '+1.000', label: 'Projetos e obras executadas com rigoroso padrão técnico em todo o Brasil.' },
  { num: '100%', label: 'Compromisso absoluto com o cumprimento de prazos e orçamentos firmados.' },
  { num: 'Pioneiros', label: 'No uso otimizado do método construtivo Steel Frame em escala nacional.' }
];

const DIFERENCIAIS = [
  { icon: ShieldCheck, title: 'Flexibilidade Técnica', desc: 'Ajustes ágeis de escopo executivo sem comprometer a data final de entrega do projeto.' },
  { icon: Globe, title: 'Atuação Nacional', desc: 'Capacidade de mobilização logística e equipes de engenharia de campo em todo o país.' },
  { icon: Clock, title: 'Pontualidade Britânica', desc: 'Rigoroso controle de cronograma físico-financeiro com relatórios periódicos em tempo real.' },
  { icon: Award, title: 'Equipe Qualificada', desc: 'Engenheiros e mestres de obra em contínuo treinamento de conformidade NBR e NR-35.' },
  { icon: Layers, title: 'Soluções One-Stop', desc: 'Atendimento integral: da fundação principal até o retrofit, manutenção e facilities.' },
  { icon: CheckCircle2, title: 'Regularização Completa', desc: 'Expertise no gerenciamento de licenças, habite-se, AVCB, CLCB e aprovações de órgãos públicos.' }
];

// ============================================================================
// COMPONENTE PRINCIPAL HOME
// ============================================================================

export const Home: React.FC = () => {
  const [activeSector, setActiveSector] = useState(0);
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  
  // Estado do Formulário
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Navegação do Carrossel do Portfólio
  const handleNextPortfolio = () => {
    setPortfolioIndex((prev) => (prev + 1) % (PORTFOLIO_ITEMS.length - 2));
  };

  const handlePrevPortfolio = () => {
    setPortfolioIndex((prev) => (prev === 0 ? PORTFOLIO_ITEMS.length - 3 : prev - 1));
  };

  // Submit do Formulário de Lead (Firebase Firestore)
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const ok = await saveLead(formData);
      if (ok) {
        setFormSuccess(true);
        setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
      } else {
        setFormError('Não foi possível enviar sua solicitação. Por favor, tente novamente.');
      }
    } catch (err) {
      setFormError('Falha na comunicação com o servidor. Verifique sua conexão.');
    } finally {
      setFormLoading(false);
    }
  };

  const SelectedSectorIcon = SETORES[activeSector].icon;

  return (
    <div className="w-full bg-white text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SLIDER */}
      <Hero />

      {/* 2. MANIFESTO / SOBRE A QUATTRO (CINZA 20% - bg-zinc-50) */}
      <section className="bg-zinc-50 py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block mb-2">
              Sobre a Quattro
            </span>
            <p className="text-sm text-zinc-500 font-medium">
              Excelência e Rigor Técnico NBR
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
              Para quem busca soluções de engenharia extraordinárias e segurança absoluta em cada fase da obra.
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full" />
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-normal">
              Conduzimos todas as etapas da sua construção ou reforma com transparência total, garantindo o rigoroso cumprimento de prazos e orçamentos através do Padrão Quattro de Qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE / PORTFÓLIO DESTAQUES (BRANCO PURO) */}
      <section className="py-24 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.3em] block mb-2">
                Portfólio em Destaque
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold text-zinc-950">Projetos Recentes</h3>
            </div>
            
            {/* Controles do Carrossel com Estilo Light */}
            <div className="flex gap-3">
              <button 
                onClick={handlePrevPortfolio}
                className="p-3 rounded-full border border-zinc-300 text-zinc-600 hover:text-amber-600 hover:border-amber-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
                aria-label="Projeto Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextPortfolio}
                className="p-3 rounded-full border border-zinc-300 text-zinc-600 hover:text-amber-600 hover:border-amber-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
                aria-label="Próximo Projeto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid Responsivo de Cards do Portfólio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500">
            {PORTFOLIO_ITEMS.slice(portfolioIndex, portfolioIndex + 3).map((item) => (
              <div 
                key={item.id} 
                className="group relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 aspect-[4/5] hover:border-amber-500/50 transition-all duration-500 shadow-md hover:shadow-xl"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                {/* Overlay escuro mantido apenas na imagem para legibilidade do texto contrastante */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent p-6 md:p-8 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-950 bg-amber-500 px-3 py-1 rounded-full w-fit mb-3 font-mono shadow-sm">
                    {item.tag}
                  </span>
                  <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SETORES DE ATUAÇÃO INTERATIVOS (CINZA 20% - bg-zinc-50) */}
      <section className="relative py-28 bg-zinc-50 overflow-hidden border-b border-zinc-200">
        
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center z-10">
          
          {/* Lado Esquerdo: Lista Tabulada */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block mb-2">
                Soluções Completas
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950">
                Setores de Atuação
              </h2>
              <p className="text-zinc-600 text-sm font-normal max-w-md mt-2">
                Selecione um setor para explorar nossa capacidade técnica e engenharia especializada.
              </p>
            </div>

            <div className="space-y-3 pt-4" role="tablist" aria-label="Setores de Atuação">
              {SETORES.map((setor, index) => {
                const isSelected = activeSector === index;
                return (
                  <button
                    key={setor.id}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`sector-panel-${setor.id}`}
                    onClick={() => setActiveSector(index)}
                    onMouseEnter={() => setActiveSector(index)}
                    className={`w-full text-left p-4 md:p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-white border-amber-500 text-amber-600 shadow-lg scale-[1.01]'
                        : 'bg-white/60 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold tracking-widest opacity-60 font-mono text-zinc-500">{setor.id}</span>
                      <span className="text-base md:text-lg font-bold">{setor.title}</span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'translate-x-1 text-amber-500' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lado Direito: Card de Detalhes do Setor (Light Glassmorphism) */}
          <div className="lg:col-span-6">
            <div 
              id={`sector-panel-${SETORES[activeSector].id}`}
              role="tabpanel"
              className="bg-white border border-zinc-200 p-8 md:p-10 rounded-3xl shadow-xl space-y-6 animate-in fade-in duration-300"
            >
              <div className="p-3.5 bg-zinc-100 rounded-2xl border border-zinc-200 w-fit">
                <SelectedSectorIcon className="w-6 h-6 text-amber-500" />
              </div>

              <h3 className="text-2xl font-bold text-zinc-950">{SETORES[activeSector].title}</h3>
              
              <p className="text-zinc-600 text-sm leading-relaxed font-normal">
                {SETORES[activeSector].desc}
              </p>

              <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-200 shadow-inner">
                <img 
                  src={SETORES[activeSector].image} 
                  alt={SETORES[activeSector].title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <Link 
                to={`/setores/${SETORES[activeSector].slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors pt-2 group"
              >
                <span>Conhecer Detalhes do Setor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. MÉTRICAS E NÚMEROS (BRANCO PURO) */}
      <section className="bg-white text-zinc-900 py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Performance Comprovada
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950 leading-tight">
              Uma trajetória pautada por compromisso, pontualidade e inovação tecnológica.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {METRICAS.map((metric, idx) => (
              <div key={idx} className="border-t border-zinc-200 pt-6 space-y-2">
                <span className="text-4xl md:text-5xl font-black text-amber-600 block font-sans">
                  {metric.num}
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DIFERENCIAIS EXCLUSIVOS (CINZA 20% - bg-zinc-50) */}
      <section className="py-28 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Diferenciais Exclusivos
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950">
              Colaboramos para transformar seu projeto em uma realidade sólida.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DIFERENCIAIS.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-zinc-200 p-8 rounded-3xl hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 space-y-4 shadow-sm group"
                >
                  <div className="p-3 bg-zinc-100 rounded-2xl border border-zinc-200 w-fit group-hover:border-amber-500/30 transition-colors">
                    <CardIcon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950">{card.title}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">{card.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. FORMULÁRIO DE ATENDIMENTO (ÂNCORA ESCURA - bg-zinc-950) */}
      <section id="contato" className="py-28 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-2xl space-y-8">
            
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 block">Atendimento Direto</span>
              <h2 className="text-3xl font-extrabold text-white">Fale com a Construtora</h2>
              <p className="text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
                Entre em contato com nossos engenheiros e consultores para tirar dúvidas técnicas ou solicitar uma cotação personalizada.
              </p>
            </div>

            {/* Alerta de Erro */}
            {formError && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-400 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Feedback de Sucesso */}
            {formSuccess ? (
              <div className="bg-amber-500/10 border border-amber-500/30 p-8 rounded-2xl text-center space-y-4 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-xl font-bold text-amber-500">Solicitação Enviada com Sucesso!</h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  Agradecemos seu contato. Nossa equipe de engenharia analisará sua demanda e retornará em breve.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSuccess(false)}
                  className="px-6 py-2.5 bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              /* Formulário em Dark Mode para contraste de fechamento */
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Nome Completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    required
                    placeholder="Seu Nome ou Razão Social"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      E-mail Profissional
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="seu@empresa.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="telefone"
                      type="tel"
                      required
                      placeholder="(11) 90000-0000"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Detalhes do Projeto
                  </label>
                  <textarea
                    id="mensagem"
                    rows={4}
                    required
                    placeholder="Descreva a localização, metragem ou necessidade da sua obra..."
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formLoading ? (
                    <span>Processando envio...</span>
                  ) : (
                    <>
                      <span>Enviar Solicitação</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* NOTA DE ARQUITETURA: O <Footer /> é mantido centralizado na raiz do App.tsx */}

    </div>
  );
};