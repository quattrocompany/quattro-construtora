import { useEffect, useState } from 'react';
import { getEmpreendimentos, type Empreendimento } from './lib/firebase';
import './App.css';

function App() {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmpreendimentos()
      .then((data) => setEmpreendimentos(data))
      .catch((err) => console.error('Erro ao carregar empreendimentos:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Quattro Construtora</h1>
      {loading ? (
        <p>Carregando dados do Firestore...</p>
      ) : (
        <div>
          {empreendimentos.length === 0 ? (
            <p>Nenhum empreendimento cadastrado no Firestore.</p>
          ) : (
            empreendimentos.map((item) => (
              <article key={item.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
                <h2>{item.titulo}</h2>
                <p><strong>Status:</strong> {item.status}</p>
                <p>{item.descricao}</p>
              </article>
            ))
          )}
        </div>
      )}
    </main>
  );
}

export default App;