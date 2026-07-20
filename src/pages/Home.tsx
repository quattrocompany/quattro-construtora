import React, { useState, useEffect } from 'react';
import { MapPin, Send, CheckCircle2, Shield, Award, Clock, Globe } from 'lucide-react';
import { saveLead } from '../services/firestoreService';

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: "INFRAESTRUTURA PARA GIGANTES GLOBAIS",
      titulo: "Galpão Logístico da Amazon",
      subtitulo: "Megaobra executada com engenharia de precisão, agilidade e excelência que o mercado global exige.",
      imagem: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=2500"
    },
    {
      badge: "RESIDENCIAL DE ALTO PADRÃO",
      titulo: "Lumini Clube Residencial 2",
      subtitulo: "Muito Além do Projeto: Conheça a estrutura e engenharia por trás do Lumini 2.",
      imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Form State
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

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
    <div className="w-full bg-zinc-950 text-zinc-100 font-sans">
      
      {/* ================= 1. HERO FULLSCREEN EDITORIAL ================= */}
      <section className="relative w-full h-screen min-h-[720px] flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            {/* Background com Máscara Chumbo */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.imagem}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/50" />

            {/* Conteúdo Central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 mt-12">
              <span className="text-amber-500 font-bold text-xs tracking-[0.35em] uppercase mb-4 px-4 py-1.5 border border-amber-500/30 bg-amber-500/10 rounded-full backdrop-blur-sm">
                {slide.badge}
              </span>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white max-w-5xl leading-tight font-normal">
                {slide.titulo}
              </h1>
              
              <p className="mt-6 text-zinc-300 text-base md:text-lg font-light max-w-2xl leading-relaxed">
                {slide.subtitulo}
              </p>

              <a 
                href="#contato" 
                className="mt-10 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-white hover:text-amber-500 transition-colors group"
              >
                <span>Solicitar Apresentação</span>
                <span className="w-12 h-[1px] bg-amber-500 transition-all group-hover:w-20" />
              </a>
            </div>
          </div>
        ))}

        {/* Indicadores do Slider */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentSlide ? 'w-10 bg-amber-500' : 'w-3 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= 2. PROVA SOCIAL & NÚMEROS ================= */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-extrabold text-amber-500 font-serif">+15</span>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Anos de Mercado</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-extrabold text-amber-500 font-serif">+1.000</span>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Obras Concluídas</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-extrabold text-amber-500 font-serif">100%</span>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Entregas no Prazo</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-extrabold text-amber-500 font-serif">Brasil</span>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Cobertura Nacional</p>
          </div>
        </div>
      </section>

      {/* ================= 3. SOBRE A CONSTRUTORA ================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em]">
              Engenharia de Alta Performance
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Transformamos projetos exigentes em realidade sólida.
            </h2>
            <div className="w-16 h-1 bg-amber-500" />
            
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              A <strong className="text-white">Quattro Construtora</strong> atua em todo o Brasil, levando soluções de engenharia desde os grandes centros até os municípios mais distantes. Conduzimos todas as fases da sua obra ou reforma com máxima transparência, segurança e pontualidade.
            </p>
            
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Nossa equipe é continuamente treinada em conformidade com as normas técnicas rigorosas e o <span className="text-amber-500 font-semibold">Padrão Quattro de Qualidade</span>, consolidando parcerias duradouras com empresas e arquitetos renomados.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-semibold text-zinc-300">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" /> <span>Atuação Nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> <span>Pontualidade Britânica</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-500" /> <span>Rigor Técnico NBR</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> <span>Pioneiros em Steel Frame</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=1600" 
              alt="Engenharia Quattro" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= 4. SETORES DE ATUAÇÃO ================= */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-zinc-800 pb-8">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] block mb-2">Expertise Multidisciplinar</span>
              <h2 className="text-3xl md:text-5xl font-serif text-white">Nossos Setores</h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-md mt-4 md:mt-0 font-light">
              Soluções completas para ambientes corporativos, industriais, hospitalares e residenciais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {[
              { num: '01', title: 'Hospitalar', desc: 'Infraestrutura de alta complexidade técnica, laboratórios e centros cirúrgicos com rigoroso controle de higiene e climatização.' },
              { num: '02', title: 'Industrial', desc: 'Construção e reforma de galpões logísticos, plantas industriais e centros de distribuição de grande porte.' },
              { num: '03', title: 'Manutenção', desc: 'Manutenção industrial e predial preventiva/corretiva, gerenciamento de obras e atendimento contínuo de facilities.' },
              { num: '04', title: 'Residencial', desc: 'Incorporação de empreendimentos habitacionais, loteamentos e edifícios inovadores de alto padrão.' },
            ].map((item, idx) => (
              <div key={idx} className="group border-b border-zinc-800/60 pb-8">
                <div className="flex items-start gap-6">
                  <span className="text-2xl font-serif text-amber-500/80 font-bold group-hover:text-amber-500 transition-colors">
                    {item.num}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-white group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. FORMULÁRIO DE CONTATO ================= */}
      <section id="contato" className="py-28 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] block">
              Atendimento Corporativo
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">Fale com a Construtora</h2>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Para conhecer melhor nosso portfólio de serviços e obras ou tirar suas dúvidas técnicas, entre em contato conosco!
            </p>

            <div className="pt-6 space-y-4 text-xs text-zinc-300 border-t border-zinc-900">
              <div className="flex items-center gap-3">
                <MapPin className="text-amber-500 w-5 h-5 shrink-0" />
                <span>Barueri – SP | Atendimento em todo o Brasil</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800/80 p-8 md:p-10 rounded-xl shadow-2xl">
            {formSuccess ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-xl font-serif text-white">Solicitação Enviada!</h3>
                <p className="text-xs text-zinc-400 font-light">
                  Sua mensagem foi entregue à nossa equipe técnica. Retornaremos em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">Seu Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Roberto Silva"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">E-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
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
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Como podemos ajudar em seu projeto?"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-lg uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-50"
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

    </div>
  );
};