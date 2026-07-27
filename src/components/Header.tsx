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
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, isMenuOpen, handleKeyDown]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'A Quattro', path: '/quem-somos' },
    { name: 'Setores & Obras', path: '/setores' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 font-sans ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-zinc-200'
            : 'bg-zinc-950/50 backdrop-blur-sm border-b border-white/5'
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
                          ? 'text-zinc-600 hover:text-zinc-950 hover:after:w-1/2'
                          : 'text-zinc-300 hover:text-white hover:after:w-1/2'
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
              onClick={() => setIsMenuOpen(true)}
              className={`lg:hidden p-2.5 focus:outline-none z-50 rounded-xl border transition-colors ${
                isScrolled
                  ? 'text-zinc-900 bg-zinc-50 border-zinc-200'
                  : 'text-white bg-zinc-900/60 border-zinc-700'
              }`}
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER MOBILE OVERLAY TELA CHEIA (SEM MARGEM SUPERIOR E LOGO TOTALMENTE COLADO AO TOPO) */}
      <div 
        className={`fixed inset-0 w-screen h-screen min-h-screen bg-zinc-100 z-[100] lg:hidden transition-all duration-300 flex flex-col justify-between px-6 pt-0 pb-6 sm:px-10 overflow-y-auto ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* TOPO DO MENU MOBILE (0px MARGEM DO TOPO) */}
        <div className="relative w-full max-w-[1440px] mx-auto flex items-start justify-center p-0 m-0 leading-none">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block p-0 m-0 focus:outline-none">
            <img 
              src="/logo/Logo_Quattro Construtora_cut.svg" 
              alt="Quattro Construtora" 
              className="h-20 sm:h-24 w-auto object-contain object-top block p-0 m-0"
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute right-0 top-3 p-3 rounded-2xl bg-white border border-zinc-200 text-zinc-900 shadow-sm focus:outline-none active:scale-95 transition-transform cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* NAVEGAÇÃO CENTRALIZADA VERTICALMENTE (APENAS O MENU DE TEXTOS) */}
        <div className="my-auto py-2 flex flex-col items-center justify-center text-center space-y-6 w-full max-w-md mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 font-['Montserrat',sans-serif]">
            Navegação
          </span>
          
          <nav className="flex flex-col items-center gap-3 sm:gap-4 w-full font-['Montserrat',sans-serif]">
            {navItems.map((item) => (
              <NavLink 
                key={item.name}
                to={item.path} 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  text-2xl sm:text-3xl font-extrabold uppercase tracking-wider transition-colors
                  ${isActive ? 'text-amber-600' : 'text-zinc-800 hover:text-zinc-950'}
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* RODAPÉ DO MENU MOBILE: REDES SOCIAIS -> BOTÕES -> COPYRIGHT */}
        <div className="w-full max-w-md mx-auto space-y-4 pt-2 text-center font-['Montserrat',sans-serif]">
          
          {/* 1. REDES SOCIAIS */}
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com/quattroconstrutora"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-amber-600 hover:border-amber-500 transition-colors shadow-sm cursor-pointer"
              aria-label="Instagram Quattro Construtora"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/quattroconstrutora"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-amber-600 hover:border-amber-500 transition-colors shadow-sm cursor-pointer"
              aria-label="LinkedIn Quattro Construtora"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/quattroconstrutora"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-amber-600 hover:border-amber-500 transition-colors shadow-sm cursor-pointer"
              aria-label="Facebook Quattro Construtora"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
              </svg>
            </a>
          </div>

          {/* 2. BOTÕES DE ACESSO */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full py-3.5 rounded-xl bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-50 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer font-['Montserrat',sans-serif]"
            >
              <HardHat className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Sou Colaborador</span>
            </button>

            <a
              href="https://portal.quattroconstrutora.com.br/cliente"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors font-['Montserrat',sans-serif]"
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Portal do Cliente</span>
            </a>
          </div>

          {/* 3. COPYRIGHT */}
          <p className="text-[8px] tracking-normal text-zinc-500 font-normal pt-1">
            © Quattro Company Construtora e Incorporadora Ltda. Todos os direitos reservados
          </p>
        </div>
      </div>

      {/* MODAL DESACOPLADO */}
      <ModalColaborador 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};