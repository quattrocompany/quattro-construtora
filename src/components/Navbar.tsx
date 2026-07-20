import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efeito para detectar o scroll da página (Navbar transparente -> Sólida)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-zinc-950/90 backdrop-blur-md border-zinc-800 py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGOTIPO (Carregando o SVG da pasta public) */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo/logo_quattro-construtora.svg" 
            alt="Quattro Construtora" 
            className="h-8 md:h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md"
            onError={(e) => {
              // Fallback em texto caso a imagem falhe (apenas para ambiente de dev)
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden text-2xl font-serif font-black tracking-widest text-white">
            QUATTRO
          </span>
        </Link>

        {/* NAVEGAÇÃO DESKTOP (Tipografia fina, muito espaçamento) */}
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
              className={({isActive}) => `
                text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300
                ${isActive ? 'text-amber-500' : 'text-zinc-300 hover:text-white'}
              `}
            >
              {item.name}
            </NavLink>
          ))}
          
          {/* Botão Call-to-action Minimalista */}
          <Link 
            to="/contato" 
            className="px-6 py-2.5 border border-zinc-600 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-500 hover:border-amber-500 hover:text-zinc-950 transition-all duration-300 ml-4"
          >
            Contato
          </Link>
        </nav>

        {/* MENU MOBILE TOGGLE */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-white p-2"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* OVERLAY MOBILE */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col px-6 py-6 space-y-6">
           <Link to="/" className="text-sm font-bold uppercase tracking-widest text-white">Home</Link>
           <Link to="/quem-somos" className="text-sm font-bold uppercase tracking-widest text-white">Quem Somos</Link>
           <Link to="/servicos" className="text-sm font-bold uppercase tracking-widest text-white">Serviços</Link>
           <Link to="/contato" className="text-sm font-bold uppercase tracking-widest text-amber-500">Contato</Link>
        </div>
      </div>
    </header>
  );
};