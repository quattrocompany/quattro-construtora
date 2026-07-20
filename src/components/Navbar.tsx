// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  HardHat, 
  Menu, 
  X,
  Search
} from 'lucide-react';

// Componentes SVG Inline para as Marcas (Garante compilação e zero dependências extras)
const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

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
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-500 font-sans">
      
      {/* ========================================================= */}
      {/* 1. TOP BAR (RÉGUA SUPERIOR - ESTILO RATIO)              */}
      {/* ========================================================= */}
      <div className="bg-zinc-950/90 border-b border-zinc-800/50 py-2 px-6 md:px-12 backdrop-blur-md">
        <div className="max-w-[1800px] mx-auto flex flex-wrap items-center justify-between text-[11px] text-zinc-400 font-light tracking-wider">
          
          {/* LADO ESQUERDO: E-mail + Redes Sociais */}
          <div className="flex items-center space-x-4">
            <a 
              href="mailto:contato@quattroconstrutora.com.br" 
              className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-amber-500/80" />
              <span>contato@quattroconstrutora.com.br</span>
            </a>

            <span className="text-zinc-800 select-none">|</span>

            <div className="flex items-center space-x-3 text-zinc-400">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-amber-500 transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-amber-500 transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-amber-500 transition-colors">
                <LinkedinIcon />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-amber-500 transition-colors">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* LADO DIREITO: Telefone + Localização + Portais */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-amber-500/80" />
              <span>+55 (11) 4003-0000</span>
            </div>

            <span className="text-zinc-800 select-none">|</span>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-amber-500/80" />
              <span>Barueri – SP</span>
            </div>

            <span className="text-zinc-800 select-none">|</span>

            {/* Links minimalistas para Portais */}
            <div className="flex items-center space-x-3">
              <a 
                href="https://portal.quattroconstrutora.com.br/cliente" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-amber-500 transition-colors flex items-center gap-1 font-normal uppercase text-[10px] tracking-widest text-zinc-300"
              >
                <User className="w-3 h-3 text-amber-500" />
                <span>Clientes</span>
              </a>

              <a 
                href="https://portal.quattroconstrutora.com.br/colaborador" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-amber-500 transition-colors flex items-center gap-1 font-normal uppercase text-[10px] tracking-widest text-zinc-300"
              >
                <HardHat className="w-3 h-3 text-amber-500" />
                <span>Colaboradores</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN NAVBAR                                            */}
      {/* ========================================================= */}
      <div 
        className={`transition-all duration-500 py-3 px-6 md:px-12 ${
          isScrolled 
            ? 'bg-zinc-950/95 border-b border-zinc-900/80 shadow-2xl backdrop-blur-md' 
            : 'bg-gradient-to-b from-zinc-950/80 to-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          
          {/* LOGO BOX INTEGRO */}
          <Link to="/" className="flex items-center focus:outline-none">
            <div className="bg-zinc-900/90 border border-zinc-800/80 px-3 py-2 rounded shadow-xl hover:border-amber-500/40 transition-colors">
              <img 
                src="/logo/logo_quattro-construtora.svg" 
                alt="Quattro Construtora" 
                className="h-9 md:h-11 w-auto object-contain"
              />
            </div>
          </Link>

          {/* MENU DESKTOP RATIO STYLE */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `
                      text-[11px] font-medium uppercase tracking-[0.25em] px-4 py-2 transition-all duration-300
                      ${isActive ? 'text-amber-500 font-semibold' : 'text-zinc-300 hover:text-white'}
                    `}
                  >
                    {item.name}
                  </NavLink>
                  {index < navItems.length - 1 && (
                    <span className="text-zinc-800 text-xs font-light select-none">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Ícone de Busca */}
            <button className="ml-6 p-2 text-zinc-400 hover:text-amber-500 transition-colors focus:outline-none">
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>
          </nav>

          {/* TOGGLE MOBILE */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-7 h-7 stroke-[1]" /> : <Menu className="w-7 h-7 stroke-[1]" />}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MENU MOBILE DRAWER                                     */}
      {/* ========================================================= */}
      {isMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 backdrop-blur-xl border-b border-zinc-900 px-6 py-8 space-y-6">
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                onClick={() => setIsMenuOpen(false)} 
                className="block text-xs font-medium uppercase tracking-[0.25em] text-zinc-200 hover:text-amber-500 py-1"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3 text-xs">
            <a
              href="https://portal.quattroconstrutora.com.br/cliente"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 text-center rounded bg-zinc-900 border border-zinc-800 text-amber-500 font-semibold uppercase tracking-wider"
            >
              Portal do Cliente
            </a>
            <a
              href="https://portal.quattroconstrutora.com.br/colaborador"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 text-center rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold uppercase tracking-wider"
            >
              Portal do Colaborador
            </a>
          </div>
        </div>
      )}
    </header>
  );
};