// src/pages/BlogIndex.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Search, 
  User, 
  BookOpen, 
  Send,
  Filter
} from 'lucide-react';
import { Hero } from '../../components/Hero';

// ============================================================================
// DADOS ESTÁTICOS DO BLOG E CATEGORIAS
// ============================================================================

const HERO_BLOG_IMAGES = [
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2000',
  'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000'
];

const CATEGORIAS_BLOG = [
  { id: 'todos', label: 'Todos os Artigos' },
  { id: 'inovacao', label: 'Inovação & BIM' },
  { id: 'normas', label: 'Legislação & NBR' },
  { id: 'gestao', label: 'Gestão de Obras' },
  { id: 'sustentabilidade', label: 'Sustentabilidade' },
  { id: 'facilities', label: 'Facilities & Retrofit' }
];

const ARTIGO_DESTAQUE = {
  id: 'steel-frame-obras-industriais',
  slug: 'steel-frame-obras-industriais',
  title: 'Steel Frame em Larga Escala: Como Reduzir Prazos de Obras Industriais em até 40%',
  excerpt: 'Análise técnica detalhada sobre a aplicação do sistema Light Steel Frame em galpões logísticos e plantas fabris. Entenda o ganho de produtividade, redução de resíduos e conformidade NBR.',
  categoriaSlug: 'inovacao',
  categoriaLabel: 'Inovação & BIM',
  data: '18 Julho, 2026',
  tempoLeitura: '6 min de leitura',
  autor: 'Eng. Ricardo Mendes',
  imagem: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600'
};

