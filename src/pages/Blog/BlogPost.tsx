// src/pages/BlogPost.tsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Tag
} from 'lucide-react';

// ============================================================================
// DADOS ESTÁTICOS DO ARTIGO E RELACIONADOS
// ============================================================================

const ARTIGO_ATUAL = {
  id: 'a-fluidez-dos-espacos-na-construcao-contemporanea',
  slug: 'a-fluidez-dos-espacos-na-construcao-contemporanea',
  title: 'A Fluidez dos Espaços na Construção Contemporânea: Integração, Luz Natural e Engenharia de Vãos livres',
  excerpt: 'Como os métodos construtivos modernos e o planejamento estrutural em aço e concreto protendido estão viabilizando arquiteturas corporativas e residenciais sem barreiras visuais.',
  categoriaLabel: 'Arquitetura & Engenharia',
  data: '24 Julho, 2026',
  tempoLeitura: '7 min de leitura',
  autor: {
    nome: 'Eng. Ricardo Mendes',
    cargo: 'Diretor de Engenharia & Inovação',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
    bio: 'Especialista em estruturas de grande porte, métodos construtivos ágeis e compatibilização BIM, com mais de 18 anos de experiência em projetos industriais e residenciais de alto padrão.'
  },
  imagemCapa: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600',
  tags: ['Arquitetura Contemporânea', 'Steel Frame', 'Vãos Livres', 'BIM', 'Sustentabilidade']
};

