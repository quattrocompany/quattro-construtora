// src/app/Setores/[categoriaSetor]/[obraSlug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Removido ícone não utilizado: CheckCircle2
import { MapPin, CalendarDays, Ruler, Weight, Building2, Layers3, ChevronLeft } from 'lucide-react';

interface ObraPageProps {
  params: Promise<{ categoriaSetor: string; obraSlug: string }>;
}

// Função simulada de busca da obra específica via API/Admin
async function getObraData(obraSlug: string) {
  // Exemplo de integração futura com sua API/Admin:
  // const res = await fetch(`https://sua-api.com/api/obras/${obraSlug}`, { revalidate: 60 });
  // if (!res.ok) return null;
  // return res.json();

  const mockObras: Record<string, any> = {
    'centro-de-distribuicao-amazon': {
      slug: 'centro-de-distribuicao-amazon',
      sectorSlug: 'industrial-e-logistica',
      name: 'Centro de Distribuição Amazon - Cajamar',
      location: 'Cajamar, Estado de São Paulo',
      client: 'Amazon Brasil',
      year: '2023',
      status: 'Concluído (Turnkey)',
      
      specifications: [
        { icon: Ruler, label: 'Área Construída', value: '152.500 m²' },
        { icon: Weight, label: 'Capacidade do Piso', value: '8 ton/m² (Nivelamento Laser)' },
        { icon: Building2, label: 'Pé-direito Livre', value: '14 metros' },
        { icon: Layers3, label: 'Sistema Estrutural', value: 'Concreto pré-moldado e cobertura metálica thermoacústica' },
      ],
      
      description: 'Execução completa em modelo Turnkey de mega centro de distribuição logístico. O projeto destacou-se pela complexidade na execução do piso industrial de altíssima resistência com tolerâncias de nivelamento extremamente rigorosas para operação de empilhadeiras VNA automatizadas, além de estrutura de cobertura com vãos livres de 35 metros.',

      images: [
        '/img/placeholder.jpg', // Capa principal
        '/img/placeholder.jpg',
        '/img/placeholder.jpg',
        '/img/placeholder.jpg',
      ],
    },
  };

  return mockObras[obraSlug] || null;
}

export default async function ObraDetalhePage({ params }: ObraPageProps) {
  const { categoriaSetor, obraSlug } = await params;
  const obra = await getObraData(obraSlug);

  if (!obra) {
    notFound();
  }

  const mainImage = obra.images[0];
  const galleryImages = obra.images.slice(1);

  return (
    <main className="min-h-screen bg-[#f8f9f6] text-zinc-900 selection:bg-amber-500 selection:text-zinc-950 font-sans relative overflow-hidden">
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20 space-y-16 relative z-10">
        
        {/* Navegação / Voltar para a Categoria */}
        <nav className="border-b border-zinc-200 pb-6">
          <Link 
            href={`/Setores/${categoriaSetor}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-amber-600 transition-colors font-['Montserrat'] group"
          >
             <div className="p-2.5 bg-zinc-100 group-hover:bg-amber-500/10 rounded-xl transition-colors">
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
             </div>
            Voltar para as Obras do Setor
          </Link>
        </nav>

        {/* Título e Capa da Obra */}
        <section className="space-y-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 font-sans">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md font-['Montserrat']">
              {obra.status}
            </span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>{obra.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-amber-600" />
              <span>Entregue em {obra.year}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 font-['Montserrat'] tracking-tight leading-[1.1]">
            {obra.name}
          </h1>
            
          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden border border-zinc-200/80 shadow-2xl bg-zinc-200">
            <img 
              src={mainImage} 
              alt={`Imagem principal da obra ${obra.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Informações Técnicas e Descrição (50/50 Split) */}
        <section className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
          {/* Ficha Técnica */}
          <div className="lg:col-span-5 bg-white border border-zinc-200/80 p-8 sm:p-10 rounded-3xl space-y-8 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block font-['Montserrat']">
                Ficha Técnica
              </span>
              <h3 className="text-2xl font-bold text-zinc-950 tracking-tight font-['Montserrat']">
                Destaques e Capacidades
              </h3>
            </div>
                
            <div className="space-y-6">
              {obra.specifications.map((spec: any, index: number) => {
                const Icon = spec.icon;
                return (
                  <div key={index} className="flex items-start gap-4 pb-6 border-b border-zinc-100 last:border-0 last:pb-0">
                    <div className="p-3 bg-zinc-100 rounded-xl text-zinc-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 flex-1 font-sans text-sm">
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider font-['Montserrat']">{spec.label}</p>
                      <p className="text-base font-semibold text-zinc-950">{spec.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Descrição Detalhada */}
          <div className="lg:col-span-7 bg-white border border-zinc-200/80 p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-zinc-950 font-['Montserrat'] border-b border-zinc-100 pb-4">
                Sobre o Projeto
              </h2>
              <p className="text-zinc-600 font-sans text-base md:text-lg leading-relaxed whitespace-pre-line">
                {obra.description}
              </p>
            </div>
            
            {obra.client && (
              <div className="flex justify-between items-center pt-6 mt-8 border-t border-zinc-100 text-sm">
                <span className="text-zinc-500 font-medium font-['Montserrat'] uppercase tracking-wider text-xs">Player/Cliente:</span>
                <span className="font-bold text-zinc-900">{obra.client}</span>
              </div>
            )}
          </div>
        </section>

        {/* Galeria de Imagens */}
        {galleryImages.length > 0 && (
          <section className="space-y-12 pt-8">
            <div className="space-y-3">
              <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full w-fit font-['Montserrat']">
                Registros
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight font-['Montserrat'] leading-tight">
                Galeria do Projeto
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {galleryImages.map((img: string, index: number) => (
                <div key={index} className="overflow-hidden rounded-3xl border border-zinc-200 shadow-sm aspect-square md:aspect-auto md:h-80 bg-zinc-200 group">
                  <img 
                    src={img} 
                    alt={`${obra.name} - Imagem ${index + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Banner CTA Final (Opcional, inspirado no site) */}
        <section className="bg-zinc-950 rounded-3xl p-10 mt-20 flex flex-col md:flex-row items-center justify-between gap-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-2 relative z-10">
                <h4 className="text-2xl font-bold font-['Montserrat'] tracking-tight">Interessado em engenharia de alta performance?</h4>
                <p className="text-zinc-400 font-sans text-sm">Fale com nossos especialistas e solicite uma apresentação técnica para sua próxima obra.</p>
            </div>
            <Link 
                href="/Contato" 
                className="px-6 py-3 bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors whitespace-nowrap font-['Montserrat'] relative z-10"
            >
                Solicitar Proposta
            </Link>
        </section>

      </div>
    </main>
  );
}