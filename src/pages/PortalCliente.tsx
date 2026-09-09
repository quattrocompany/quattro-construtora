// src/pages/PortalCliente.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, ArrowLeft, Construction } from 'lucide-react';

export const PortalCliente: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-['Montserrat'] flex items-center justify-center p-6 selection:bg-amber-500 selection:text-zinc-950">
      <div className="max-w-xl w-full text-center space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shadow-xl shadow-amber-500/5">
            <Construction className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
              Área Restrita
            </span>
            <h1 className="text-[2.3rem] font-extrabold text-white leading-[1.12] tracking-tight">
              Portal do Cliente em Construção
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans font-normal leading-relaxed max-w-md mx-auto">
              Estamos desenvolvendo uma nova experiência digital para acompanhamento de obras, medições e documentos com a precisão do Padrão Quattro.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para a Home</span>
            </Link>
            
            <Link
              to="/contato"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <HardHat className="w-4 h-4 text-amber-500" />
              <span>Fale Conosco</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalCliente;