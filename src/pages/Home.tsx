import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Factory, 
  Stethoscope, 
  Wrench, 
  ArrowRight, 
  CheckCircle2,
  HardHat
} from 'lucide-react';

export const Home: React.FC = () => {
  // Dados baseados nos setores reais da Quattro
  const setores = [
    { 
      nome: 'Industrial & Logística', 
      icon: <Factory className="w-8 h-8" />, 
      desc: 'Construção de galpões logísticos, CDs e plantas industriais de alta complexidade.', 
      slug: 'industrial' 
    },
    { 
      nome: 'Saúde & Hospitalar', 
      icon: <Stethoscope className="w-8 h-8" />, 
      desc: 'Infraestrutura rigorosa, laboratórios e ambientes hospitalares com precisão técnica.', 
      slug: 'hospitalar' 
    },
    { 
      nome: 'Manutenção & Facilities', 
      icon: <Wrench className="w-8 h-8" />, 
      desc: 'Gestão contínua, paradas de manutenção e zeladoria predial para grandes empresas.', 
      slug: 'manutencao' 
    },
    { 
      nome: 'Residencial', 
      icon: <Building2 className="w-8 h-8" />, 
      desc: 'Incorporação de alto padrão, loteamentos e edifícios inovadores.', 
      slug: 'residencial' 
    }
  ];

  return (
    <div className="w-full bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image com Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-ken-burns"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=2070')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 z-10 w-full pt-20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm">
              <HardHat className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                Engenharia Multidisciplinar
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Construindo a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Base do Futuro</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              Da infraestrutura para gigantes globais ao residencial de alto padrão. 
              A Quattro une precisão técnica, pioneirismo em Steel Frame e 100% de pontualidade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link 
                to="/contato" 
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
              >
                <span>Fale com um Engenheiro</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/quem-somos" 
                className="flex items-center justify-center px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm"
              >
                Conheça a Quattro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & TRUST BAND (B2B Focus) */}
      <section className="bg-blue-700 relative z-20 -mt-12 mx-4 md:mx-auto max-w-7xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-600/50">
          <div className="p-8 text-center text-white hover:bg-blue-600 transition-colors">
            <span className="block text-4xl md:text-5xl font-black mb-2">+15</span>
            <span className="text-xs md:text-sm uppercase font-semibold tracking-wider text-blue-200">Anos de História</span>
          </div>
          <div className="p-8 text-center text-white hover:bg-blue-600 transition-colors">
            <span className="block text-4xl md:text-5xl font-black mb-2">+1.000</span>
            <span className="text-xs md:text-sm uppercase font-semibold tracking-wider text-blue-200">Obras Entregues</span>
          </div>
          <div className="p-8 text-center text-white hover:bg-blue-600 transition-colors">
            <span className="block text-4xl md:text-5xl font-black mb-2">100%</span>
            <span className="text-xs md:text-sm uppercase font-semibold tracking-wider text-blue-200">No Prazo Acordado</span>
          </div>
          <div className="p-8 text-center text-white hover:bg-blue-600 transition-colors">
            <span className="block text-3xl md:text-4xl font-black mb-2 mt-1">Nacional</span>
            <span className="text-xs md:text-sm uppercase font-semibold tracking-wider text-blue-200">Atuação em todo BR</span>
          </div>
        </div>
      </section>

      {/* 3. SETORES DE ATUAÇÃO (Cards Modulares) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Expertise Técnica</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Soluções Multidisciplinares para Demandas Complexas
            </h3>
          </div>
          <Link to="/servicos" className="text-slate-600 font-semibold hover:text-blue-600 flex items-center gap-1 transition-colors whitespace-nowrap">
            Ver todos os serviços <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {setores.map((setor) => (
            <Link 
              key={setor.slug}
              to={`/setores/${setor.slug}`}
              className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {setor.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{setor.nome}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{setor.desc}</p>
              
              <div className="flex items-center text-sm font-bold text-blue-600 gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                Explorar Setor <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. CASES DE SUCESSO (Baseado nos dados reais: Amazon & Lumini) */}
      <section className="bg-white border-y border-slate-200">
        {/* Case 1: Industrial/Logística */}
        <div className="grid lg:grid-cols-2">
          <div className="order-2 lg:order-1 relative min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=2000" 
              alt="Galpão Logístico" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 flex items-center justify-center p-12 lg:p-24 bg-slate-50">
            <div className="max-w-md space-y-6">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Infraestrutura Global</span>
              <h3 className="text-3xl font-black text-slate-900">Novo Galpão Logístico da Amazon</h3>
              <p className="text-slate-600 leading-relaxed">
                Uma megaobra executada com engenharia de precisão e agilidade. Entregamos a infraestrutura que movimenta a economia digital, respeitando os rigorosos padrões de qualidade globais e prazos inegociáveis.
              </p>
              <ul className="space-y-3 pt-2">
                {['Estrutura Metálica (Steel Frame)', 'Alta complexidade técnica', 'Padrão internacional de segurança'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link to="/blog/case-amazon" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                  Ler Estudo de Caso <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Case 2: Residencial */}
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center justify-center p-12 lg:p-24 bg-white">
            <div className="max-w-md space-y-6">
              <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">Alto Padrão Residencial</span>
              <h3 className="text-3xl font-black text-slate-900">Lumini Clube Residencial 2</h3>
              <p className="text-slate-600 leading-relaxed">
                Muito além de um projeto arquitetônico. A construção do Lumini 2 reflete a expertise da Quattro em criar espaços de vivência luxuosos, seguros e entregues rigorosamente no prazo estabelecido.
              </p>
              <div className="pt-4">
                <Link to="/setores/residencial" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                  Conheça o Portfólio Residencial <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000" 
              alt="Lumini Clube Residencial" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION FINAL */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        {/* Grafismo de fundo (Grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Vamos transformar o seu projeto em uma realidade sólida?
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light">
            Nossa equipe é continuamente treinada em total conformidade com as normas técnicas e o rigoroso Padrão Quattro de Qualidade.
          </p>
          <div className="pt-4">
            <Link 
              to="/contato" 
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30 text-lg"
            >
              Iniciar Conversa com Especialista
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};