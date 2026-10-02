// src/lib/scrollEffects.tsx
// Efeitos de rolagem do site público: elementos entram suavemente ao aparecer na tela
// e uma barra fina mostra o progresso da leitura. Respeita "reduzir movimento" do sistema.
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ALVOS = [
  'section h2',
  'section blockquote',
  'section .grid > *',
  '.approach-card',
  '.metrics-card',
  '.about-mosaic-seal-card',
  '.about-mosaic-container > div',
  'section form',
  'article > *',
].join(',');

export const ScrollEffects: React.FC = () => {
  const { pathname } = useLocation();
  const [progresso, setProgresso] = useState(0);
  const admin = pathname.startsWith('/admin');

  // Barra de progresso de leitura
  useEffect(() => {
    if (admin) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgresso(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [admin, pathname]);

  // Entrada dos elementos ao rolar
  useEffect(() => {
    if (admin) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const main = document.querySelector('main');
    if (!main) return;
    const primeiraSecao = main.querySelector('section');
    const vistos = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          el.classList.add('reveal-in');
          window.setTimeout(() => {
            el.classList.remove('reveal-in');
            el.removeAttribute('data-reveal');
            el.style.removeProperty('--reveal-delay');
          }, 1400);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    const marcar = () => {
      main.querySelectorAll(ALVOS).forEach((el) => {
        if (vistos.has(el)) return;
        vistos.add(el);
        // não anima o banner do topo da página, nem itens dentro de outro item já animado
        if (primeiraSecao && primeiraSecao.contains(el)) return;
        if (el.parentElement?.closest('[data-reveal]')) return;
        if (el.closest('[data-sequencia]')) return; // tem animação própria
        const irmaos = el.parentElement ? Array.from(el.parentElement.children) : [];
        const i = Math.max(0, irmaos.indexOf(el));
        (el as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(i, 5) * 90}ms`);
        el.setAttribute('data-reveal', '');
        io.observe(el);
      });
    };

    marcar();
    // conteúdo que chega depois (ex.: textos vindos do Firestore)
    let t: number | undefined;
    const mo = new MutationObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(marcar, 150);
    });
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname, admin]);

  if (admin) return null;
  return <div className="scroll-progress" style={{ transform: `scaleX(${progresso})` }} aria-hidden="true" />;
};
