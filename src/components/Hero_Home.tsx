import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteDoc } from '../lib/siteContent';
import { DEFAULT_HOME } from '../data/siteDefaults';

const Botao: React.FC<{ to: string; className: string; children: React.ReactNode }> = ({ to, className, children }) =>
  /^https?:\/\//i.test(to) ? (
    <a href={to} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <Link to={to || '/contato'} className={className}>{children}</Link>
  );

export const Hero_Home: React.FC = () => {
  const { hero } = useSiteDoc('home', DEFAULT_HOME);
  const todos = hero.mediaList.length ? hero.mediaList : DEFAULT_HOME.hero.mediaList;
  const mode = hero.mode;
  // "Imagem única" e "Vídeo em destaque" mostram um só slide; o carrossel mostra todos.
  const slides =
    mode === 'carousel' ? todos : [mode === 'video' ? todos.find((m) => m.type === 'video') || todos[0] : todos[0]];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= slides.length) setCurrentIndex(0);
  }, [slides.length, currentIndex]);

  useEffect(() => {
    if (mode !== 'carousel' || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mode, slides.length]);

  const atual = slides[Math.min(currentIndex, slides.length - 1)];

  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-zinc-950 text-white pt-36 md:pt-44 pb-16 overflow-hidden border-b border-zinc-800 font-['Montserrat',sans-serif]">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {slides.map((media, index) => (
          <div
            key={media.id ?? index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {media.type === 'video' ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover object-center">
                <source src={media.desktopUrl} type="video/mp4" />
              </video>
            ) : (
              <picture>
                {media.mobileUrl && <source media="(max-width: 767px)" srcSet={media.mobileUrl} />}
                <img src={media.desktopUrl} alt="Quattro Construtora" className="w-full h-full object-cover object-center" />
              </picture>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_right,black_60%,transparent_100%)] z-10 pointer-events-none" />

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-between min-h-[50vh]">
        <div key={atual.id ?? currentIndex} className="max-w-2xl space-y-6 mt-8 sm:mt-12 mb-auto animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.15]">
            {atual.line0 && (<>{atual.line0} <br /></>)}
            <span className="inline-flex flex-col items-start my-1.5">
              <span className="inline-flex items-center">
                {atual.line1BeforeHighlight && <span className="mr-3 text-white">{atual.line1BeforeHighlight}</span>}
                {atual.highlightPart1 && (
                  <span className="relative bg-amber-500 text-zinc-950 px-3.5 pt-1.5 pb-1 rounded-t-2xl leading-none font-extrabold z-10">
                    {atual.highlightPart1}
                    <svg className="absolute bottom-0 -left-4 w-4 h-4 text-amber-500 fill-current pointer-events-none" viewBox="0 0 16 16">
                      <path d="M 16 0 V 16 H 0 A 16 16 0 0 0 16 0 Z" />
                    </svg>
                  </span>
                )}
              </span>
              {atual.highlightPart2 && (
                <span className="bg-amber-500 text-zinc-950 px-3.5 pt-1 pb-2 rounded-2xl leading-none font-extrabold z-0 relative -mt-px">
                  {atual.highlightPart2}
                </span>
              )}
            </span> <br />
            {atual.line3AfterHighlight}
          </h1>

          {atual.slideDesc && (
            <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed font-sans max-w-xl">{atual.slideDesc}</p>
          )}

          {atual.ctaText && (
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Botao to={atual.ctaLink} className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl group">
                <span>{atual.ctaText}</span>
                <div className="w-6 h-6 bg-zinc-950/10 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Botao>
            </div>
          )}
        </div>

        {mode === 'carousel' && slides.length > 1 && (
          <div className="flex items-center gap-2 pt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  index === currentIndex ? 'w-10 bg-amber-500' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
