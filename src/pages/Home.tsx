import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { saveLead } from '../services/firestoreService';

export const Home: React.FC = () => {
  // Slider Fullscreen
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: "Engenharia Global",
      titulo: "Novo Galpão Logístico da Amazon",
      imagem: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=2500"
    },
    {
      badge: "Alto Padrão Residencial",
      titulo: "Lumini Clube Residencial 2",
      imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Form
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
    <div className="w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* 1. HERO FULLSCREEN (Estilo Ratio) */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            {/* Background Image com Máscara Escura */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.imagem}')` }}
            />
            <div className="absolute inset-0 bg-zinc-950/60" /> {/* Overlay escuro */}

            {/* Conteúdo Centralizado */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 mt-16">
              <span className="text-amber-500 font-bold text-xs md:text-sm uppercase tracking-[0.3em] mb-6">
                {slide.badge}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white max-w-5xl leading-tight opacity-90">
                {slide.titulo}
              </h1>
              
              <Link 
                to="/projetos" 
                className="mt-12 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white hover:text-amber-500 transition-colors group"
              >
                <span>Descobrir Projeto</span>
                <span className="w-12 h-[1px] bg-white group-hover:bg-amber-500 transition-all group-hover:w-16" />
              </Link>
            </div>
          </div>
        ))}
        
        {/* Indicadores Minimalistas Laterais */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-1 transition-all duration-500 ${
                idx === currentSlide ? 'h-12 bg-amber-500' : 'h-4 bg-zinc-600 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      </section>


      {/* 2. SESSÃO SOBRE (Tipografia Fina e Assimétrica) */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-x border-zinc-900/50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
              Engenharia de precisão, agilidade e excelência que o mercado exige.
            </h2>
            <div className="w-16 h-1 bg-amber-500 mb-8" />
            <Link to="/quem-somos" className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors flex items-center gap-3">
              Conheça Nossa História <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-6 text-zinc-400 font-light leading-relaxed">
            <p>
              A Quattro Construtora atua em todo o Brasil, levando engenharia de alta performance desde os grandes centros até os municípios mais distantes.
            </p>
            <p>
              Conduzimos todas as fases da sua obra ou reforma com máxima transparência, segurança e pontualidade. Nossa equipe é continuamente treinada em total conformidade com as normas técnicas e o rigoroso Padrão Quattro de Qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SETORES - LISTA EDITORIAL (Sem cards pesados, estilo revista) */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800 pb-8">
            <h2 className="text-3xl md:text-5xl font-serif text-white">Nossa Expertise</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mt-4 md:mt-0">Setores de Atuação</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { num: '01', title: 'Hospitalar', desc: 'Infraestrutura de alta complexidade e centros cirúrgicos.' },
              { num: '02', title: 'Industrial', desc: 'Galpões logísticos e plantas industriais em Steel Frame.' },
              { num: '03', title: 'Manutenção', desc: 'Facilities e gestão predial preventiva para corporações.' },
              { num: '04', title: 'Residencial', desc: 'Incorporação imobiliária e loteamentos de alto padrão.' },
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="flex items-start gap-6">
                  <span className="text-2xl font-serif text-zinc-700 font-black group-hover:text-amber-500 transition-colors">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-3 group-hover:translate-x-2 transition-transform">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FORMULÁRIO DE CONTATO (Design Limpo com Bordas Finas) */}
      <section className="py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Fale Conosco</h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-12">
              Para conhecer melhor nosso portfólio de serviços e obras ou tirar suas dúvidas, entre em contato.
            </p>
            <div className="flex items-center gap-4 text-zinc-300">
               <MapPin className="text-amber-500 w-6 h-6" />
               <span className="text-sm font-light">Atuação em todo o Brasil.</span>
            </div>
          </div>

          <div className="bg-zinc-900/50 p-8 md:p-12 border border-zinc-800">
            {formSuccess ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-xl font-serif text-white">Solicitação Recebida</h3>
                <p className="text-sm text-zinc-400 font-light">Retornaremos em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <input
                  type="text"
                  required
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <input
                  type="tel"
                  required
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Mensagem"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full bg-transparent border-b border-zinc-800 px-0 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={formLoading}
                  className="mt-6 flex items-center justify-center gap-3 w-full py-4 bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                >
                  {formLoading ? 'Enviando...' : (
                    <><span>Enviar Mensagem</span> <Send className="w-4 h-4" /></>
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