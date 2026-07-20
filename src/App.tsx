// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEmpreendimentos, type Empreendimento } from './lib/firebase';
import { LeadForm } from './components/LeadForm';

function HomePage() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmpreendimentos()
      .then((data) => setEmpreendimentos(data))
      .catch((err) => console.error('Erro ao carregar dados:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <header className="p-6 border-b border-neutral-800 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-wider">QUATTRO CONSTRUTORA</h1>
        <nav className="space-x-6 text-sm uppercase tracking-wide">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <a href="#empreendimentos" className="hover:text-amber-500 transition-colors">Empreendimentos</a>
          <a href="#contato" className="hover:text-amber-500 transition-colors">Contato</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-16 text-center py-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Projetos Exclusivos de Alto Padrão</h2>
          <p className="text-neutral-400 text-lg">Inovação, qualidade e sofisticação em cada detalhe.</p>
        </section>

        <section id="empreendimentos" className="mb-20">
          <h3 className="text-2xl font-bold mb-8 border-l-4 border-amber-500 pl-4">Lançamentos & Obras</h3>
          {loading ? (
            <p className="text-neutral-400">Carregando empreendimentos...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {empreendimentos.map((item) => (
                <article key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg">
                  <img src={item.imagemCapa} alt={item.titulo} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">{item.status}</span>
                    <h4 className="text-xl font-bold mt-2">{item.titulo}</h4>
                    <p className="text-neutral-400 text-sm mt-2">{item.descricao}</p>
                    <p className="text-xs text-neutral-500 mt-4">{item.endereco}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="contato" className="grid md:grid-cols-2 gap-12 items-center border-t border-neutral-800 pt-16">
          <div>
            <h3 className="text-3xl font-bold mb-4">Entre em Contato</h3>
            <p className="text-neutral-400 mb-6">
              Preencha o formulário ao lado e um dos nossos consultores entrará em contato com você em breve.
            </p>
          </div>
          <LeadForm />
        </section>
      </main>

      <footer className="border-t border-neutral-800 text-center py-6 text-sm text-neutral-500">
        © {new Date().getFullYear()} Quattro Construtora. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}