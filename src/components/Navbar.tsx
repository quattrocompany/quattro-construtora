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
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-zinc-950 border-b border-zinc-900 py-4 shadow-xl' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logotipo Grande */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo/logo_quattro-construtora.svg" 
            alt="Quattro Construtora" 
            className="h-16 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Navegação Desktop (Fonte minúscula, separador '|') */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center space-x-2">
            {navItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `
                    text-[10px] font-medium uppercase tracking-[0.25em] px-4 py-2 transition-colors duration-300
                    ${isActive ? 'text-amber-500' : 'text-zinc-300 hover:text-white'}
                  `}
                >
                  {item.name}
                </NavLink>
                {index < navItems.length - 1 && (
                  <span className="text-zinc-700/50 text-[10px] font-light">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <Link 
            to="/contato" 
            className="ml-8 px-8 py-3 rounded-full border border-amber-500/50 text-amber-500 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300"
          >
            Contato
          </Link>
        </nav>

        {/* Botão Mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-white p-2"
        >
          {isMenuOpen ? <X className="w-8 h-8 stroke-[1]" /> : <Menu className="w-8 h-8 stroke-[1]" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-900 px-8 py-8 space-y-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              onClick={() => setIsMenuOpen(false)} 
              className="block text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-300 hover:text-amber-500"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};