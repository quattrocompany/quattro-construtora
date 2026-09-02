// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen w-full bg-white text-zinc-900 selection:bg-amber-500 selection:text-zinc-950 flex flex-col justify-between font-['Inter',sans-serif] antialiased overflow-x-hidden">
        
        {/* MARCA D'ÁGUA EM CAMADA SUPERIOR */}
        <div 
          className="absolute inset-0 w-full h-full z-30 pointer-events-none opacity-35 bg-cover bg-center bg-no-repeat mix-blend-multiply"
          style={{ backgroundImage: "url('/img/bg_construtora1.jpg')" }}
        />

        <Header />
        
        <main className="grow relative z-10 w-full">
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