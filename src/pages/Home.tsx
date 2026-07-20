// src/pages/Home.tsx
import React, { useState } from 'react';
import { MapPin, Send, CheckCircle2, Shield, Award, Clock, Globe } from 'lucide-react';
import { Hero } from '../components/Hero';
import { saveLead } from '../services/firestoreService';

export const Home: React.FC = () => {
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
      
      {/* 1. HERO COMPONENTIZADO COM SETAS E NAVEGAÇÃO */}
      <Hero />

      {/* 2. PROVA SOCIAL & NÚMEROS */}
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

      {/* 3. SOBRE A CONSTRUTORA */}
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

      {/* 4. SETORES DE ATUAÇÃO */}
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

      {/* 5. FORMULÁRIO DE CONTATO */}
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