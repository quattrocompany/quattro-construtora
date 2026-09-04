// src/utils/formatHeroTitle.tsx
import React from 'react';

export const formatHeroTitle = (text: string) => {
  if (!text) return null;

  // Divide o texto onde houver *palavra*
  const parts = text.split(/(\*.*?\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          const content = part.slice(1, -1); // Remove os asteriscos

          return (
            <span key={i} className="relative inline-block bg-amber-500 text-zinc-950 px-3.5 pt-1.5 pb-1 rounded-t-2xl rounded-br-2xl font-black leading-none z-10 my-1 mx-1">
              {content}
              {/* Curva Fillet Côncava no canto inferior esquerdo */}
              <svg 
                className="absolute bottom-0 -left-4 w-4 h-4 text-amber-500 fill-current pointer-events-none" 
                viewBox="0 0 16 16"
              >
                <path d="M 16 0 V 16 H 0 A 16 16 0 0 0 16 0 Z" />
              </svg>
            </span>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
};