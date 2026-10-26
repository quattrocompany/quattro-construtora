// src/App.tsx
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
const QuemSomos = lazy(() => import('./pages/QuemSomos').then((m) => ({ default: m.QuemSomos })));
const Setores = lazy(() => import('./pages/Setores').then((m) => ({ default: m.Setores })));
const Servicos = lazy(() => import('./pages/Servicos').then((m) => ({ default: m.Servicos })));
const Contato = lazy(() => import('./pages/Contato').then((m) => ({ default: m.Contato })));
const TrabalheConosco = lazy(() => import('./pages/TrabalheConosco').then((m) => ({ default: m.TrabalheConosco })));
const Duvidas = lazy(() => import('./pages/Duvidas').then((m) => ({ default: m.Duvidas })));
const BlogIndex = lazy(() => import('./pages/Blog/BlogIndex').then((m) => ({ default: m.BlogIndex })));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost').then((m) => ({ default: m.BlogPost })));
const Privacidade = lazy(() => import('./pages/Privacidade').then((m) => ({ default: m.Privacidade })));
const Termos = lazy(() => import('./pages/Termos').then((m) => ({ default: m.Termos })));
const Admin = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Admin })));
const PortalCliente = lazy(() => import('./pages/PortalCliente').then((m) => ({ default: m.PortalCliente })));
import { ScrollEffects } from './lib/scrollEffects';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen w-full bg-white text-zinc-900 selection:bg-amber-500 selection:text-zinc-950 flex flex-col justify-between font-['Inter',sans-serif] antialiased overflow-x-hidden">
      {!isAdminRoute && (
        <div 
          className="absolute inset-0 w-full h-full z-30 pointer-events-none opacity-35 bg-cover bg-center bg-no-repeat mix-blend-multiply"
          style={{ backgroundImage: "url('/img/bg_construtora1.jpg')" }}
        />
      )}

      {!isAdminRoute && <Header />}
      
      <main className="grow relative z-10 w-full">
        <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/setores" element={<Setores />} />
          <Route path="/setores-e-obras" element={<Setores />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/duvidas-frequentes" element={<Duvidas />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/portal-cliente" element={<PortalCliente />} />
        </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <ScrollEffects />
      <MainLayout />
    </Router>
  );
};

export default App;