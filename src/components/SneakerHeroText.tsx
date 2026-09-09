import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SneakerItem } from '../types';

interface SneakerHeroTextProps {
  currentSneaker: SneakerItem;
  direction?: number;
}

export const SneakerHeroText: React.FC<SneakerHeroTextProps> = ({
  currentSneaker,
  direction = 1,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-start md:justify-center select-none pointer-events-none overflow-hidden px-5 sm:px-8 md:pl-12 pt-3 sm:pt-4 md:pt-0 max-w-full md:max-w-xl lg:max-w-2xl">
      {/* NOM DU MODÈLE : AIR FORCE 1 MODEL X */}
      <div className="relative overflow-visible py-1 sm:py-2">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`name-${currentSneaker.id}`}
            custom={direction}
            initial={(dir: number) => ({
              opacity: 0,
              x: dir >= 0 ? 50 : -50,
              filter: 'blur(4px)',
            })}
            animate={{
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            exit={(dir: number) => ({
              opacity: 0,
              x: dir >= 0 ? -50 : 50,
              filter: 'blur(4px)',
              transition: {
                duration: 0.3,
                ease: [0.32, 0, 0.67, 0],
              },
            })}
            className="flex flex-col"
          >
            {/* Ligne 1 : AIR FORCE 1 */}
            <h1 
              id="hero-sneaker-title-main"
              className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.92] text-white uppercase drop-shadow-2xl"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.15)',
              }}
            >
              AIR FORCE 1
            </h1>

            {/* Ligne 2 : MODEL X avec accentuation visuelle nette */}
            <span 
              id="hero-sneaker-model-tag"
              className="font-display text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wider leading-[0.95] text-neutral-300 uppercase mt-0.5 sm:mt-1 drop-shadow-lg"
            >
              {currentSneaker.name.replace('AIR FORCE 1 ', '')}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Édition / Sous-titre discret */}
      <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-neutral-400 uppercase mt-0.5 md:mt-2">
        {currentSneaker.edition}
      </span>
    </div>
  );
};
