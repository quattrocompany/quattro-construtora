// src/pages/Duvidas.tsx
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight, ChevronRight, Search } from 'lucide-react';

// ============================================================================
// DADOS ESTÁTICOS DA PÁGINA DE DÚVIDAS FREQUENTES
// ============================================================================

const CATEGORIAS = [
  { id: 'todos', label: 'Todos os Temas' },
  { id: 'geral', label: 'Atendimento Geral' },
  { id: 'obra', label: 'Dúvidas sobre a Obra' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'fornecedores', label: 'Fornecedores & Parcerias' }
];

const FAQS = [
  {
    categoria: 'geral',
    pergunta: 'Como entro em contato com a equipe técnica?',
    resposta: 'Preencha o formulário na página de Contato ou fale diretamente pelo telefone (11) 3045-0826. Nossa equipe direciona sua mensagem ao setor responsável.'
  },
  {
    categoria: 'obra',
    pergunta: 'Sou vizinho de uma obra em andamento. Como relatar um imprevisto?',
    resposta: 'Selecione a opção "Sou Vizinho de Obra" no formulário de contato. Essa mensagem é direcionada com prioridade ao engenheiro residente responsável pela obra.'
  },
  {
    categoria: 'obra',
    pergunta: 'Posso acompanhar o andamento da minha obra?',
    resposta: 'Sim. Clientes com contrato ativo acompanham o cronograma físico-financeiro e os relatórios de evolução diretamente pelo Portal do Cliente.'
  },
  {
    categoria: 'fornecedores',
    pergunta: 'Como cadastrar minha empresa para ser fornecedor de insumos?',
    resposta: 'Utilize a opção "Sou Fornecedor / Parceria Comercial" no formulário de contato. Nosso departamento de suprimentos analisará suas homologações técnicas.'
  },
  {
    categoria: 'financeiro',
    pergunta: 'Qual o prazo médio de retorno para solicitações de cotação?',
    resposta: 'Propostas preliminares são enviadas em até 48 horas úteis após o recebimento dos memoriais descritivos ou projetos.'
  },
  {
    categoria: 'financeiro',
    pergunta: 'Como funcionam as medições e a emissão de notas fiscais?',
    resposta: 'As medições seguem o cronograma físico-financeiro definido em contrato e são processadas após validação da fiscalização de obra, com a documentação fiscal correspondente.'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL DÚVIDAS FREQUENTES
// ============================================================================

export const Duvidas: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  const faqsFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return FAQS.filter((faq) => {
      const bateCategoria = categoriaAtiva === 'todos' || faq.categoria === categoriaAtiva;
      const bateBusca =
        termo === '' ||
        faq.pergunta.toLowerCase().includes(termo) ||
        faq.resposta.toLowerCase().includes(termo);
      return bateCategoria && bateBusca;
    });
  }, [busca, categoriaAtiva]);

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        {/* MÍDIA DE FUNDO FULL WIDTH */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/faq_619.jpg"
            alt="Quattro Construtora - Dúvidas Frequentes"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* LAYER BLUR EM TODA A ALTURA DO HERO */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />

        {/* CONTEÚDO */}
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 font-['Montserrat']">
              <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-amber-500 font-bold">Dúvidas Frequentes</span>
            </nav>

            <h1 className="text-[2.3rem] font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              TIRE SUAS <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                DÚVIDAS FREQUENTES
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Reunimos as respostas para as perguntas mais comuns sobre atendimento, obras, fornecedores e prazos. Não encontrou o que procurava? Fale diretamente com a nossa equipe.
            </p>

            <div className="pt-2">
              <Link
                to="/contato"
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2 font-['Montserrat']"
              >
                <span>Falar Conosco</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUSCA, ABAS E LISTA DE PERGUNTAS */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Esclarecimentos Rápidos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Perguntas por Tema
            </h2>
          </div>

          {/* BARRA DE PESQUISA */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquise por uma palavra-chave..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-zinc-200/80 bg-[#f8f9f6] text-sm text-zinc-900 placeholder:text-zinc-400 font-sans focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/60 transition-all"
            />
          </div>

          {/* ABAS DE TEMAS */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaAtiva(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all font-['Montserrat'] border ${
                  categoriaAtiva === cat.id
                    ? 'bg-amber-500 border-amber-500 text-zinc-950'
                    : 'bg-white border-zinc-200/80 text-zinc-600 hover:border-amber-500/50 hover:text-amber-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* LISTA DE PERGUNTAS */}
          <div className="space-y-5">
            {faqsFiltradas.length > 0 ? (
              faqsFiltradas.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8f9f6] border border-zinc-200/80 p-7 sm:p-8 rounded-3xl space-y-3 shadow-xs hover:border-amber-500/50 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-amber-600 font-['Montserrat']">
                    <HelpCircle className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {CATEGORIAS.find((c) => c.id === faq.categoria)?.label ?? 'Dúvida Frequente'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 font-['Montserrat'] leading-snug">
                    {faq.pergunta}
                  </h3>
                  <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                    {faq.resposta}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-2">
                <p className="text-sm text-zinc-500 font-sans">
                  Nenhuma dúvida encontrada para essa busca.
                </p>
                <p className="text-xs text-zinc-400 font-sans">
                  Tente outra palavra-chave ou fale diretamente com a nossa equipe.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. CTA FINAL COM IMAGEM REDONDA VAZANDO NO TOPO (some no mobile) */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-20 sm:pb-28 bg-zinc-900 text-white font-['Montserrat'] border-t border-zinc-800 overflow-visible">

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">

            <div className="relative max-w-2xl space-y-6">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Ainda com Dúvidas?
              </span>

              <h2 className="text-[2.3rem] font-extrabold text-white leading-[1.12]">
                Nossa equipe técnica está pronta para te atender diretamente.
              </h2>

              <p className="text-zinc-400 text-sm md:text-base font-sans font-normal leading-relaxed">
                Fale diretamente com a nossa equipe e resolva sua dúvida com rapidez, clareza e transparência.
              </p>

              <div className="pt-2">
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 font-['Montserrat']"
                >
                  <span>Entre em Contato Conosco</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Imagem Redonda: escondida no mobile, aparece a partir do md e vaza para a seção anterior */}
            <div className="hidden md:flex justify-center md:justify-end pointer-events-none">
              <div className="relative -mt-40 md:-mt-48 lg:-mt-32 xl:-mt-40">
                <div className="w-72 h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] xl:w-[440px] xl:h-[440px] rounded-full border-4 border-amber-500 overflow-hidden shadow-2xl bg-zinc-900">
                  <img
                    src="/img/Amazon_imgRodape.avif"
                    alt="Engenharia Quattro Construtora"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Duvidas;
