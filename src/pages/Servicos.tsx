// src/pages/Servicos.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
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
  Clock 
} from 'lucide-react';

// ============================================================================
// DADOS ESTÁTICOS DOS SERVIÇOS E FLUXO DE TRABALHO
// ============================================================================

const SERVICOS_LIST = [
  {
    id: 'turnkey',
    title: 'Engenharia Turnkey & EPC',
    icon: Layers,
    desc: 'Solução completa do conceito à entrega das chaves. Assumimos a responsabilidade integral pelo projeto, compras, construção e comissionamento.',
    entregaveis: [
      'Gestão unificada de fornecedores e contratos',
      'Preço fechado com previsibilidade orçamentária',
      'Praso de entrega garantido em contrato',
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

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export const Servicos: React.FC = () => {
  return (
    <div className="w-full bg-white text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden pt-24 md:pt-28">
      
      {/* ========================================================================= */}
      {/* 1. HERO INSTITUCIONAL DA PÁGINA                                          */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto space-y-6 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-amber-600 font-bold">Serviços & Engenharia</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Soluções Integradas
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-950 tracking-tight leading-none">
              Engenharia completa para cada fase do seu empreendimento.
            </h1>
            <p className="text-zinc-600 text-base md:text-lg font-normal leading-relaxed pt-2">
              Do planejamento inicial à entrega final das chaves, oferecemos gestão rigorosa, inovação tecnológica e conformidade normativa para garantir o sucesso do seu projeto.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. GRID DE SERVIÇOS PRINCIPAIS (BRANCO PURO)                             */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Nossas Especialidades
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950">
              Serviços de Alta Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICOS_LIST.map((servico) => {
              const IconComp = servico.icon;
              return (
                <div 
                  key={servico.id}
                  className="bg-zinc-50 border border-zinc-200 p-8 md:p-10 rounded-3xl hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="p-3.5 bg-white border border-zinc-200 rounded-2xl w-fit group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors shadow-xs">
                      <IconComp className="w-7 h-7 text-amber-600" />
                    </div>

                    <h3 className="text-2xl font-extrabold text-zinc-950">{servico.title}</h3>
                    
                    <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-normal">
                      {servico.desc}
                    </p>

                    {/* Entregáveis Principais */}
                    <div className="pt-4 border-t border-zinc-200/80 space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">
                        O que inclui:
                      </span>
                      {servico.entregaveis.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700 font-medium leading-tight">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      to="/contato"
                      className="w-full py-3 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 hover:text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
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

      {/* ========================================================================= */}
      {/* 3. METODOLOGIA DE EXECUÇÃO (CINZA 20% - bg-zinc-50)                      */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
                Processo Estruturado
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-950">
                Como Trabalhamos
              </h2>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm font-normal leading-relaxed">
              Disciplina executiva e transparência em todas as etapas da obra para garantir previsibilidade e tranquilidade.
            </p>
          </div>

          {/* TIMELINE EM CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FLUXO_TRABALHO.map((etapa, idx) => (
              <div 
                key={idx}
                className="bg-white border border-zinc-200 p-8 rounded-2xl relative overflow-hidden shadow-sm space-y-4"
              >
                {/* Número do Passo em Destaque */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-mono text-amber-600">
                    {etapa.passo}
                  </span>
                  <HardHat className="w-5 h-5 text-zinc-300" />
                </div>

                <h3 className="text-lg font-extrabold text-zinc-950">{etapa.titulo}</h3>
                
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  {etapa.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GARANTIA & RIGOR TÉCNICO (BRANCO PURO)                                 */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-3 gap-8">
          
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
            <ShieldCheck className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-zinc-950">Garantia Estrutural</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Compromisso com a durabilidade patrimonial e suporte técnico pós-entrega estendido.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
            <Clock className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-zinc-950">Pontualidade Britânica</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Controle rigoroso de marcos contratuais para assegurar a data combinada.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
            <HardHat className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-zinc-950">Engenharia Residente</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Supervisão de engenheiros habilitados no CREA durante toda a execução.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ÂNCORA DE CONVERSÃO / CTA (DARK MODE ENCLOSURE - bg-zinc-950)         */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-zinc-950 text-white">
        <div className="max-w-[1440px] mx-auto bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 block">
              Proposta Personalizada
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Precisa de um orçamento detalhado para o seu projeto?
            </h2>

            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              Nossa equipe técnica realiza a análise preliminar do seu projeto ou necessidade e envia uma proposta comercial transparente em poucos dias.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                to="/contato"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Solicitar Cotação de Serviço</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/setores"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Conhecer Nossos Setores</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};