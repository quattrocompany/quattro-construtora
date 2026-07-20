import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-500 text-xs py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Quattro Company Construtora e Incorporadora Ltda.</p>
        <p className="text-center md:text-right">CNPJ 13.714.058/0001-49 – Barueri – SP. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};