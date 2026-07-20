import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-white">QUATTRO</h3>
          <p className="text-sm leading-relaxed">
            Engenharia de alta performance, conduzindo obras com transparência, segurança e Padrão Quattro de Qualidade em todo o Brasil.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">A Empresa</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/quem-somos" className="hover:text-blue-400">Quem Somos</Link></li>
            <li><Link to="/servicos" className="hover:text-blue-400">Nossos Serviços</Link></li>
            <li><Link to="/blog" className="hover:text-blue-400">Blog / Notícias</Link></li>
            <li><Link to="/contato" className="hover:text-blue-400">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Setores</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/setores/hospitalar" className="hover:text-blue-400">Hospitalar</Link></li>
            <li><Link to="/setores/industrial" className="hover:text-blue-400">Industrial & Corporativo</Link></li>
            <li><Link to="/setores/manutencao" className="hover:text-blue-400">Manutenção & Facilities</Link></li>
            <li><Link to="/setores/residencial" className="hover:text-blue-400">Residencial</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Fale Conosco</h4>
          <address className="not-italic text-sm space-y-2">
            <p>Barueri - SP</p>
            <p>Tel: (11) XXXX-XXXX</p>
            <p>contato@quattroconstrutora.com.br</p>
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Quattro Company Construtora e Incorporadora Ltda.</p>
        <p>CNPJ: 13.714.058/0001-49 | Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};