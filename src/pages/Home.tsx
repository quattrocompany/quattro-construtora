import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Factory, Stethoscope, Wrench, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const setores = [
    { nome: 'Industrial', icon: <Factory className="w-10 h-10" />, desc: 'Construção de galpões logísticos e plantas industriais.', slug: 'industrial' },
    { nome: 'Hospitalar', icon: <Stethoscope className="w-10 h-10" />, desc: 'Infraestrutura de alta complexidade para a área da saúde.', slug: 'hospitalar' },
    { nome: 'Manutenção', icon: <Wrench className="w-10 h-10" />, desc: 'Facilities e manutenção predial contínua para empresas.', slug: 'manutencao' },
    { nome: 'Residencial', icon: <Building2 className="w-10 h-10" />, desc: 'Incorporação imobiliária e edifícios de alto padrão.', slug: 'residencial' }
  ];

  return (
    <div className="w-full">
      {/* Hero Section B2B */}
      <section className="relative w-full h-[600px] bg-slate-900 flex items-center">
        {/* Placeholder para vídeo institucional ou foto de obra (Ex: Galpão ou Steel Frame) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80')] bg-cover bg-center opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-6 z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-white max-w-3xl leading-tight">
            Engenharia de <span className="text-blue-500">Alta Performance</span> em todo o Brasil.
          </h1>
          <p className="text-lg text-slate-300 max-w-xl">
            Da fundação à manutenção. Projetos executados com a precisão técnica, agilidade e excelência que o mercado corporativo e residencial exige.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/contato" className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded shadow-lg hover:bg-blue-700 transition">
              Solicitar Orçamento
            </Link>
            <Link to="/servicos" className="px-8 py-3.5 bg-white text-slate-900 font-bold rounded shadow-lg hover:bg-slate-100 transition">
              Nossos Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* Faixa de Credibilidade */}
      <section className="bg-blue-600 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <span className="block text-4xl font-black mb-1">+15</span>
            <span className="text-xs uppercase font-semibold tracking-wider opacity-80">Anos de Mercado</span>
          </div>
          <div>
            <span className="block text-4xl font-black mb-1">+1.000</span>
            <span className="text-xs uppercase font-semibold tracking-wider opacity-80">Obras Concluídas</span>
          </div>
          <div>
            <span className="block text-4xl font-black mb-1">Pioneiros</span>
            <span className="text-xs uppercase font-semibold tracking-wider opacity-80">Em Steel Frame no BR</span>
          </div>
          <div>
            <span className="block text-4xl font-black mb-1">Nacional</span>
            <span className="text-xs uppercase font-semibold tracking-wider opacity-80">Cobertura em todo o país</span>
          </div>
        </div>
      </section>

      {/* Setores de Atuação */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Setores de Atuação</h2>
          <p className="text-slate-600">Know-how multidisciplinar para atender demandas altamente exigentes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {setores.map((setor) => (
            <Link 
              to={`/setores/${setor.slug}`} 
              key={setor.slug}
              className="group bg-white border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                {setor.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{setor.nome}</h3>
              <p className="text-sm text-slate-600 mb-6 flex-grow">{setor.desc}</p>
              <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Saiba mais <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Portfolio Highlight (Ex: Amazon / Lumini) */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Case de Sucesso</span>
            <h2 className="text-3xl font-black text-slate-900">Infraestrutura para Gigantes Globais</h2>
            <p className="text-slate-600 leading-relaxed">
              Conheça os detalhes da construção do novo galpão logístico da Amazon. Uma megaobra executada com a engenharia de precisão, agilidade e excelência que o mercado global exige.
            </p>
            <Link to="/blog/infraestrutura-gigantes-globais" className="inline-flex px-6 py-3 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition">
              Ler Estudo de Caso Completo
            </Link>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80" 
              alt="Galpão Logístico"
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};