// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowRight, 
  User, 
  Mail, 
  Phone 
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'A Quattro', path: '/quem-somos' },
    { name: 'Setores & Obras', path: '/setores' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] font-['Montserrat']">
      {/* 1. BARRINHA SUPERIOR (DESKTOP) */}
      <div className="top-bar hidden lg:block !relative !z-[110]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="mailto:contato@quattroconstrutora.com.br" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-zinc-500 font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              <span>contato@quattroconstrutora.com.br</span>
            </a>
            <a 
              href="tel:11900000000" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-zinc-500 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-500" />
              <span>(11) 90000-0000</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-normal uppercase text-[12px] text-zinc-400">
              Siga nossas redes sociais:
            </span>
            <div className="flex items-center gap-3 text-zinc-900">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="hover:scale-110 transition-transform text-zinc-900"
              >
                <InstagramIcon className="w-4 h-4 fill-zinc-900 text-zinc-900" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="hover:scale-110 transition-transform text-zinc-900"
              >
                <FacebookIcon className="w-4 h-4 fill-zinc-900 text-zinc-900" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="hover:scale-110 transition-transform text-zinc-900"
              >
                <YoutubeIcon className="w-4 h-4 fill-zinc-900 text-zinc-900" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE NAVEGAÇÃO PRINCIPAL */}
      <div className={`header-bar !relative !z-[60] ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container !relative !z-[60]">
          <Link to="/" className="logo-hanging !relative !z-[70]" aria-label="Quattro Construtora - Home">
            <img
              src="/logo/Logo_Quattro Construtora_cut.svg"
              alt="Quattro Construtora"
            />
          </Link>

          <nav className="nav-menu" aria-label="Navegação Principal">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <a
            href="https://portal.quattroconstrutora.com.br/cliente"
            target="_blank"
            rel="noreferrer"
            className="btn-header-cta"
          >
            <span>Portal Cliente</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-zinc-900 p-2 rounded-lg bg-transparent hover:bg-zinc-200/50 border-none outline-none ml-auto transition-colors focus:outline-none !relative !z-[70] cursor-pointer"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-zinc-950" /> : <Menu className="w-6 h-6 text-zinc-950" />}
          </button>
        </div>
      </div>

      {/* 3. OVERLAY MENU MOBILE / IPAD */}
      <div 
        className={`fixed inset-0 !z-[50] lg:hidden transition-all duration-300 flex flex-col justify-between pt-24 p-6 md:p-8 h-[100dvh] overflow-y-auto bg-zinc-100/95 backdrop-blur-2xl font-['Montserrat'] ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="pt-6 font-medium">
          <nav className="flex flex-col gap-3 font-medium">
            {navItems.map((item) => (
              <NavLink 
                key={item.name}
                to={item.path} 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  block text-lg md:text-xl uppercase tracking-wider transition-colors
                  ${isActive ? 'text-amber-500 font-bold' : 'text-zinc-900 hover:text-amber-500'}
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-zinc-200/80 space-y-6 mt-6">
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">ATENDIMENTO</p>
            <div className="flex flex-col gap-2.5 text-xs text-zinc-800 font-medium">
              <a href="mailto:contato@quattroconstrutora.com.br" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contato@quattroconstrutora.com.br</span>
              </a>
              <a href="tel:11900000000" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>(11) 90000-0000</span>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="https://portal.quattroconstrutora.com.br/cliente"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Portal do Cliente</span>
            </a>

            <div className="flex items-center justify-center gap-6 pt-3 text-zinc-900">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="hover:scale-110 transition-transform p-1 text-zinc-900"
              >
                <InstagramIcon className="w-5 h-5 fill-zinc-900" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="hover:scale-110 transition-transform p-1 text-zinc-900"
              >
                <FacebookIcon className="w-5 h-5 fill-zinc-900" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="hover:scale-110 transition-transform p-1 text-zinc-900"
              >
                <YoutubeIcon className="w-5 h-5 fill-zinc-900" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};