const ARTIGOS_BLOG = [
  {
    id: 'nbr-15575-desempenho-edificatorio',
    slug: 'nbr-15575-desempenho-edificatorio',
    title: 'Guia Prático da NBR 15575: Garantindo Desempenho Acústico e Térmico',
    excerpt: 'Os principais requisitos exigidos pela norma de desempenho e como a engenharia executiva deve se planejar desde a fase de projetos.',
    categoriaSlug: 'normas',
    categoriaLabel: 'Legislação & NBR',
    data: '12 Julho, 2026',
    tempoLeitura: '5 min de leitura',
    autor: 'Equipe Técnica Quattro',
    imagem: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1000'
  },
  {
    id: 'projetos-bim-setor-hospitalar',
    slug: 'projetos-bim-setor-hospitalar',
    title: 'Compatibilização em BIM para Obras Hospitalares de Alta Complexidade',
    excerpt: 'Como a detecção automatizada de conflitos (Clash Detection) previne interferências nas redes de gases medicinais e sistemas MEP.',
    categoriaSlug: 'inovacao',
    categoriaLabel: 'Inovação & BIM',
    data: '05 Julho, 2026',
    tempoLeitura: '8 min de leitura',
    autor: 'Eng. Lucas Santos',
    imagem: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000'
  },
  {
    id: 'gestao-facilities-valorizacao-patrimonial',
    slug: 'gestao-facilities-valorizacao-patrimonial',
    title: 'Manutenção Preditiva e PMOC: Maximizando o Valor do Ativo Imobiliário',
    excerpt: 'Estratégias para preservar instalações corporativas e industriais, garantindo a continuidade operacional e reduzindo custos emergenciais.',
    categoriaSlug: 'facilities',
    categoriaLabel: 'Facilities & Retrofit',
    data: '28 Junho, 2026',
    tempoLeitura: '4 min de leitura',
    autor: 'Consultoria Quattro',
    imagem: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1000'
  },
  {
    id: 'retrofit-corporativo-sem-paralisar-operacoes',
    slug: 'retrofit-corporativo-sem-paralisar-operacoes',
    title: 'Retrofit Corporativo: Modernizando Edifícios Sem Paralisar as Operações',
    excerpt: 'Metodologia executiva em turnos especiais e isolamento acústico/poeira para reformas de grande porte em edifícios ocupados.',
    categoriaSlug: 'facilities',
    categoriaLabel: 'Facilities & Retrofit',
    data: '15 Junho, 2026',
    tempoLeitura: '7 min de leitura',
    autor: 'Eng. Ricardo Mendes',
    imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000'
  },
  {
    id: 'regularizacao-avcb-clcb-empresas',
    slug: 'regularizacao-avcb-clcb-empresas',
    title: 'AVCB e Licenciamento Ambiental: O Caminho para Regularização Predial',
    excerpt: 'Passo a passo legal e técnico para adequação de galpões e prédios comerciais às exigências do Corpo de Bombeiros e órgãos públicos.',
    categoriaSlug: 'normas',
    categoriaLabel: 'Legislação & NBR',
    data: '02 Junho, 2026',
    tempoLeitura: '6 min de leitura',
    autor: 'Jurídico & Engenharia',
    imagem: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000'
  },
  {
    id: 'cronograma-fisico-financeiro-obras',
    slug: 'cronograma-fisico-financeiro-obras',
    title: 'Controle de Custos e Prazos: A Metodologia de Linha de Balanço',
    excerpt: 'Entenda como monitoramos cada etapa da obra em tempo real para assegurar 100% de previsibilidade financeira e entrega pontual.',
    categoriaSlug: 'gestao',
    categoriaLabel: 'Gestão de Obras',
    data: '20 Maio, 2026',
    tempoLeitura: '5 min de leitura',
    autor: 'Equipe de Planejamento',
    imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL BLOGINDEX
// ============================================================================

export const BlogIndex: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [termoBusca, setTermoBusca] = useState('');

  const artigosFiltrados = ARTIGOS_BLOG.filter((artigo) => {
    const atendeCategoria = categoriaAtiva === 'todos' || artigo.categoriaSlug === categoriaAtiva;
    const atendeBusca = artigo.title.toLowerCase().includes(termoBusca.toLowerCase()) ||
                         artigo.excerpt.toLowerCase().includes(termoBusca.toLowerCase());
    return atendeCategoria && atendeBusca;
  });

  return (
    <div className="w-full bg-white text-zinc-900 font-['Inter',sans-serif] selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO COM MESMA ALTURA E FORMATO DA HOMEPAGE                             */}
      {/* ========================================================================= */}
      <Hero 
        eyebrow="Engenharia & Conteúdo"
        title="Artigos técnicos, inovações e inteligência construtiva."
        subtitle="Acompanhe as análises exclusivas dos nossos engenheiros sobre tendências do setor, normas técnicas, tecnologia BIM e gestão de grandes obras."
        images={HERO_BLOG_IMAGES}
        ctaText="Explorar Artigos"
        ctaLink="#destaque"
      />

      {/* ========================================================================= */}
      {/* 2. ARTIGO EM DESTAQUE PRINCIPAL                                           */}
      {/* ========================================================================= */}
      <section id="destaque" className="py-16 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-12 items-center group">
            
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-zinc-950">
              <img 
                src={ARTIGO_DESTAQUE.imagem} 
                alt={ARTIGO_DESTAQUE.title}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-zinc-950 px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] shadow-md border border-amber-400">
                  Destaque Principal
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 space-y-6 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-['Inter',sans-serif]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    {ARTIGO_DESTAQUE.data}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {ARTIGO_DESTAQUE.tempoLeitura}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-amber-400 transition-colors leading-tight">
                  {ARTIGO_DESTAQUE.title}
                </h2>

                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                  {ARTIGO_DESTAQUE.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <User className="w-4 h-4 text-amber-500" />
                  <span>{ARTIGO_DESTAQUE.autor}</span>
                </div>

                <Link
                  to={`/blog/${ARTIGO_DESTAQUE.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 font-['Montserrat',sans-serif]"
                >
                  <span>Ler Artigo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BARRA DE BUSCA E FILTROS DE CATEGORIA                                 */}
      {/* ========================================================================= */}
      <section className="py-12 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Campo de Busca */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Buscar por palavra-chave ou tema..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-['Inter',sans-serif]"
              />
            </div>

            {/* Categorias / Tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
              <Filter className="w-4 h-4 text-zinc-400 shrink-0 mr-1 hidden sm:block" />
              {CATEGORIAS_BLOG.map((cat) => {
                const isActive = categoriaAtiva === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCategoriaAtiva(cat.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer font-['Montserrat',sans-serif] ${
                      isActive
                        ? 'bg-amber-500 text-zinc-950 shadow-md scale-105'
                        : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GRID DE ARTIGOS DO BLOG                                               */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          {artigosFiltrados.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <BookOpen className="w-12 h-12 text-zinc-300 mx-auto" />
              <h3 className="text-xl font-bold text-zinc-800">Nenhum artigo encontrado</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Tente ajustar sua busca ou selecione outra categoria para encontrar novos conteúdos.
              </p>
              <button
                onClick={() => { setCategoriaAtiva('todos'); setTermoBusca(''); }}
                className="px-6 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider font-['Montserrat',sans-serif]"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artigosFiltrados.map((artigo) => (
                <article 
                  key={artigo.id}
                  className="bg-zinc-50 border border-zinc-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
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

                    <div className="p-6 md:p-8 space-y-4">
                      <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          {artigo.data}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          {artigo.tempoLeitura}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-zinc-950 group-hover:text-amber-600 transition-colors leading-snug">
                        {artigo.title}
                      </h3>

                      <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                        {artigo.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-0 flex items-center justify-between border-t border-zinc-200/60 mt-4">
                    <span className="text-xs text-zinc-500 font-medium">{artigo.autor}</span>

                    <Link
                      to={`/blog/${artigo.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 transition-colors font-['Montserrat',sans-serif]"
                    >
                      <span>Ler mais</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CTA NEWSLETTER / CONTATO TÉCNICO                                      */}
      {/* ========================================================================= */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto space-y-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 block font-['Montserrat',sans-serif]">
              Conteúdo Exclusivo de Engenharia
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Receba análises técnicas e atualizações sobre o setor da construção civil.
            </h2>

            <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed">
              Assine nossa newsletter para engenheiros, arquitetos e gestores patrimoniais. Sem spam, apenas conteúdo técnico relevante.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Seu e-mail profissional"
                className="w-full px-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors font-['Inter',sans-serif]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 shrink-0 font-['Montserrat',sans-serif] cursor-pointer"
              >
                <span>Inscrever</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};