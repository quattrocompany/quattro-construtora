// src/components/Header.tsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, User, HardHat } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'A Quattro', path: '/quem-somos' },
    { name: 'Setores & Obras', path: '/setores' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header className="header-bar">
      <div className="header-container">
        
        {/* LOGO COLADA NO TETO (SEM BORDAS OU CAIXA CINZA) */}
        <Link to="/" className="logo-hanging" aria-label="Quattro Construtora - Home">
          <img
            src="/logo/Logo_Quattro Construtora_cut.svg"
            alt="Quattro Construtora"
          />
        </Link>

        {/* MENU INTER MEDIUM ALINHADO À DIREITA */}
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

        {/* BOTÃO AMRELO RETANGULAR ALTURA COMPLETA */}
        <a
          href="https://portal.quattroconstrutora.com.br/cliente"
          target="_blank"
          rel="noreferrer"
          className="btn-header-cta"
        >
          <span>Portal Cliente</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        {/* TOGGLE MOBILE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2 rounded-lg bg-zinc-900 border border-zinc-800 ml-auto"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* OVERLAY MENU MOBILE */}
      <div 
        className={`fixed inset-0 bg-zinc-950/98 backdrop-blur-2xl z-40 lg:hidden transition-all duration-300 flex flex-col justify-between p-8 pt-24 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 font-['Montserrat']">Navegação</p>
          <nav className="flex flex-col gap-4 font-sans font-medium">
            {navItems.map((item) => (
              <NavLink 
                key={item.name}
                to={item.path} 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  block text-xl uppercase tracking-wider transition-colors
                  ${isActive ? 'text-amber-500' : 'text-zinc-200 hover:text-white'}
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-zinc-900 space-y-3 pb-8">
          <a
            href="https://portal.quattroconstrutora.com.br/cliente"
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 font-['Montserrat']"
          >
            <User className="w-4 h-4" />
            <span>Portal do Cliente</span>
          </a>

          <a
            href="https://portal.quattroconstrutora.com.br/colaborador"
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 font-['Montserrat']"
          >
            <HardHat className="w-4 h-4" />
            <span>Portal do Colaborador</span>
          </a>
        </div>
      </div>
    </header>
  );
};