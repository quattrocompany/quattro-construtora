// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, HardHat, User } from 'lucide-react';
import { ModalColaborador } from './ModalColaborador';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // UX Hook: Fecha o drawer mobile automaticamente ao navegar para uma nova rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Performance Scroll Listener (Listener passivo para 60fps constantes)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans ${
          isScrolled
            ? 'bg-[#202020]/95 backdrop-blur-md shadow-2xl'
            : 'bg-gradient-to-b from-[#353535]/90 via-[#353535]/40 to-transparent'
        }`}
      >
        {/* CONTAINER MESTRE A 1440PX */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative">
          
          {/* LOGO CORTE Y = 0 */}
          <Link 
            to="/" 
            className="absolute top-0 left-6 md:left-12 z-50 focus:outline-none group block m-0 p-0"
            aria-label="Quattro Construtora - Página Inicial"
          >
            <img 
              src="/logo/Logo_Quattro Construtora_cut.svg" 
              alt="Quattro Construtora" 
              className="h-16 md:h-20 lg:h-24 w-auto object-contain object-top block drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* BARRA DE NAVEGAÇÃO */}
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'py-3' : 'py-5'
          }`}>
            
            {/* Espaçador Proporcional para não colidir com o Logo */}
            <div className="w-32 md:w-44 lg:w-48 xl:w-56 h-8 shrink-0" />

            {/* NAV DESKTOP */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8" aria-label="Navegação Principal">
              <div className="flex items-center gap-3 xl:gap-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => `
                      text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.16em] xl:tracking-[0.2em] whitespace-nowrap transition-all duration-300 relative py-2
                      after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300
                      ${isActive ? 'text-amber-500 after:w-full' : 'text-zinc-300 hover:text-white hover:after:w-1/2'}
                    `}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* BOTÕES DE ACESSO */}
              <div className="flex items-center gap-3 xl:gap-4 pl-4 xl:pl-8 border-l border-zinc-800/80">
                
                {/* BOTÃO SOU COLABORADOR */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3.5 xl:px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-amber-500 hover:border-amber-500/40 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50 shrink-0"
                >
                  <HardHat className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Sou Colaborador</span>
                </button>

                {/* BOTÃO PORTAL DO CLIENTE */}
                <a
                  href="https://portal.quattroconstrutora.com.br/cliente"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 xl:px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center gap-2 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shrink-0"
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span>Portal do Cliente</span>
                </a>

              </div>
            </nav>

            {/* TOGGLE HAMBÚRGUER MOBILE */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2.5 focus:outline-none z-50 rounded-xl bg-zinc-900 border border-zinc-800"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* DRAWER MOBILE OVERLAY */}
        <div 
          className={`fixed inset-0 bg-zinc-950/98 backdrop-blur-2xl z-40 lg:hidden transition-all duration-500 flex flex-col justify-between p-8 pt-32 ${
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
                    ${isActive ? 'text-amber-500' : 'text-zinc-200 hover:text-white'}
                  `}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-zinc-900 space-y-3 pb-8">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <HardHat className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Sou Colaborador</span>
            </button>

            <a
              href="https://portal.quattroconstrutora.com.br/cliente"
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Portal do Cliente</span>
            </a>
          </div>
        </div>
      </header>

      {/* COMPONENTE MODAL DESACOPLADO E OTIMIZADO */}
      <ModalColaborador 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};