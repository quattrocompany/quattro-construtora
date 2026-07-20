import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Factory, 
  Stethoscope, 
  Wrench, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Send, 
  CheckCircle2,
  Globe,
  Award,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { saveLead } from '../services/firestoreService';

export const Home: React.FC = () => {
  // Estado do Slider Hero (Carrossel com os dois cases reais do site)
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: "RESIDENCIAL",
      titulo: "Lumini Clube Residencial 2",
      subtitulo: "Muito Além do Projeto: Conheça a Estrutura do Lumini 2",
      link: "/setores/residencial",
      imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000"
    },
    {
      badge: "SETORES",
      titulo: "Infraestrutura para Gigantes Globais",
      subtitulo: "Conheça os detalhes da construção do novo galpão logístico da Amazon. Uma megaobra executada com a engenharia de precisão, agilidade e excelência que o mercado global exige.",
      link: "/setores/industrial",
      imagem: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=2000"
    }
  ];

  // Auto-play do slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
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
    <div className="w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* ================= HERO CARROSSEL ================= */}
      <section className="relative w-full h-[650px] md:h-[750px] overflow-hidden bg-zinc-900">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background com Overlay Chumbo Escuro */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.imagem}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
            </div>

            {/* Conteúdo do Slide */}
            <div className="relative max-w-7xl mx-auto h-full px-6 flex flex-col justify-end pb-24 md:pb-32">
              <div className="max-w-3xl space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-md bg-amber-500 text-zinc-950 text-xs font-extrabold uppercase tracking-widest shadow-md">
                  {slide.badge}
                </span>

                <h1 className="text-4xl md:text-6xl font-black text-white font-serif tracking-tight leading-tight">
                  {slide.titulo}
                </h1>

                <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
                  {slide.subtitulo}
                </p>

                <div className="pt-4">
                  <Link
                    to={slide.link}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-zinc-800/90 border border-zinc-700 hover:border-amber-500 hover:bg-amber-500 hover:text-zinc-950 text-white font-bold rounded-md transition-all duration-300 text-sm tracking-wider uppercase backdrop-blur-md shadow-xl"
                  >
                    Saiba Mais
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controles de Navegação do Carrossel */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/60 border border-zinc-700/50 text-zinc-300 hover:text-amber-500 hover:border-amber-500 transition-all backdrop-blur-sm"
          aria-label="Slide Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/60 border border-zinc-700/50 text-zinc-300 hover:text-amber-500 hover:border-amber-500 transition-all backdrop-blur-sm"
          aria-label="Próximo Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicadores Visuais */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-zinc-600 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= SETORES DE ATUAÇÃO ================= */}
      <section className="py-20 border-b border-zinc-800/80 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-extrabold text-amber-500 uppercase tracking-widest">Atuação Multidisciplinar</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white font-serif">Nossos Setores</h3>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                titulo: 'Hospitalar',
                desc: 'Infraestrutura de alta complexidade técnica, laboratórios e centros cirúrgicos com rigoroso controle.',
                icon: <Stethoscope className="w-8 h-8 text-amber-500" />,
                link: '/setores/hospitalar'
              },
              {
                titulo: 'Industrial',
                desc: 'Construção e reforma de galpões logísticos, plantas industriais e centros de distribuição.',
                icon: <Factory className="w-8 h-8 text-amber-500" />,
                link: '/setores/industrial'
              },
              {
                titulo: 'Manutenção',
                desc: 'Manutenção industrial e predial preventiva e corretiva, gerenciamento de obras e facilities.',
                icon: <Wrench className="w-8 h-8 text-amber-500" />,
                link: '/setores/manutencao'
              },
              {
                titulo: 'Residencial',
                desc: 'Incorporação de empreendimentos habitacionais, loteamentos e edifícios de alto padrão.',
                icon: <Building2 className="w-8 h-8 text-amber-500" />,
                link: '/setores/residencial'
              },
            ].map((setor, i) => (
              <Link
                key={i}
                to={setor.link}
                className="group bg-zinc-900 border border-zinc-800/80 p-8 rounded-xl transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-zinc-950 rounded-lg w-fit border border-zinc-800 group-hover:border-amber-500/40 transition-colors">
                    {setor.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
                    {setor.titulo}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {setor.desc}
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mt-6 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Conhecer setor &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COBERTURA & LOCAIS DE ATUAÇÃO ================= */}
      <section className="py-20 bg-zinc-900/60 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Esquerda: Conteúdo / Texto do Site */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-amber-500 uppercase tracking-widest block">
                  Cobertura
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                  Locais de Atuação
                </h2>
                <h3 className="text-xl text-zinc-300 font-medium pt-2">
                  Vamos transformar o seu projeto em uma realidade sólida?
                </h3>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                A <strong className="text-white">Quattro Construtora</strong> atua em todo o Brasil, levando engenharia de alta performance desde os grandes centros até os municípios mais distantes.
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Conduzimos todas as fases da sua obra ou reforma com máxima transparência, segurança e pontualidade. Nossa equipe é continuamente treinada em total conformidade com as normas técnicas e o rigoroso <span className="text-amber-500 font-semibold">Padrão Quattro de Qualidade</span>.
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed">
                É por isso que nossas obras se destacam nacionalmente, consolidando parcerias duradouras com empresas e arquitetos renomados que exigem excelência técnica, fidelidade ao projeto e preço competitivo.
              </p>

              {/* Pilares Rápido */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs text-zinc-300 font-semibold">Atuação Nacional</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs text-zinc-300 font-semibold">Pontualidade Rigorosa</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs text-zinc-300 font-semibold">Normas Técnicas NBR</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs text-zinc-300 font-semibold">Preço Competitivo</span>
                </div>
              </div>
            </div>

            {/* Direita: Representação do Mapa com Marcadores Ouro */}
            <div className="relative bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex items-center justify-center min-h-[380px]">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  {/* Marcador Simbolizando o Brasil em Amarelo Ouro */}
                  <MapPin className="w-24 h-24 text-amber-500 animate-bounce mx-auto" />
                  <div className="w-16 h-4 bg-amber-500/20 rounded-full blur-md mx-auto" />
                </div>
                <h4 className="text-2xl font-bold text-white font-serif">Presença em Todo o Brasil</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Mais de 1.000 obras e intervenções concluídas com sucesso de Norte a Sul do país.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FORMULÁRIO DE CONTATO (TEXTOS REAIS DO SITE) ================= */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-extrabold text-amber-500 uppercase tracking-widest">Atendimento Exclusivo</span>
              <h2 className="text-3xl font-bold text-white font-serif">Fale com a Construtora</h2>
              <p className="text-sm text-zinc-400">
                Para conhecer melhor nosso portfólio de serviços e obras ou tirar suas dúvidas, entre em contato conosco!
              </p>
            </div>

            {formSuccess ? (
              <div className="bg-amber-500/10 border border-amber-500/30 p-8 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-xl font-bold text-amber-500">Mensagem Enviada!</h3>
                <p className="text-xs text-zinc-300">
                  Agradecemos o contato. Nossa equipe técnica retornará em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Seu E-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Seu Telefone / WhatsApp"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Como podemos ajudar?"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-lg uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? 'Enviando...' : (
                    <>
                      <span>Enviar</span>
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