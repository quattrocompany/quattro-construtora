import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight,
  User
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

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      
      {/* Marca d'água de fundo ajustada para menor dimensão */}
      <div className="footer-watermark !text-[110px] md:!text-[130px] -bottom-6">
        QUATTRO
      </div>

      <div className="footer-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* COLUNA 1: LOGO COMPLETO E EXPANDIDO */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block group focus:outline-none">
              <img 
                src="/logo/logo_quattro-construtora.svg" 
                alt="Quattro Construtora" 
                className="h-16 md:h-18 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="footer-text max-w-sm">
              Engenharia de precisão, flexibilidade técnica e inovação. Construindo soluções de alta performance para o setor corporativo, industrial, hospitalar e residencial em todo o Brasil.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: <FacebookIcon />, href: 'https://facebook.com', label: 'Facebook' },
                { icon: <InstagramIcon />, href: 'https://instagram.com', label: 'Instagram' },
                { icon: <YoutubeIcon />, href: 'https://youtube.com', label: 'YouTube' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="footer-social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO */}
          <div className="space-y-5">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/quem-somos" className="footer-link">A Construtora</Link></li>
              <li><Link to="/setores" className="footer-link">Setores de Atuação</Link></li>
              <li><Link to="/servicos" className="footer-link">Engenharia & Serviços</Link></li>
              <li><Link to="/blog" className="footer-link">Notícias & Blog</Link></li>
              <li><Link to="/contato" className="footer-link">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* COLUNA 3: SETORES */}
          <div className="space-y-5">
            <h4 className="footer-col-title">Setores</h4>
            <ul className="footer-list">
              <li><Link to="/setores" className="footer-link">Industrial & Logística</Link></li>
              <li><Link to="/setores" className="footer-link">Setor Corporativo</Link></li>
              <li><Link to="/setores" className="footer-link">Setor Farmacêutico</Link></li>
              <li><Link to="/setores" className="footer-link">Habitação & MCMV</Link></li>
            </ul>
          </div>

          {/* COLUNA 4: ATENDIMENTO & PORTAIS */}
          <div className="space-y-5">
            <h4 className="footer-col-title">Atendimento</h4>
            <div className="footer-list">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/dir/-23.5012724,-46.8485149/Quattro+Construtora,+Al.+Rio+Negro,+503+-+Conj+907+-+Alphaville+Industrial,+Barueri+-+SP,+06454-000/@-23.5017254,-46.8509089,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x94ce574f51a7c4bd:0x6406a5f3e39d192b!2m2!1d-46.8486349!2d-23.5022332?entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-500 transition-colors block"
                >
                  Al. Rio Negro, 503 - Conj 907 - Alphaville Industrial, Barueri/SP - CEP: 06454-000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+55 (11) 4003-0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contato@quattroconstrutora.com.br</span>
              </div>
            </div>

            <div className="pt-3">
              <a 
                href="https://portal.quattroconstrutora.com.br/cliente" 
                target="_blank" 
                rel="noreferrer"
                className="footer-portal-link"
              >
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-amber-500">Portal do Cliente</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom-bar">
          <p className="normal-case">2026 © Quattro Company Construtora e Incorporadora Ltda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacidade" className="footer-link-bottom">Política de Privacidade</Link>
            <Link to="/termos" className="footer-link-bottom">Termos de Uso</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};