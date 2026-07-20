// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
        {/* Header Global (Renderiza em todas as páginas) */}
        <Header />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Outras rotas aqui */}
          </Routes>
        </main>

        {/* Footer Global Único (Renderiza uma única vez no final de todas as páginas) */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;