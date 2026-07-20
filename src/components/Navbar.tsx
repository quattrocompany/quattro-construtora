import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, HardHat, Users } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all">
      {/* Topbar Corporativa */}
      <div className="hidden lg:flex bg-slate-900 text-slate-300 text-xs py-1.5 px-6 justify-end gap-6">
        <a href="https://portal.quattroconstrutora.com.br/cliente" target="_blank" className="hover:text-white flex items-center gap-1.5 transition-colors">
          <Users className="w-3 h-3" /> Portal do Cliente
        </a>
        <a href="https://portal.quattroconstrutora.com.br/colaborador" target="_blank" className="hover:text-white flex items-center gap-1.5 transition-colors">
          <HardHat className="w-3 h-3" /> Portal do Colaborador
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo - Recomendado usar a imagem real do logo aqui */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
            Quattro
          </span>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mt-1 border-l-2 border-blue-600 pl-2">
            Construtora
          </span>
        </Link>

        {/* Navegação Principal */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600" : "hover:text-blue-600 transition-colors"}>Home</NavLink>
          <NavLink to="/quem-somos" className={({isActive}) => isActive ? "text-blue-600" : "hover:text-blue-600 transition-colors"}>Quem Somos</NavLink>
          <NavLink to="/servicos" className={({isActive}) => isActive ? "text-blue-600" : "hover:text-blue-600 transition-colors"}>Serviços</NavLink>
          
          {/* Dropdown Setores */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2">
              Setores <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-48 bg-white border border-slate-100 shadow-xl rounded-lg py-2 flex flex-col">
                <Link to="/setores/hospitalar" className="px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors">Hospitalar</Link>
                <Link to="/setores/industrial" className="px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors">Industrial</Link>
                <Link to="/setores/manutencao" className="px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors">Manutenção</Link>
                <Link to="/setores/residencial" className="px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition-colors">Residencial</Link>
              </div>
            )}
          </div>

          <NavLink to="/blog" className={({isActive}) => isActive ? "text-blue-600" : "hover:text-blue-600 transition-colors"}>Blog</NavLink>
          <NavLink to="/contato" className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md">
            Contato
          </NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="lg:hidden absolute top-full w-full bg-white border-b border-slate-200 shadow-xl flex flex-col p-4 space-y-3 font-medium text-slate-700">
           {/* Links mobile omitidos por brevidade, seguiriam o mesmo padrão */}
        </div>
      )}
    </header>
  );
};