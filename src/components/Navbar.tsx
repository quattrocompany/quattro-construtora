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

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-zinc-950/90 backdrop-blur-md border-zinc-800/80 py-4 shadow-2xl' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logotipo SVG vindo de public/logo/ */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo/logo_quattro-construtora.svg" 
            alt="Quattro Construtora" 
            className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback visual caso o SVG não esteja na pasta
              const target = e.currentTarget;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                target.nextElementSibling.classList.remove('hidden');
              }
            }}
          />
          <span className="hidden text-2xl font-black tracking-widest text-white font-serif">
            QUATTRO
          </span>
        </Link>

        {/* Navegação Desktop Estilo Ratio */}
        <nav className="hidden lg:flex items-center gap-10">
          {[
            { name: 'Home', path: '/' },
            { name: 'Quem Somos', path: '/quem-somos' },
            { name: 'Serviços', path: '/servicos' },
            { name: 'Setores', path: '/setores' },
          ].map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              className={({ isActive }) => `
                text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 relative py-1
                ${isActive ? 'text-amber-500' : 'text-zinc-300 hover:text-white'}
              `}
            >
              {item.name}
            </NavLink>
          ))}
          
          <Link 
            to="/contato" 
            className="px-6 py-2.5 border border-amber-500/40 text-amber-500 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300 ml-4 rounded-sm"
          >
            Contato
          </Link>
        </nav>

        {/* Botão Mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-white p-2 focus:outline-none"
          aria-label="Abrir Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-8 space-y-6">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-sm font-bold uppercase tracking-widest text-white">Home</Link>
          <Link to="/quem-somos" onClick={() => setIsMenuOpen(false)} className="block text-sm font-bold uppercase tracking-widest text-zinc-300">Quem Somos</Link>
          <Link to="/servicos" onClick={() => setIsMenuOpen(false)} className="block text-sm font-bold uppercase tracking-widest text-zinc-300">Serviços</Link>
          <Link to="/contato" onClick={() => setIsMenuOpen(false)} className="block text-sm font-bold uppercase tracking-widest text-amber-500">Contato</Link>
        </div>
      )}
    </header>
  );
};