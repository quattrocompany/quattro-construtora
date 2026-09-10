// src/pages/Servicos.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ClipboardCheck, 
  Wrench, 
  Compass, 
  FileText, 
  Settings, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const SERVICOS_LIST = [
  {
    id: 'turnkey',
    title: 'Engenharia Turnkey & EPC',
    icon: Layers,
    image: '/img/turnkey_2150290086.jpg',
    desc: 'Solução completa do conceito à entrega das chaves. Assumimos a responsabilidade integral pelo projeto, compras, construção e comissionamento.',
    entregaveis: [
      'Gestão unificada de fornecedores e contratos',
      'Preço fechado com previsibilidade orçamentária',
      'Prazo de entrega garantido em contrato',
      'Comissionamento e startup de instalações'
    ]
  },
  {
    id: 'gerenciamento',
    title: 'Gerenciamento & Fiscalização',
    icon: ClipboardCheck,
    image: '/img/fiscalizacao_2151589549.jpg',
    desc: 'Supervisão técnica rigorosa do canteiro de obras, garantindo o cumprimento de especificações, controle físico-financeiro e auditoria de qualidade.',
    entregaveis: [
      'Relatórios gerenciais semanais com medições',
      'Controle rigoroso de cronograma (Linha de Balanço)',
      'Auditoria de segurança do trabalho (NR-35 / NR-18)',
      'Inspeção de recebimento de materiais e insumos'
    ]
  },
  {
    id: 'retrofit',
    title: 'Retrofit & Reformas Corporativas',
    icon: Wrench,
    image: '/img/retrofit_2150290083.jpg',
    desc: 'Modernização de edifícios, plantas fabris e escritórios sem interrupção das atividades operacionais do cliente.',
    entregaveis: [
      'Atualização de instalações elétricas e hidráulicas',
      'Reforço estrutural e adequação de fachadas',
      'Trabalho em turnos especiais (noturno/finais de semana)',
      'Adequação às normas de acessibilidade e AVCB'
    ]
  },
  {
    id: 'bim',
    title: 'Compatibilização & Projetos BIM',
    icon: Compass,
    image: '/img/compatibilizacao_2151908069.jpg',
    desc: 'Modelagem tridimensional inteligente para antecipar interferências entre arquitetura, estrutura e instalações (MEP) antes da fase de obra.',
    entregaveis: [
      'Detecção automatizada de conflitos (Clash Detection)',
      'Levantamento quantitativo preciso de insumos',
      'Visualização fidedigna em modelo 3D/4D',
      'Facilidade de manutenção posterior (As-Built)'
    ]
  },
  {
    id: 'laudos',
    title: 'Laudos Técnicos & Vistorias',
    icon: FileText,
    image: '/img/laudos_135766.jpg',
    desc: 'Avaliação pericial de estruturas, patologias da construção civil e conformidade normativa para auditorias e regularização predial.',
    entregaveis: [
      'Inspeção predial com laudo assinado por Engenheiro (ART)',
      'Diagnóstico de patologias (infiltrações, trincas, recalque)',
      'Plano de ação corretivo com estimativa de custos',
      'Vistoria cautelar de vizinhança pré-obra'
    ]
  },
  {
    id: 'manutencao',
    title: 'Manutenção Predial & Facilities',
    icon: Settings,
    image: '/img/manutencao_53070.jpg',
    desc: 'Gestão preventiva e corretiva contínua para preservar o valor do ativo imobiliário e garantir a continuidade das operações.',
    entregaveis: [
      'Planos de Manutenção Operacional (PMOC)',
      'Manutenção preventiva de utilidades e climatização',
      'Atendimento emergencial com SLA estruturado',
      'Gestão de ativos e inventário patrimonial'
    ]
  }
];

const FLUXO_TRABALHO = [
  {
    passo: '01',
    titulo: 'Diagnóstico & Viabilidade',
    desc: 'Análise detalhada do local, levantamento de requisitos técnicos, estudo de viabilidade e alinhamento de expectativas financeiras.'
  },
  {
    passo: '02',
    titulo: 'Planejamento & BIM',
    desc: 'Desenvolvimento e compatibilização de projetos, elaboração do cronograma físico-financeiro detalhado e cotação de insumos.'
  },
  {
    passo: '03',
    titulo: 'Execução & Controle',
    desc: 'Mobilização de canteiro, aplicação estrita de normas NBR, fiscalização contínua e envio de relatórios de evolução ao cliente.'
  },
  {
    passo: '04',
    titulo: 'Comissionamento & As-Built',
    desc: 'Testes finais de instalações, entrega dos manuais do usuário, documentação legal (Habite-se/AVCB) e entrega oficial das chaves.'
  }
];

