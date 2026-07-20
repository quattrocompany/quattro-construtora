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
  Wrench
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';
import { saveLead } from '../services/firestoreService';

export const Home: React.FC = () => {
  const [activeSector, setActiveSector] = useState(0);
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const setores = [
    {
      id: '01',
      title: 'Industrial & Logística',
      desc: 'Construção de galpões logísticos de alta tonelagem, centros de distribuição e plantas industriais.',
      icon: <Factory className="w-6 h-6 text-amber-500" />,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1600',
      slug: 'industrial'
    },
    {
      id: '02',
      title: 'Setor Hospitalar',
      desc: 'Engenharia de precisão para centros cirúrgicos, laboratórios e áreas de contaminação controlada.',
      icon: <Stethoscope className="w-6 h-6 text-amber-500" />,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600',
      slug: 'hospitalar'
    },
    {
      id: '03',
      title: 'Manutenção & Facilities',
      desc: 'Gestão contínua de infraestrutura predial e manutenção industrial preventiva e corretiva.',
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600',
      slug: 'manutencao'
    },
    {
      id: '04',
      title: 'Residencial de Luxo',
      desc: 'Incorporação imobiliária e edifícios inovadores projetados com arquitetura autoral.',
      icon: <Building2 className="w-6 h-6 text-amber-500" />,
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600',
      slug: 'residencial'
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const ok = await saveLead(formData);
    setFormLoading(false);
    if (ok) {
      setFormSuccess(true);
      setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
    }
  };

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* 1. HERO COMPONENTIZADO */}
      <Hero />

      {/* 2. VALUE PROP / MANIFESTO (SEÇÃO CLARA) */}
      <section className="bg-zinc-50 text-zinc-900 py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block mb-2">
              Sobre a Quattro
            </span>
            <p className="text-sm text-zinc-500 font-medium">
              Excelência e Rigor Técnico NBR
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-sans text-zinc-950 leading-tight">
              Para quem busca soluções de engenharia extraordinárias e segurança absoluta em cada fase da obra.
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full" />
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-light">
              Conduzimos todas as etapas da sua construção ou reforma com transparência total, garantindo o rigoroso cumprimento de prazos e orçamentos através do Padrão Quattro de Qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE / PORTFÓLIO DESTAQUES */}
      <section className="py-20 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between">
          <div>
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block mb-1">Portfólio em Destaque</span>
            <h3 className="text-2xl md:text-4xl font-bold text-white">Projetos Recentes</h3>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-amber-500 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-amber-500 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Galpão Logístico Amazon', tag: 'Industrial', img: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1000' },
            { title: 'Lumini Clube Residencial 2', tag: 'Residencial', img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1000' },
            { title: 'Complexo Hospitalar São Lucas', tag: 'Hospitalar', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000' },
          ].map((item, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5] hover:border-amber-500/50 transition-all duration-500">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full w-fit mb-2">
                  {item.tag}
                </span>
                <h4 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SETORES DE ATUAÇÃO INTERATIVOS */}
      <section className="relative py-28 bg-zinc-900 overflow-hidden border-b border-zinc-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 transition-all duration-700 blur-sm"
          style={{ backgroundImage: `url('${setores[activeSector].image}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center z-10">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
              Soluções Completas
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Setores de Atuação
            </h2>
            <p className="text-zinc-400 text-sm font-light max-w-md">
              Passe o cursor ou selecione um setor para explorar nossa capacidade técnica especializada.
            </p>

            <div className="space-y-2 pt-6">
              {setores.map((setor, index) => (
                <button
                  key={setor.id}
                  onClick={() => setActiveSector(index)}
                  onMouseEnter={() => setActiveSector(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                    activeSector === index
                      ? 'bg-zinc-950 border-amber-500 text-amber-500 shadow-xl'
                      : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-widest opacity-60">{setor.id}</span>
                    <span className="text-lg font-bold">{setor.title}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${activeSector === index ? 'translate-x-1 text-amber-500' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-zinc-950 border border-zinc-800 p-8 md:p-10 rounded-2xl shadow-2xl space-y-6">
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 w-fit">
                {setores[activeSector].icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{setores[activeSector].title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                {setores[activeSector].desc}
              </p>
              <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800">
                <img 
                  src={setores[activeSector].image} 
                  alt={setores[activeSector].title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <Link 
                to={`/setores/${setores[activeSector].slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:underline pt-2"
              >
                <span>Conhecer Detalhes do Setor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MÉTRICAS E NÚMEROS (SEÇÃO CLARA) */}
      <section className="bg-zinc-50 text-zinc-900 py-24 px-6 md:px-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600">
              Performance Comprovada
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-950">
              Uma trajetória pautada por compromisso, pontualidade e inovação tecnológica.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '+15', label: 'Anos de experiência no mercado de engenharia e construção civil.' },
              { num: '+1.000', label: 'Projetos e obras executadas com sucesso em todo o Brasil.' },
              { num: '100%', label: 'Compromisso com o cumprimento de prazos de entrega acordados.' },
              { num: 'Pioneiros', label: 'No uso do método construtivo Steel Frame em território nacional.' }
            ].map((metric, idx) => (
              <div key={idx} className="border-t border-zinc-300 pt-6 space-y-2">
                <span className="text-4xl md:text-5xl font-extrabold text-amber-600 block font-sans">
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

      {/* 6. DIFERENCIAIS (GLASSMORPHISM) */}
      <section className="py-28 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
              Diferenciais Exclusivos
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Colaboramos para transformar seu projeto em uma realidade sólida.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="w-8 h-8 text-amber-500" />, title: 'Flexibilidade Técnica', desc: 'Ajustes rápidos de escopo sem estender o prazo final de entrega acordado.' },
              { icon: <Globe className="w-8 h-8 text-amber-500" />, title: 'Atuação Nacional', desc: 'Capacidade de mobilização logística e engenharia de campo em todo o país.' },
              { icon: <Clock className="w-8 h-8 text-amber-500" />, title: 'Pontualidade Britânica', desc: 'Rigoroso controle de cronograma físico-financeiro em todas as fases.' },
              { icon: <Award className="w-8 h-8 text-amber-500" />, title: 'Equipe Qualificada', desc: 'Profissionais em contínuo treinamento de segurança e conformidade NBR.' },
              { icon: <Layers className="w-8 h-8 text-amber-500" />, title: 'Soluções On-Stop', desc: 'Desde a fundação principal até a manutenção predial contínua e facilities.' },
              { icon: <CheckCircle2 className="w-8 h-8 text-amber-500" />, title: 'Regularização Completa', desc: 'Expertise em licenças, AVCB, CLCB e aprovações regulatórias do imóvel.' }
            ].map((card, idx) => (
              <div key={idx} className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 space-y-4">
                <div>{card.icon}</div>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FORMULÁRIO DE ATENDIMENTO */}
      <section id="contato" className="py-28 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-2xl space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">Atendimento Direto</span>
              <h2 className="text-3xl font-bold text-white">Fale com a Construtora</h2>
              <p className="text-xs text-zinc-400 max-w-lg mx-auto">
                Entre em contato com nossos engenheiros e consultores para tirar dúvidas técnicas ou solicitar cotação.
              </p>
            </div>

            {formSuccess ? (
              <div className="bg-amber-500/10 border border-amber-500/30 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-xl font-bold text-amber-500">Solicitação Enviada!</h3>
                <p className="text-xs text-zinc-300">Nossa equipe entrará em contato em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">E-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">Telefone</label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 90000-0000"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descreva a demanda do seu projeto..."
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/10 disabled:opacity-50"
                >
                  {formLoading ? 'Enviando...' : (
                    <>
                      <span>Enviar Mensagem</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. FOOTER COMPONENTIZADO */}
      <Footer />

    </div>
  );
};