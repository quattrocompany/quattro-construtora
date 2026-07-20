// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Quem Somos', path: '/quem-somos' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Setores', path: '/setores' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 py-4 shadow-2xl' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-8'
      }`}
    >
      {/* Container expandido estilo Ratio */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        
        {/* LOGOTIPO AMPLIADO E LIMPO */}
        <Link to="/" className="flex items-center group focus:outline-none">
          <img 
            src="/logo/logo_quattro-construtora.svg" 
            alt="Quattro Construtora" 
            className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                target.nextElementSibling.classList.remove('hidden');
              }
            }}
          />
          <span className="hidden text-3xl font-extralight tracking-[0.3em] text-white uppercase font-sans">
            QUATTRO
          </span>
        </Link>

        {/* NAVEGAÇÃO ESTILO RATIO (Fontes minúsculas, caixa alta, espaçamento largo) */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center space-x-1 border-r border-zinc-800/80 pr-6 mr-6">
            {navItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `
                    text-[11px] font-medium uppercase tracking-[0.25em] px-4 py-2 transition-all duration-300 relative
                    ${isActive ? 'text-amber-500 font-semibold' : 'text-zinc-300 hover:text-white'}
                  `}
                >
                  {item.name}
                </NavLink>
                {index < navItems.length - 1 && (
                  <span className="text-zinc-700 text-xs font-light select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Botão de Contato Outline Fino */}
          <Link 
            to="/contato" 
            className="px-6 py-2.5 border border-amber-500/60 text-amber-500 text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-amber-500 hover:text-zinc-950 transition-all duration-500 rounded-sm"
          >
            Contato
          </Link>
        </nav>

        {/* Botão Mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Menu Mobile Minimalista */}
      {isMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-8 py-8 space-y-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              onClick={() => setIsMenuOpen(false)} 
              className="block text-xs font-medium uppercase tracking-[0.25em] text-zinc-200 hover:text-amber-500"
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/contato" 
            onClick={() => setIsMenuOpen(false)} 
            className="inline-block px-6 py-3 border border-amber-500 text-amber-500 text-xs font-semibold uppercase tracking-[0.25em]"
          >
            Contato
          </Link>
        </div>
      )}
    </header>
  );
};