const ARTIGOS_RELACIONADOS = [
  {
    id: 'steel-frame-obras-industriais',
    slug: 'steel-frame-obras-industriais',
    title: 'Steel Frame em Larga Escala: Como Reduzir Prazos em até 40%',
    categoriaLabel: 'Inovação & BIM',
    data: '18 Julho, 2026',
    imagem: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800'
  },
  {
    id: 'nbr-15575-desempenho-edificatorio',
    slug: 'nbr-15575-desempenho-edificatorio',
    title: 'Guia Prático da NBR 15575: Desempenho Acústico e Térmico',
    categoriaLabel: 'Legislação & NBR',
    data: '12 Julho, 2026',
    imagem: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800'
  },
  {
    id: 'projetos-bim-setor-hospitalar',
    slug: 'projetos-bim-setor-hospitalar',
    title: 'Compatibilização em BIM para Obras Hospitalares de Alta Complexidade',
    categoriaLabel: 'Inovação & BIM',
    data: '05 Julho, 2026',
    imagem: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL BLOGPOST
// ============================================================================

export const BlogPost: React.FC = () => {
  useParams<{ slug: string }>();
  const [copiado, setCopiado] = useState(false);

  // Manipulador para compartilhar link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="w-full bg-white text-zinc-900 font-['Inter',sans-serif] selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden pt-20 md:pt-24">
      
      {/* ========================================================================= */}
      {/* 1. NAVEGAÇÃO BREADCRUMB & HERO DO POST (GRID MESTRE 1440px)               */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-6 relative z-10">
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 font-['Montserrat',sans-serif]">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <Link to="/blog" className="hover:text-amber-600 transition-colors">Blog</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-amber-600 font-bold truncate max-w-[200px] sm:max-w-xs">
                {ARTIGO_ATUAL.title}
              </span>
            </nav>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-amber-600 transition-colors font-['Montserrat',sans-serif]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Blog</span>
            </Link>
          </div>

          <div className="max-w-4xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-950 bg-amber-500 px-3.5 py-1.5 rounded-full inline-block font-['Montserrat',sans-serif] shadow-sm border border-amber-400">
              {ARTIGO_ATUAL.categoriaLabel}
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 tracking-tight leading-tight">
              {ARTIGO_ATUAL.title}
            </h1>

            <p className="text-zinc-600 text-base md:text-xl font-normal leading-relaxed">
              {ARTIGO_ATUAL.excerpt}
            </p>

            {/* Meta Informações do Autor e Data */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-200/80">
              <div className="flex items-center gap-4">
                <img 
                  src={ARTIGO_ATUAL.autor.avatar} 
                  alt={ARTIGO_ATUAL.autor.nome} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-zinc-950">{ARTIGO_ATUAL.autor.nome}</h4>
                  <p className="text-xs text-zinc-500">{ARTIGO_ATUAL.autor.cargo}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  {ARTIGO_ATUAL.data}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  {ARTIGO_ATUAL.tempoLeitura}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. IMAGEM DE CAPA DE IMPACTO                                               */}
      {/* ========================================================================= */}
      <section className="py-10 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl aspect-[21/9] bg-zinc-100">
            <img 
              src={ARTIGO_ATUAL.imagemCapa} 
              alt={ARTIGO_ATUAL.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-zinc-950/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg border border-zinc-800 font-['Montserrat',sans-serif]">
              Projeto Residência Villa Toscana / Quattro Construtora
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CONTEÚDO PRINCIPAL DO ARTIGO & SIDEBAR (GRID MESTRE 1440px)           */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* COLUNA ESQUERDA: TEXTO DO ARTIGO (lg:col-span-8) */}
          <article className="lg:col-span-8 space-y-8 text-zinc-700 leading-relaxed font-normal text-base md:text-lg">
            
            <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-amber-600 first-letter:mr-3 first-letter:float-left first-letter:font-['Montserrat',sans-serif]">
              A busca pela integração entre os espaços internos e externos deixou de ser apenas uma tendência estética para se tornar uma premissa fundamental da engenharia e da arquitetura contemporânea. Projetar e construir ambientes fluídos exige um domínio rigoroso de cálculo estrutural, tecnologia de materiais e física das edificações.
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight pt-4 border-t border-zinc-100">
              1. A Engenharia por Trás dos Vãos Libres e Balanços
            </h2>

            <p>
              Para criar espaços amplos, sem pilares intermediários ou barreiras visuais que interrompam o campo de visão, a engenharia executiva recorre a soluções estruturais avançadas. O uso de <strong>concreto protendido</strong>, <strong>vigas metálicas de alta resistência</strong> e o método construtivo em <strong>Light Steel Frame</strong> permitem vencer vãos superiores a 15 metros com elegância e eficiência.
            </p>

            {/* Caixa Destaque de Citação / Destaque Técnico */}
            <blockquote className="my-8 p-8 bg-zinc-50 border-l-4 border-amber-500 rounded-r-2xl space-y-3 shadow-xs">
              <p className="text-zinc-950 font-bold italic text-lg md:text-xl font-['Montserrat',sans-serif] leading-snug">
                "A fluidez arquitetônica não é a ausência de estrutura, mas sim o triunfo da engenharia de precisão ao tornar o suporte invisível e a luz o elemento central."
              </p>
              <footer className="text-xs font-bold uppercase tracking-wider text-amber-600 font-['Montserrat',sans-serif]">
                — Caderno de Diretrizes Técnicas Quattro
              </footer>
            </blockquote>

            <p>
              Ao eliminar os elementos de vedação rígidos tradicionais, a estrutura passa a trabalhar de forma otimizada. Isso exige análises refinadas de deformação (flecha) e vibração, garantindo a estanqueidade e a durabilidade patrimonial exigidas pela norma de desempenho <strong>NBR 15575</strong>.
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight pt-4 border-t border-zinc-100">
              2. Iluminação Natural e Eficiência Energética
            </h2>

            <p>
              Grandes panos de vidro são a marca registrada da arquitetura integrada. No entanto, a especificação incorreta de esquadrias ou vidros pode transformar um ambiente em um ambiente com elevado ganho térmico e consumo excessivo de ar-condicionado.
            </p>

            <div className="space-y-3 py-2">
              <h3 className="text-lg font-bold text-zinc-950">Fatores cruciais na especificação de pele de vidro:</h3>
              <ul className="space-y-2.5 text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Vidros de Controle Solar (Low-E):</strong> Reduzem a entrada de radiação infravermelha sem comprometer a transmissão de luz visível.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Estanqueidade e Acústica:</strong> Perfis de alumínio anodizado com gaxetas de EPDM que vedam ruídos externos e águas pluviais.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Sombreamento Passivo:</strong> Integração de brises solares, pergolados e brises vegetais calculados conforme a orientação solar da obra.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight pt-4 border-t border-zinc-100">
              3. O Papel do BIM na Compatibilização de Projetos
            </h2>

            <p>
              Espaços abertos e integrados deixam pouca margem para imprevistos no canteiro de obras. Tubulações hidráulicas, dutos de ar-condicionado e calhas elétricas precisam ser embutidos de forma limpa em shafts técnicos reduzidos ou lajes nervuradas.
            </p>

            <p>
              Com a modelagem em <strong>BIM (Building Information Modeling)</strong>, a Quattro realiza o teste de conflitos (Clash Detection) antes do início da construção. Isso garante que cada milímetro de duto e estrutura seja compatibilizado previamente, eliminando retrabalhos e estouramento de orçamento.
            </p>

            {/* Imagem do Corpo do Texto */}
            <div className="my-8 space-y-2">
              <div className="rounded-2xl overflow-hidden border border-zinc-200 aspect-[16/9]">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200" 
                  alt="Execução de estrutura com grandes vãos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-zinc-500 text-center font-medium">
                Canteiro de obras gerenciado com padrão técnico e rígido controle de prumo e nivelamento.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight pt-4 border-t border-zinc-100">
              Conclusão: Segurança Técnica para Inovar
            </h2>

            <p>
              Construir com fluidez espacial não significa abrir mão do rigor técnico ou da segurança estrutural. Pelo contrário: exige uma construtora com capacidade analítica, engenheiros residentes capacitados e fornecedores homologados de alta precisão.
            </p>

            {/* Tags do Artigo e Compartilhamento */}
            <div className="pt-8 border-t border-zinc-200 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-2 flex items-center gap-1 font-['Montserrat',sans-serif]">
                  <Tag className="w-3.5 h-3.5" /> Tags:
                </span>
                {ARTIGO_ATUAL.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-xs font-semibold bg-zinc-100 hover:bg-amber-500/10 hover:text-amber-700 text-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Barra de Compartilhamento */}
              <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 font-['Montserrat',sans-serif]">
                  Gostou do artigo? Compartilhe:
                </span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer font-['Montserrat',sans-serif]"
                  >
                    <Share2 className="w-4 h-4 text-amber-600" />
                    <span>{copiado ? 'Link Copiado!' : 'Copiar Link'}</span>
                  </button>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white hover:bg-amber-500 hover:text-zinc-950 border border-zinc-200 text-zinc-700 rounded-xl transition-colors"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 1.63 1.63A1.63 1.63 0 0 0 7.86 6.7z"/></svg>
                  </a>
                  <a 
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white hover:bg-amber-500 hover:text-zinc-950 border border-zinc-200 text-zinc-700 rounded-xl transition-colors"
                    aria-label="Compartilhar no Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </article>

          {/* COLUNA DIREITA: SIDEBAR INSTITUCIONAL (lg:col-span-4) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28">
            
            {/* Card do Autor */}
            <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-3xl space-y-4 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 font-['Montserrat',sans-serif] block">
                Sobre o Autor
              </span>
              <div className="flex items-center gap-4">
                <img 
                  src={ARTIGO_ATUAL.autor.avatar} 
                  alt={ARTIGO_ATUAL.autor.nome} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500 shadow-xs"
                />
                <div>
                  <h3 className="text-base font-extrabold text-zinc-950">{ARTIGO_ATUAL.autor.nome}</h3>
                  <p className="text-xs text-zinc-500 font-medium">{ARTIGO_ATUAL.autor.cargo}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal pt-2 border-t border-zinc-200/80">
                {ARTIGO_ATUAL.autor.bio}
              </p>
            </div>

            {/* CTA do Projeto / Fale com Engenharia */}
            <div className="bg-zinc-950 text-white border border-zinc-800 p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-['Montserrat',sans-serif] block">
                  Engenharia de Alta Performance
                </span>
                <h3 className="text-2xl font-extrabold text-white leading-snug">
                  Planejando uma obra com vãos livres ou alta complexidade?
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Converse diretamente com a equipe técnica da Quattro Construtora e solicite uma avaliação de viabilidade para o seu projeto.
                </p>
              </div>

              <Link
                to="/contato"
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 font-['Montserrat',sans-serif] cursor-pointer"
              >
                <span>Falar com um Engenheiro</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card de Newsletter Rápida */}
            <div className="bg-white border border-zinc-200 p-6 rounded-2xl space-y-4 shadow-xs">
              <h4 className="text-sm font-bold text-zinc-950 font-['Montserrat',sans-serif] uppercase tracking-wider">
                Newsletter Técnica
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Receba artigos de engenharia, novas normas ABNT e estudos de caso quinzenais no seu e-mail.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input 
                  type="email"
                  required
                  placeholder="Seu e-mail profissional"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors font-['Montserrat',sans-serif]"
                >
                  Inscrever-se
                </button>
              </form>
            </div>

          </aside>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SEÇÃO DE ARTIGOS RELACIONADOS                                          */}
      {/* ========================================================================= */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block font-['Montserrat',sans-serif]">
                Continue Lendo
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-950">
                Artigos Relacionados
              </h2>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors font-['Montserrat',sans-serif]"
            >
              <span>Ver Todo o Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTIGOS_RELACIONADOS.map((artigo) => (
              <article 
                key={artigo.id}
                className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img 
                      src={artigo.imagem} 
                      alt={artigo.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-950/80 text-amber-500 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 font-['Montserrat',sans-serif]">
                        {artigo.categoriaLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>{artigo.data}</span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-950 group-hover:text-amber-600 transition-colors leading-snug">
                      {artigo.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${artigo.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 transition-colors font-['Montserrat',sans-serif]"
                  >
                    <span>Ler Artigo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};