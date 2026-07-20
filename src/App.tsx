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
        {/* Renderizado uma única vez para toda a aplicação */}
        <Header />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Outras rotas da aplicação */}
          </Routes>
        </main>

        {/* Renderizado uma única vez no final de todas as páginas */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;