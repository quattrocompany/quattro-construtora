// src/components/Header.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, HardHat, User } from 'lucide-react';
import { ModalColaborador } from './ModalColaborador';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Listener passivo e performático para capturar o scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, handleKeyDown]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'A Quattro', path: '/quem-somos' },
    { name: 'Setores & Obras', path: '/setores' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-zinc-200' // Branco Transparente (Scrolled)
            : 'bg-zinc-950/50 backdrop-blur-sm border-b border-white/5'        // Cinza Escuro Transparente (Topo)
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative">
          
          {/* LOGO FIXO Y = 0 */}
          <Link 
            to="/" 
            className="absolute top-0 left-6 md:left-12 z-50 focus:outline-none group block m-0 p-0"
            aria-label="Quattro Construtora - Página Inicial"
          >
            <img 
              src="/logo/Logo_Quattro Construtora_cut.svg" 
              alt="Quattro Construtora" 
              className="h-16 md:h-20 lg:h-24 w-auto object-contain object-top block drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
            
            {/* Espaçador do Logo */}
            <div className="w-32 md:w-44 lg:w-48 xl:w-52 h-8 shrink-0" />

            {/* NAV DESKTOP */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10" aria-label="Navegação Principal">
              
              <div className="flex items-center gap-6 lg:gap-8 xl:gap-10">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => `
                      text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.18em] xl:tracking-[0.22em] whitespace-nowrap transition-colors duration-300 relative py-2 px-1.5
                      after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300
                      ${isActive 
                        ? 'text-amber-500 after:w-full' 
                        : isScrolled 
                          ? 'text-zinc-600 hover:text-zinc-950 hover:after:w-1/2' // Textos Escuros no Fundo Branco
                          : 'text-zinc-300 hover:text-white hover:after:w-1/2'    // Textos Claros no Fundo Cinza
                      }
                    `}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* BOTÕES DE ACESSO */}
              <div className={`flex items-center gap-3 xl:gap-4 pl-6 xl:pl-10 border-l transition-colors duration-300 ${
                isScrolled ? 'border-zinc-200' : 'border-white/10'
              }`}>
                
                {/* SOU COLABORADOR DINÂMICO */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50 shrink-0 ${
                    isScrolled 
                      ? 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700 hover:border-amber-500/40 shadow-sm' 
                      : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-amber-500/60'
                  }`}
                >
                  <HardHat className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Sou Colaborador</span>
                </button>

                {/* PORTAL DO CLIENTE FIXO */}
                <a
                  href="https://portal.quattroconstrutora.com.br/cliente"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 xl:px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 shadow-lg flex items-center gap-2 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shrink-0"
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span>Portal do Cliente</span>
                </a>

              </div>
            </nav>

            {/* TOGGLE MOBILE DINÂMICO */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 focus:outline-none z-50 rounded-xl border transition-colors ${
                isScrolled
                  ? 'text-zinc-900 bg-zinc-50 border-zinc-200'
                  : 'text-white bg-zinc-900/60 border-zinc-700'
              }`}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* DRAWER MOBILE OVERLAY */}
        <div 
          className={`fixed inset-0 bg-white/98 backdrop-blur-2xl z-40 lg:hidden transition-all duration-500 flex flex-col justify-between p-8 pt-32 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
          }`}
        >
          <div className="space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Navegação</p>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink 
                  key={item.name}
                  to={item.path} 
                  className={({ isActive }) => `
                    block text-2xl font-bold uppercase tracking-wider transition-colors
                    ${isActive ? 'text-amber-500' : 'text-zinc-600 hover:text-zinc-950'}
                  `}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-zinc-200 space-y-3 pb-8">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full py-4 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
            >
              <HardHat className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Sou Colaborador</span>
            </button>

            <a
              href="https://portal.quattroconstrutora.com.br/cliente"
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap hover:bg-amber-400 transition-colors"
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Portal do Cliente</span>
            </a>
          </div>
        </div>
      </header>

      {/* MODAL DESACOPLADO */}
      <ModalColaborador 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};