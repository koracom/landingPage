import * as React from 'react';

/**
 * Bloque le scroll du document tant que `locked` est vrai.
 * Compense la largeur de la scrollbar pour eviter un saut de layout.
 */
export const useLockBodyScroll = (locked: boolean) => {
  React.useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
};
