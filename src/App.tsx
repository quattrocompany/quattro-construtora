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
import { BlogIndex } from './pages/Blog/BlogIndex';
import { BlogPost } from './pages/Blog/BlogPost';
import { Privacidade } from './pages/Privacidade';
import { Termos } from './pages/Termos';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 selection:bg-amber-500 selection:text-zinc-950 flex flex-col justify-between font-['Inter',sans-serif] antialiased">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/setores" element={<Setores />} />
            <Route path="/setores-e-obras" element={<Setores />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;