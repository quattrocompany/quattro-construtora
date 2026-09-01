// src/pages/Home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Factory, 
  Stethoscope, 
  AlertCircle, 
  Star, 
  Layers,
  Phone
} from 'lucide-react';
import { saveLead } from '../services/firestoreService';

const SETORES = [
  {
    id: '01',
    title: 'Setor Industrial',
    desc: 'Infraestrutura robusta para gigantes do mercado. Executamos galpões logísticos, parques fabris e instalações complexas com engenharia de precisão.',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600'
  },
  {
    id: '02',
    title: 'Setor Corporativo',
    desc: 'Sedes empresariais e escritórios inteligentes e sustentáveis, desenhados sob medida para impulsionar a produtividade.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600'
  },
  {
    id: '03',
    title: 'Setor Farmacêutico',
    desc: 'Projetos de altíssima complexidade com rigoroso cumprimento de normas técnicas e sanitárias para laboratórios e salas limpas.',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600'
  },
  {
    id: '04',
    title: 'Setor Residencial',
    desc: 'Empreendimentos e clubes residenciais de altíssimo nível concebidos para proporcionar conforto e segurança.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600'
  }
];

const METRICAS = [
  { num: '+15', label: 'Anos transformando grandes desafios em realidades sólidas.' },
  { num: '100%', label: 'Pontualidade absoluta na entrega e orçamento respeitado.' },
  { num: 'Nível A', label: 'Acreditação máxima no PBQP-H para excelência técnica.' },
  { num: 'ISO 9001', label: 'Certificação de qualidade do planejamento ao acabamento.' }
];

