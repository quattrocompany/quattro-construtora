// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { QuemSomos } from './pages/QuemSomos';
import { Setores } from './pages/Setores';
import { Servicos } from './pages/Servicos';
import { Contato } from './pages/Contato';

export const App: React.FC = () => {
  return (
    <Router>
      {/* Wrapper Mestre com Light Theme Nativo (bg-white e text-zinc-900) */}
      <div className="min-h-screen bg-white text-zinc-900 selection:bg-amber-500 selection:text-zinc-950 flex flex-col justify-between font-sans antialiased">
        
        {/* Header Dinâmico (Mutante de Fundo Transparente -> Vidro Branco no Scroll) */}
        <Header />

        {/* Área Principal de Conteúdo das Páginas */}
        <main className="grow">
          <Routes>
            {/* Rota Inicial / Landing Page */}
            <Route path="/" element={<Home />} />
            
            {/* Rota Institucional A QUATTRO / QUEM SOMOS */}
            <Route path="/quem-somos" element={<QuemSomos />} />
            
            {/* Adicione futuras rotas aqui (ex: /setores, /servicos, /contato) */}
            <Route path="/setores" element={<Setores />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>

        {/* Footer Renderizado uma única vez para toda a aplicação */}
        <Footer />

      </div>
    </Router>
  );
};

export default App;