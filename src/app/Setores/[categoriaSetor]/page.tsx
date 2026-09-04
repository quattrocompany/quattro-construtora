// src/app/Setores/[categoriaSetor]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Removido ícone não utilizado: Building2
import { Factory, MapPin, CalendarDays, ArrowRight, Layers3 } from 'lucide-react';

interface SetorPageProps {
  params: Promise<{ categoriaSetor: string }>;
}

// Função simulada de busca da categoria no Admin/API
async function getSetorData(slug: string) {
  // Exemplo de integração futura com sua API/Admin:
  // const res = await fetch(`https://sua-api.com/api/setores/${slug}`, { revalidate: 60 });
  // if (!res.ok) return null;
  // return res.json();

  const mockSetores: Record<string, any> = {
    'industrial-e-logistica': {
      title: 'Industrial & Logística',
      description: 'Engenharia para galpões logísticos de alta tonelagem, parques fabris, centros de distribuição automatizados e estruturas de grande vão livre.',
      normas: ['NBR 15575', 'NBR 6118', 'NBR 8800'],
      obras: [
        {
          slug: 'centro-de-distribuicao-amazon',
          name: 'Centro de Distribuição Amazon',
          location: 'Cajamar, SP',
          area: '150.000 m²',
          year: '2023',
          image: '/img/placeholder.jpg',
        },
        {
          slug: 'sequoia-logistica-hub',
          name: 'Hub Logístico Sequoia',
          location: 'Embu das Artes, SP',
          area: '85.000 m²',
          year: '2022',
          image: '/img/placeholder.jpg',
        },
      ],
    },
  };

  return mockSetores[slug] || null;
}

export default async function SetorPage({ params }: SetorPageProps) {
  const { categoriaSetor } = await params;
  const setor = await getSetorData(categoriaSetor);

  if (!setor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f9f6] text-zinc-900 selection:bg-amber-500 selection:text-zinc-950 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16">
        
        {/* Cabeçalho do Setor */}
        <section className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-zinc-200/80 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-3xl w-fit">
                  <Factory className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-950 font-['Montserrat'] tracking-tighter leading-tight">
                  Obras de {setor.title}
                </h1>
              </div>
              <p className="text-zinc-600 text-base md:text-lg font-normal leading-relaxed font-sans">
                {setor.description}
              </p>
            </div>

            {/* Normas Técnicas Cadastradas */}
            {setor.normas && setor.normas.length > 0 && (
              <div className="flex flex-wrap gap-2.5 md:justify-end">
                {setor.normas.map((norma: string) => (
                  <span key={norma} className="px-4 py-2 bg-[#f8f9f6] border border-zinc-200/60 rounded-xl text-xs font-bold text-zinc-700 tracking-wider font-['Montserrat'] whitespaces-nowrap">
                    {norma}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Grid de Obras Executadas */}
        <section className="space-y-10 pt-8">
          <div className="space-y-3">
             <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full w-fit font-['Montserrat']">
                Portfólio do Setor
             </span>
             <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight font-['Montserrat'] leading-tight">
                Obras Executadas e Destaques
             </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
            {setor.obras.map((obra: any) => (
              <div key={obra.slug} className="bg-white border border-zinc-200/80 rounded-[2rem] overflow-hidden hover:border-amber-500/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="aspect-[16/10] overflow-hidden relative bg-zinc-100">
                  <img 
                    src={obra.image} 
                    alt={obra.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <Layers3 className="absolute top-4 left-4 w-5 h-5 text-zinc-100/50" />
                </div>
                
                <div className="p-8 flex flex-col flex-1 justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-zinc-950 font-['Montserrat'] tracking-tight group-hover:text-amber-600 transition-colors">
                      {obra.name}
                    </h3>
                    
                    <div className="flex items-center gap-2.5 text-sm text-zinc-600">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{obra.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-zinc-100 text-sm text-zinc-600 font-sans">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-zinc-400" />
                      <span>Conclusão: <strong className="text-zinc-900">{obra.year}</strong></span>
                    </div>
                    
                    <Link 
                      href={`/Setores/${categoriaSetor}/${obra.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-amber-500/10 font-['Montserrat']"
                    >
                      <span>Ver Detalhes</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}