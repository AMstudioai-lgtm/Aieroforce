import React from 'react';
import { SneakerItem } from '../types';

interface SplitBackgroundProps {
  currentSneaker: SneakerItem;
}

export const SplitBackground: React.FC<SplitBackgroundProps> = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* 
        ZONE IMAGE / FOND SOBRE :
        - Mobile : Trois Quart Haut (h-[75%] top-0)
        - Desktop : Moitié Droite (md:w-1/2 md:h-full md:left-1/2 md:top-0)
      */}
      <div className="absolute inset-x-0 top-0 h-[75%] md:inset-y-0 md:left-1/2 md:right-0 md:w-1/2 md:h-full z-0 bg-[#0c0d11]" />

      {/* 
        PANNEAU NOIR SOMBRE :
        - Mobile : Un Quart Bas (h-[25%] bottom-0, z-20)
        - Desktop : Moitié Gauche (md:w-1/2 md:h-full md:left-0 md:top-0, z-20)
      */}
      <div
        className="absolute inset-x-0 bottom-0 h-[25%] md:inset-y-0 md:left-0 md:w-1/2 md:h-full z-20 pointer-events-auto bg-[#08080A] shadow-[0_-8px_24px_rgba(0,0,0,0.85)] md:shadow-[6px_0_24px_rgba(0,0,0,0.85)]"
      >
        {/* Dégradé discret très doux dans le panneau noir */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#090A0E] to-[#12131A] opacity-95" />

        {/* Trame subtile discrète */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* 
        LIGNE DE SÉPARATION :
        - Mobile : Horizontale à top: 75%
        - Desktop : Verticale à left: 50%
      */}
      <div className="absolute left-0 right-0 top-[75%] h-px md:hidden bg-white/15 z-25 pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/20 z-25 pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
    </div>
  );
};
