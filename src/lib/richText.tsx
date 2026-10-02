// src/lib/richText.tsx
import React from 'react';

/** Transforma **trecho** em negrito. Todo o resto vira texto comum (nunca HTML). */
export const comNegrito = (texto: string, classeNegrito = 'text-zinc-950 font-semibold'): React.ReactNode[] =>
  String(texto ?? '')
    .split('**')
    .map((parte, i) =>
      i % 2 === 1 ? (
        <strong key={i} className={classeNegrito}>
          {parte}
        </strong>
      ) : (
        <React.Fragment key={i}>{parte}</React.Fragment>
      )
    );
