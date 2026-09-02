// src/pages/Servicos.tsx
import React from 'react';
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
  ShieldCheck, 
  HardHat, 
  Clock,
  ChevronRight
} from 'lucide-react';

const SERVICOS_LIST = [
  {
    id: 'turnkey',
    title: 'Engenharia Turnkey & EPC',
    icon: Layers,
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
  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
        {/* MÍDIA DE FUNDO FULL WIDTH */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/img/BG_CTA_QuattroInc_Site.jpeg"
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

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.12] font-['Montserrat']">
              <span className="inline-flex flex-col items-start my-1 relative">
                {/* Bloco Superior: SOLUÇÕES */}
                <span className="relative bg-amber-500 text-zinc-950 px-3.5 pt-1.5 pb-1 rounded-tl-2xl rounded-tr-2xl leading-none font-black z-10">
                  SOLUÇÕES
                  {/* SVG Curva Côncava Fillet no Canto Interno Direito */}
                  <svg
                    className="absolute bottom-0 -right-4 w-4 h-4 text-amber-500 fill-current pointer-events-none"
                    viewBox="0 0 16 16"
                  >
                    <path d="M 0 0 V 16 H 16 A 16 16 0 0 1 0 0 Z" />
                  </svg>
                </span>

                {/* Bloco Inferior: INTEGRADAS + DE */}
                <span className="flex items-end relative -mt-px">
                  <span className="bg-amber-500 text-zinc-950 px-3.5 pt-1 pb-2 rounded-bl-2xl rounded-br-2xl rounded-tr-2xl leading-none font-black z-0">
                    INTEGRADAS
                  </span>
                  <span className="ml-3 text-white leading-none font-extrabold pb-1">DE</span>
                </span>
              </span> <br />
              <span className="inline-block mt-0.5">
                ENGENHARIA <br />
                CIVIL
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICOS_LIST.map((servico) => {
              const IconComp = servico.icon;
              return (
                <div 
                  key={servico.id}
                  className="bg-[#f8f9f6] border border-zinc-200/80 p-7 sm:p-8 rounded-3xl hover:border-amber-500/50 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between group shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl w-fit">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-['Montserrat'] leading-snug">{servico.title}</h3>
                    
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans font-normal">
                      {servico.desc}
                    </p>

                    <div className="pt-4 border-t border-zinc-200/80 space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2 font-['Montserrat']">
                        O que inclui:
                      </span>
                      {servico.entregaveis.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 font-sans leading-tight">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/contato"
                      className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-950 hover:text-white border border-zinc-200/80 text-zinc-900 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xs font-['Montserrat']"
                    >
                      <span>Solicitar Proposta</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. METODOLOGIA DE EXECUÇÃO */}
      <section className="py-20 sm:py-28 bg-[#f8f9f6] border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Processo Estruturado
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] leading-[1.12] tracking-tight">
                Como Trabalhamos
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-sm font-sans leading-relaxed">
              Disciplina executiva e transparência em todas as etapas da obra para garantir previsibilidade e tranquilidade ao contratante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLUXO_TRABALHO.map((etapa, idx) => (
              <div 
                key={idx}
                className="bg-white border border-zinc-200/80 p-7 sm:p-8 rounded-3xl relative overflow-hidden shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all duration-300 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-['Montserrat'] text-amber-600">
                    {etapa.passo}
                  </span>
                  <HardHat className="w-5 h-5 text-zinc-300" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-zinc-950 font-['Montserrat']">{etapa.titulo}</h3>
                
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                  {etapa.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. GARANTIA & RIGOR TÉCNICO */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-200/80 font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="flex items-start gap-4 p-7 rounded-3xl bg-[#f8f9f6] border border-zinc-200/80 shadow-xs hover:border-amber-500/40 hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-zinc-950 font-['Montserrat']">Garantia Estrutural</h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                Compromisso com a durabilidade patrimonial e suporte técnico pós-entrega estendido.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-7 rounded-3xl bg-[#f8f9f6] border border-zinc-200/80 shadow-xs hover:border-amber-500/40 hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-zinc-950 font-['Montserrat']">Pontualidade Britânica</h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                Controle rigoroso de marcos contratuais para assegurar a data combinada.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-7 rounded-3xl bg-[#f8f9f6] border border-zinc-200/80 shadow-xs hover:border-amber-500/40 hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl shrink-0">
              <HardHat className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-zinc-950 font-['Montserrat']">Engenharia Residente</h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                Supervisão de engenheiros habilitados no CREA durante toda a execução.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION FINAL */}
      <section className="py-20 sm:py-28 bg-zinc-950 text-white font-['Montserrat']">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-14 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md w-fit font-['Montserrat']">
                Proposta Personalizada
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12]">
                Precisa de um orçamento detalhado para o seu projeto?
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-sans font-normal leading-relaxed">
                Nossa equipe técnica realiza a análise preliminar do seu projeto ou necessidade e envia uma proposta comercial transparente em poucos dias.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  to="/contato"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 inline-flex items-center justify-center gap-2 font-['Montserrat']"
                >
                  <span>Solicitar Cotação de Serviço</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/setores"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 font-['Montserrat']"
                >
                  <span>Conhecer Nossas Obras</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Servicos;