export const Home: React.FC = () => {
  const [activeSector, setActiveSector] = useState(0);

  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
        setFormError('Não foi possível enviar sua solicitação.');
      }
    } catch {
      setFormError('Falha na comunicação com o servidor.');
    } finally {
      setFormLoading(false);
    }
  };

  const SelectedSectorIcon = SETORES[activeSector].icon;

  return (
    <div className="w-full text-zinc-900 bg-[#f8f9f6] font-['Inter',sans-serif]">

      {/* 1. HERO BIZTOP */}
      <section className="w-full bg-zinc-950 text-white pt-28 pb-16 border-b border-zinc-800 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5">
              <div className="flex text-amber-500 space-x-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
              </div>
              <span className="text-xs font-bold text-zinc-300 font-['Montserrat',sans-serif]">
                4.9 • +15 Anos de Engenharia
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-['Montserrat',sans-serif] uppercase tracking-tight leading-[1.05]">
              ENGENHARIA <br />
              <span className="text-amber-500">DE ALTA PERFORMANCE</span> <br />
              E PRECISÃO
            </h1>

            <p className="text-zinc-400 text-sm md:text-base max-w-xl font-normal leading-relaxed">
              Executamos projetos industriais, corporativos, farmacêuticos e residenciais com rigor técnico NBR, previsibilidade orçamentária e acabamento impecável.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#contato"
                className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl font-['Montserrat',sans-serif] group"
              >
                <span>Solicitar Orçamento</span>
                <div className="w-6 h-6 bg-zinc-950/10 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>

              <a
                href="tel:11900000000"
                className="inline-flex items-center gap-3 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider font-['Montserrat',sans-serif]"
              >
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                  <Phone className="w-4 h-4 text-amber-500" />
                </div>
                <span>Fale Conosco</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[420px] lg:h-[500px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200"
              alt="Quattro Construtora"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
          </div>

        </div>
      </section>

      {/* 2. TRÍADE DE CARDS COM RECORTE LÍMPIDO (SEM SOMBRAS OU BORDAS) */}
      <section className="py-14 max-w-[1440px] mx-auto px-6 md:px-12 bg-[#f8f9f6]">
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-8">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block font-['Montserrat',sans-serif]">
              ✶ NOSSA ABORDAGEM
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif] leading-tight">
              Recursos essenciais para o sucesso da sua obra
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-zinc-600 text-sm font-normal leading-relaxed max-w-lg">
              Explore abordagens integradas de engenharia para otimizar processos, aumentar a produtividade no canteiro e garantir a entrega técnica com o Padrão Quattro.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1: Fundo Branco */}
          <div className="relative bg-white rounded-[2rem] rounded-bl-none p-6 md:p-7 min-h-[250px] flex flex-col justify-start border-none shadow-none">
            <div className="space-y-3 mb-12">
              <div className="w-11 h-11 rounded-2xl bg-zinc-100 flex items-center justify-center border border-zinc-200">
                <Building2 className="w-5 h-5 text-zinc-800" />
              </div>
              <h3 className="text-lg font-bold font-['Montserrat',sans-serif] text-zinc-950 leading-snug">
                Engenharia Corporativa & Industrial
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Planejamento executivo e soluções turnkey para edifícios corporativos e galpões de grande porte.
              </p>
            </div>

            {/* Recorte Notch sem linhas */}
            <div className="absolute bottom-0 left-0 z-10 flex items-end">
              <div className="relative bg-[#f8f9f6] p-1.5 rounded-tr-2xl">
                <svg className="absolute -top-[15px] left-0 w-4 h-4 text-[#f8f9f6]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
                </svg>
                <svg className="absolute bottom-0 -right-[15px] w-4 h-4 text-[#f8f9f6]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
                </svg>

                <Link 
                  to="/setores" 
                  className="inline-flex items-center gap-2 text-xs font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-5 py-2.5 rounded-full transition-colors font-['Montserrat',sans-serif]"
                >
                  <span>Saiba Mais</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 2: Destaque Amber */}
          <div className="relative bg-amber-500 text-zinc-950 rounded-[2rem] rounded-bl-none p-6 md:p-7 min-h-[250px] flex flex-col justify-start border-none shadow-none">
            <div className="space-y-3 mb-12">
              <div className="w-11 h-11 rounded-2xl bg-zinc-950/10 flex items-center justify-center border border-zinc-950/20">
                <ShieldCheck className="w-5 h-5 text-zinc-950" />
              </div>
              <h3 className="text-lg font-bold font-['Montserrat',sans-serif] text-zinc-950 leading-snug">
                Gestão Turnkey & ISO 9001
              </h3>
              <p className="text-xs text-zinc-900 font-medium leading-relaxed">
                Controle milimétrico do projeto ao acabamento com garantia absoluta de pontualidade NBR.
              </p>
            </div>

            {/* Recorte Notch sem linhas */}
            <div className="absolute bottom-0 left-0 z-10 flex items-end">
              <div className="relative bg-[#f8f9f6] p-1.5 rounded-tr-2xl">
                <svg className="absolute -top-[15px] left-0 w-4 h-4 text-[#f8f9f6]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
                </svg>
                <svg className="absolute bottom-0 -right-[15px] w-4 h-4 text-[#f8f9f6]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
                </svg>

                <Link 
                  to="/quem-somos" 
                  className="inline-flex items-center gap-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-zinc-950 px-5 py-2.5 rounded-full transition-colors font-['Montserrat',sans-serif]"
                >
                  <span>Ver Padrão</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 3: Fundo Escuro Zinc */}
          <div className="relative bg-zinc-950 text-white rounded-[2rem] rounded-bl-none p-6 md:p-7 min-h-[250px] flex flex-col justify-start border-none shadow-none">
            <div className="space-y-3 mb-12">
              <div className="w-11 h-11 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <Layers className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold font-['Montserrat',sans-serif] text-white leading-snug">
                Projetos Especiais & Retrofit
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Edificação e modernização de espaços de alto padrão atendendo a normas sanitárias e industriais.
              </p>
            </div>

            {/* Recorte Notch sem linhas */}
            <div className="absolute bottom-0 left-0 z-10 flex items-end">
              <div className="relative bg-[#f8f9f6] p-1.5 rounded-tr-2xl">
                <svg className="absolute -top-[15px] left-0 w-4 h-4 text-[#f8f9f6]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
                </svg>
                <svg className="absolute bottom-0 -right-[15px] w-4 h-4 text-[#f8f9f6]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
                </svg>

                <Link 
                  to="/servicos" 
                  className="inline-flex items-center gap-2 text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-amber-500 border border-zinc-800 px-5 py-2.5 rounded-full transition-colors font-['Montserrat',sans-serif]"
                >
                  <span>Ver Soluções</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MOSAICO WHO WE ARE */}
      <section className="py-20 bg-white border-y border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 rounded-3xl overflow-hidden border border-zinc-200 h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000"
                alt="Quattro Construtora"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="col-span-5 bg-amber-500 rounded-3xl p-6 flex flex-col justify-center items-start text-zinc-950 shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-zinc-950 mb-2" />
              <span className="text-3xl font-black font-['Montserrat',sans-serif]">100%</span>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mt-1 font-['Montserrat',sans-serif]">
                Pontualidade em Obras
              </p>
            </div>

            <div className="col-span-7 rounded-3xl overflow-hidden border border-zinc-200 h-[150px]">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"
                alt="Engenharia de Perto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block font-['Montserrat',sans-serif]">
              ✶ Quem Somos
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif] leading-tight">
              Solução completa para a excelência da sua construção
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              A Quattro Construtora conduz todas as etapas da sua obra com máxima transparência, segurança técnica e rigor orçamentário em todo o Brasil.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                to="/quem-somos"
                className="inline-flex items-center gap-2 bg-zinc-950 text-white px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 font-['Montserrat',sans-serif]"
              >
                <span>Sobre a Quattro</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden border-2 border-amber-500">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" alt="Diretoria Quattro" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950 font-['Montserrat',sans-serif]">Eng. Responsável</h4>
                  <p className="text-[10px] text-zinc-500">Diretoria de Engenharia</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
              <div className="bg-[#f8f9f6] p-5 rounded-2xl border border-zinc-200">
                <div className="flex text-amber-500 space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                </div>
                <span className="text-2xl font-black text-zinc-950 font-['Montserrat',sans-serif]">4.9 / 5.0</span>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mt-1 font-['Montserrat',sans-serif]">Média de Clientes</p>
              </div>

              <div className="bg-[#f8f9f6] p-5 rounded-2xl border border-zinc-200">
                <span className="text-xs font-bold text-zinc-950 block mb-2 font-['Montserrat',sans-serif]">Certificações</span>
                <div className="flex flex-wrap gap-1.5">
                  {['PBQP-H A', 'ISO 9001', 'NBR', 'TURNKEY'].map((tag) => (
                    <span key={tag} className="text-[9px] font-bold bg-white border border-zinc-300 text-zinc-800 px-2.5 py-1 rounded-md font-['Montserrat',sans-serif]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SETORES DE ATUAÇÃO INTERATIVOS */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block font-['Montserrat',sans-serif]">
              ✶ Setores
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950 font-['Montserrat',sans-serif]">
              Especialistas Onde a Precisão é Fundamental
            </h2>

            <div className="space-y-3 pt-2">
              {SETORES.map((setor, index) => {
                const isSelected = activeSector === index;
                return (
                  <button
                    key={setor.id}
                    onClick={() => setActiveSector(index)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between border cursor-pointer font-['Montserrat',sans-serif] ${
                      isSelected
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 font-bold shadow-md'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs opacity-60 font-['Inter',sans-serif]">{setor.id}</span>
                      <span className="text-sm font-bold">{setor.title}</span>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-zinc-950' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white border border-zinc-200 p-8 rounded-3xl shadow-lg space-y-6">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                <SelectedSectorIcon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold font-['Montserrat',sans-serif] text-zinc-950">{SETORES[activeSector].title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{SETORES[activeSector].desc}</p>
              <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-200">
                <img src={SETORES[activeSector].image} alt={SETORES[activeSector].title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. MÉTRICAS */}
      <section className="bg-white py-16 border-y border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICAS.map((metric, idx) => (
            <div key={idx} className="border-t border-zinc-200 pt-6 space-y-2">
              <span className="text-4xl md:text-5xl font-black text-amber-600 block font-['Montserrat',sans-serif]">
                {metric.num}
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FORMULÁRIO DE CONTATO */}
      <section id="contato" className="py-20 bg-zinc-950 text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-3xl space-y-6 shadow-2xl">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500 block font-['Montserrat',sans-serif]">✶ Atendimento Direto</span>
              <h2 className="text-3xl font-extrabold text-white font-['Montserrat',sans-serif]">Fale com Nossos Engenheiros</h2>
            </div>

            {formError && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-400 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess ? (
              <div className="bg-amber-500/10 border border-amber-500/30 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-amber-500 mx-auto" />
                <h3 className="text-lg font-bold text-amber-500 font-['Montserrat',sans-serif]">Solicitação Enviada!</h3>
                <p className="text-xs text-zinc-300">Nossa equipe de engenharia retornará em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2 font-['Montserrat',sans-serif]">Nome Completo</label>
                  <input
                    id="nome"
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2 font-['Montserrat',sans-serif]">E-mail</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="seu@empresa.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2 font-['Montserrat',sans-serif]">Telefone</label>
                    <input
                      id="telefone"
                      type="tel"
                      required
                      placeholder="(11) 90000-0000"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2 font-['Montserrat',sans-serif]">Mensagem</label>
                  <textarea
                    id="mensagem"
                    rows={4}
                    required
                    placeholder="Detalhes da sua obra"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-widest font-['Montserrat',sans-serif] flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {formLoading ? 'Processando...' : 'Enviar Solicitação'}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

    </div>
  );
};