export const Servicos: React.FC = () => {
  const [activeServico, setActiveServico] = useState<string>(SERVICOS_LIST[0].id);

  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        {/* MÍDIA DE FUNDO FULL WIDTH */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/Servicos_596.jpg"
            alt="Quattro Construtora - Serviços de Engenharia"
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
              <span className="text-amber-500 font-bold">Serviços</span>
            </nav>

            <h1 className="text-[2.3rem] font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              SOLUÇÕES INTEGRADAS DE <br />
              <span className="bg-amber-500 text-zinc-950 px-3.5 py-1 rounded-md inline-block mt-2 font-black">
                ENGENHARIA CIVIL
              </span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Do planejamento inicial à entrega final das chaves, oferecemos gestão rigorosa, inovação tecnológica e conformidade normativa para garantir o sucesso do seu empreendimento.
            </p>

            <div className="pt-2">
              <Link
                to="/contato"
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2 font-['Montserrat']"
              >
                <span>Solicitar Cotação</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GRID DE SERVIÇOS PRINCIPAIS */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
              Nossas Especialidades
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
              Serviços de Alta Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {SERVICOS_LIST.map((servico, idx) => {
              const IconComp = servico.icon;
              const isOpen = activeServico === servico.id;
              return (
                <div
                  key={servico.id}
                  className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-lg shadow-zinc-900/10"
                >
                  <img
                    src={servico.image}
                    alt={servico.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/10 group-hover:via-zinc-950/70 transition-colors duration-500" />

                  <div className="absolute top-5 sm:top-6 left-5 sm:left-6 right-5 sm:right-6 flex items-center justify-between">
                    <div className="p-3 bg-amber-500 text-zinc-950 rounded-2xl shadow-lg">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-black font-['Montserrat'] text-white/25">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveServico(isOpen ? '' : servico.id)}
                    className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-left w-full"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-lg sm:text-xl font-extrabold text-white font-['Montserrat'] leading-snug mb-2">
                      {servico.title}
                    </h3>
                    <p className={`text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed transition-all duration-300 ${isOpen ? '' : 'line-clamp-2'}`}>
                      {servico.desc}
                    </p>

                    <div className={`grid transition-all duration-400 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                      <div className="overflow-hidden space-y-1.5">
                        {servico.entregaveis.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2 text-[11px] text-zinc-200 font-sans leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-bold uppercase tracking-widest text-amber-400 font-['Montserrat']">
                      {isOpen ? 'Ver menos' : 'Ver detalhes'}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. METODOLOGIA DE EXECUÇÃO */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Processo Estruturado
              </span>
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Como Trabalhamos
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Disciplina executiva e transparência em todas as etapas da obra para garantir previsibilidade e tranquilidade ao contratante.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200/80 rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xs">
            {FLUXO_TRABALHO.map((etapa, idx) => (
              <div 
                key={idx}
                className="bg-white p-7 sm:p-8 relative hover:bg-[#f8f9f6] transition-colors duration-300 space-y-4"
              >
                <h3 className="text-base sm:text-lg font-bold text-zinc-950 font-['Montserrat']">{etapa.titulo}</h3>
                
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                  {etapa.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3.5. PARALLAX */}
      <section
        className="relative h-[45vh] sm:h-[55vh] lg:h-[60vh] bg-zinc-950 lg:bg-fixed bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/img/Sequoia_Img1.jpg')" }}
      >
        <div className="absolute inset-0 bg-zinc-950/40" />
      </section>

      {/* 4. GARANTIA & RIGOR TÉCNICO */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-6 space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Segurança & Confiança
              </span>
              <h2 className="text-[2.3rem] font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Garantia & Rigor Técnico
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-600 text-sm md:text-base font-normal leading-relaxed font-sans max-w-xl">
                Padrões técnicos rigorosos e acompanhamento próximo em cada etapa, para que o contratante tenha segurança do início ao pós-entrega.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">

            <div className="p-7 rounded-3xl bg-[#f8f9f6] border border-zinc-200/80">
              <h4 className="text-base font-extrabold text-zinc-950 font-['Montserrat']">Garantia Estrutural</h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed mt-2">
                Compromisso com a durabilidade patrimonial e suporte técnico pós-entrega estendido.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#f8f9f6] border border-zinc-200/80">
              <h4 className="text-base font-extrabold text-zinc-950 font-['Montserrat']">Transparência Total</h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed mt-2">
                Comunicação direta e relatórios claros em cada etapa da obra.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#f8f9f6] border border-zinc-200/80">
              <h4 className="text-base font-extrabold text-zinc-950 font-['Montserrat']">Engenharia Residente</h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed mt-2">
                Supervisão de engenheiros habilitados no CREA durante toda a execução.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION FINAL COM IMAGEM REDONDA VAZANDO NO TOPO (some no mobile) */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-20 sm:pb-28 bg-zinc-900 text-white font-['Montserrat'] border-t border-zinc-800 overflow-visible">

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">

            <div className="relative max-w-2xl space-y-6">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Proposta Personalizada
              </span>

              <h2 className="text-[2.3rem] font-extrabold text-white leading-[1.12]">
                Precisa de um orçamento detalhado para o seu projeto?
              </h2>

              <p className="text-zinc-400 text-sm md:text-base font-sans font-normal leading-relaxed">
                Nossa equipe técnica realiza a análise preliminar do seu projeto ou necessidade e envia uma proposta comercial transparente em poucos dias.
              </p>

              <div className="pt-2">
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 font-['Montserrat']"
                >
                  <span>Solicitar Cotação de Serviço</span>
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

export default Servicos;