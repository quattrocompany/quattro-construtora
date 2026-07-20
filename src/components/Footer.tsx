import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight,
  User,
  HardHat
} from 'lucide-react';

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 font-sans border-t border-zinc-900 relative overflow-hidden">
      
      {/* Marca d'água de fundo */}
      <div className="absolute -bottom-10 right-0 opacity-5 pointer-events-none select-none text-right font-bold text-[180px] tracking-tighter text-white leading-none">
        QUATTRO
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* COLUNA 1: LOGO LIMPO (SEM MOLDURA CINZA) */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/logo/Logo_Quattro Construtora_cut.svg" 
                alt="Quattro Construtora" 
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Engenharia de precisão, flexibilidade técnica e inovação. Construindo soluções de alta performance para o setor corporativo, industrial, hospitalar e residencial em todo o Brasil.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: <FacebookIcon />, href: 'https://facebook.com', label: 'Facebook' },
                { icon: <InstagramIcon />, href: 'https://instagram.com', label: 'Instagram' },
                { icon: <LinkedinIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <YoutubeIcon />, href: 'https://youtube.com', label: 'YouTube' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500/40 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUNA 2: Navegação */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">Navegação</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/quem-somos" className="hover:text-amber-500 transition-colors">A Construtora</Link></li>
              <li><Link to="/setores" className="hover:text-amber-500 transition-colors">Setores de Atuação</Link></li>
              <li><Link to="/servicos" className="hover:text-amber-500 transition-colors">Engenharia & Serviços</Link></li>
              <li><Link to="/blog" className="hover:text-amber-500 transition-colors">Notícias & Blog</Link></li>
              <li><Link to="/contato" className="hover:text-amber-500 transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* COLUNA 3: Setores */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">Setores</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li><Link to="/setores/industrial" className="hover:text-amber-500 transition-colors">Industrial & Logística</Link></li>
              <li><Link to="/setores/hospitalar" className="hover:text-amber-500 transition-colors">Setor Hospitalar</Link></li>
              <li><Link to="/setores/manutencao" className="hover:text-amber-500 transition-colors">Manutenção & Facilities</Link></li>
              <li><Link to="/setores/residencial" className="hover:text-amber-500 transition-colors">Residencial de Luxo</Link></li>
            </ul>
          </div>

          {/* COLUNA 4: Atendimento & Portais */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white">Atendimento</h4>
            <div className="space-y-3 text-xs font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Barueri – SP | Atendimento Nacional</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+55 (11) 4003-0000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contato@quattroconstrutora.com.br</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <a 
                href="https://portal.quattroconstrutora.com.br/cliente" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-amber-500 font-semibold hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>Portal do Cliente</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a 
                href="https://portal.quattroconstrutora.com.br/colaborador" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-semibold hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center gap-2">
                  <HardHat className="w-3.5 h-3.5 text-amber-500" />
                  <span>Portal do Colaborador</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light text-zinc-500">
          <p>© {new Date().getFullYear()} Quattro Construtora. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacidade" className="hover:text-amber-500 transition-colors">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-amber-500 transition-colors">Termos de Uso</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};