// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, User, HardHat } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ativa o fundo denso ao rolar mais de 40px
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'A Quattro', path: '/quem-somos' },
    { name: 'Setores & Obras', path: '/setores' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 font-sans ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-zinc-950/90 via-zinc-950/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LOGOTIPO INTEGRO */}
        <Link to="/" className="flex items-center group focus:outline-none z-50">
          <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-2 rounded-xl shadow-xl group-hover:border-amber-500/40 transition-all duration-300">
            <img 
              src="/logo/logo_quattro-construtora.svg" 
              alt="Quattro Construtora" 
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>
        </Link>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 relative py-1
                  ${isActive ? 'text-amber-500' : 'text-zinc-300 hover:text-white'}
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* DIVISOR E AÇÕES CORPORATIVAS */}
          <div className="flex items-center gap-3 pl-6 border-l border-zinc-800">
            <a
              href="https://portal.quattroconstrutora.com.br/cliente"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-500 hover:border-amber-500/40 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>Portal Cliente</span>
            </a>

            <a
              href="#contato"
              className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center gap-2"
            >
              <span>Fale Conosco</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2 focus:outline-none z-50"
          aria-label="Abrir Menu"
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {/* OVERLAY MENU MOBILE */}
      <div 
        className={`fixed inset-0 bg-zinc-950/98 backdrop-blur-2xl z-40 lg:hidden transition-all duration-500 flex flex-col justify-between p-8 pt-28 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Navegação</p>
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              onClick={() => setIsMenuOpen(false)} 
              className="block text-2xl font-bold uppercase tracking-wider text-zinc-200 hover:text-amber-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="pt-8 border-t border-zinc-900 space-y-3">
          <a
            href="https://portal.quattroconstrutora.com.br/cliente"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-500 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>Portal do Cliente</span>
          </a>

          <a
            href="https://portal.quattroconstrutora.com.br/colaborador"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <HardHat className="w-4 h-4" />
            <span>Portal do Colaborador</span>
          </a>
        </div>
      </div>
    </header>
  );
};