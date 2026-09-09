import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ImmersiveHeroProps {
  onUnlock: () => void;
}

export const ImmersiveHero: React.FC<ImmersiveHeroProps> = ({ onUnlock }) => {
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEndY = e.touches[0].clientY;
    // Défilement vers le haut (doigt monte => page descend)
    if (touchStartY.current - touchEndY > 30) {
      onUnlock();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Molette vers le bas => descendre vers la section split
    if (e.deltaY > 20) {
      onUnlock();
    }
  };

  return (
    <motion.section
      id="immersive-hero-lockscreen"
      initial={{ y: '-100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.65, ease: [0.32, 1, 0.32, 1] }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="fixed inset-0 z-50 w-full h-full min-h-[100dvh] overflow-hidden flex flex-col justify-between select-none bg-black pointer-events-auto"
    >
      {/* Background Image pure, 100% lumineuse et immersive */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/image/647cad16ede10f3ac32e84c8f14831e9.jpg"
          alt="Aero Force Hero Immersive"
          className="w-full h-full object-cover object-center pointer-events-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Titre central intégrant la marque AERO FORCE */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center justify-center flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center pointer-events-none"
        >
          {/* Badge discret Aero Force */}
          <div className="mb-3 sm:mb-4 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/25 shadow-lg">
            <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-white">
              AERO FORCE • 2026 EDITION
            </span>
          </div>

          {/* Titre monumental avec AERO FORCE */}
          <div className="bg-black/40 backdrop-blur-md px-6 py-4 sm:px-12 sm:py-7 rounded-3xl border border-white/20 shadow-2xl">
            <h1
              id="hero-company-name"
              className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-white uppercase drop-shadow-2xl"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.3)',
              }}
            >
              AERO FORCE
            </h1>
            <span className="block font-display text-base sm:text-2xl md:text-3xl tracking-[0.25em] text-neutral-200 uppercase mt-2 sm:mt-3">
              AIR FORCE 1 COLLECTION
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bas de page épuré : Uniquement la flèche qui incite à scroller */}
      <div className="relative z-10 w-full pb-8 sm:pb-12 flex flex-col items-center justify-center">
        <button
          onClick={onUnlock}
          aria-label="Faire défiler vers la collection"
          className="group flex flex-col items-center p-3 cursor-pointer text-white hover:text-white/80 transition-transform active:scale-95"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform" />
          </motion.div>
        </button>
      </div>
    </motion.section>
  );
};
