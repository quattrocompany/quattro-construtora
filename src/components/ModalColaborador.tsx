// src/components/ModalColaborador.tsx
import React, { useEffect, useCallback } from 'react';
import { X, Laptop, Truck, ArrowUpRight } from 'lucide-react';

export interface ModalColaboradorProps {
  /** Controla o estado de visibilidade do modal */
  isOpen: boolean;
  /** Callback para fechamento do modal */
  onClose: () => void;
}

export const ModalColaborador: React.FC<ModalColaboradorProps> = ({ isOpen, onClose }) => {
  // 1. Fechamento via Tecla ESC (Acessibilidade WCAG)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // 2. Ciclo de Vida: Trava do Scroll do Body + Event Listeners
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-colaborador-title"
    >
      {/* CARD DO MODAL (GLASSMORPHISM DARK) */}
      <div
        className="bg-zinc-900/95 border border-zinc-800 rounded-3xl max-w-lg w-full p-8 md:p-10 relative shadow-2xl transition-transform duration-300 scale-100 text-center animate-in zoom-in-95 overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no interior do card
      >
        {/* Detalhe Superior Ouro (#fbb03b) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />

        {/* Botão Fechar [X] */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          aria-label="Fechar Modal de Acesso"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* LOGO INSTITUCIONAL COMPLETO */}
        <div className="flex justify-center mb-6 pt-2">
          <img
            src="/logo/logo_quattro-construtora.svg"
            alt="Quattro Construtora"
            className="w-[calc(var(--spacing)*40)] h-auto object-contain"
          />
        </div>

        {/* Título com Quebra de Linha Balanceada */}
        <h3
          id="modal-colaborador-title"
          className="text-zinc-200 text-base md:text-lg font-light leading-relaxed mb-8 max-w-sm mx-auto text-balance"
        >
          Caro Colaborador, selecione o portal de acesso desejado:
        </h3>

        {/* GRID DOS CARDS DE ACESSO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* PORTAL DE TI */}
          <a
            href="http://177.126.7.42:3391/"
            target="_blank"
            rel="noreferrer"
            className="group p-5 bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 rounded-2xl transition-all duration-300 flex flex-col items-center text-center justify-between hover:-translate-y-1 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <div className="p-3 bg-zinc-900 group-hover:bg-amber-500/10 rounded-xl text-amber-500 transition-colors mb-3">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-white group-hover:text-amber-500 font-bold text-sm uppercase tracking-wider transition-colors">
                <span>TI</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-zinc-500 font-light mt-1">Sistemas & Suporte</p>
            </div>
          </a>

          {/* PORTAL DE FROTAS */}
          <a
            href="http://177.126.7.42:3392/"
            target="_blank"
            rel="noreferrer"
            className="group p-5 bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 rounded-2xl transition-all duration-300 flex flex-col items-center text-center justify-between hover:-translate-y-1 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <div className="p-3 bg-zinc-900 group-hover:bg-amber-500/10 rounded-xl text-amber-500 transition-colors mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-white group-hover:text-amber-500 font-bold text-sm uppercase tracking-wider transition-colors">
                <span>FROTAS</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-zinc-500 font-light mt-1">Gestão de Veículos</p>
            </div>
          </a>

        </div>

      </div>
    </div>
  );
};