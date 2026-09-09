import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SneakerItem } from '../types';

interface SneakerStageProps {
  currentSneaker: SneakerItem;
  direction?: number;
}

export const SneakerStage: React.FC<SneakerStageProps> = ({ currentSneaker, direction = 1 }) => {
  return (
    <div 
      id="sneaker-stage-container"
      className="absolute inset-x-0 top-0 h-[75%] md:h-full md:left-[50%] md:right-0 z-10 overflow-hidden pointer-events-none select-none"
    >
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentSneaker.id}
          custom={direction}
          initial={(dir: number) => ({
            x: dir >= 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.96,
          })}
          animate={{
            x: '0%',
            opacity: 1,
            scale: 1,
            transition: {
              x: { type: 'spring', stiffness: 280, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.45 },
            },
          }}
          exit={(dir: number) => ({
            x: dir >= 0 ? '-100%' : '100%',
            opacity: 0,
            scale: 0.96,
            transition: {
              x: { type: 'spring', stiffness: 280, damping: 30 },
              opacity: { duration: 0.35 },
              scale: { duration: 0.35 },
            },
          })}
          className="absolute inset-0 w-full h-full"
        >
          {/* Grand plan image en plein cadre */}
          <div className="relative w-full h-full">
            <img
              src={currentSneaker.image}
              alt={currentSneaker.name}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
              loading="eager"
              referrerPolicy="no-referrer"
            />

            {/* Dégradé bas pour contraster parfaitement avec les cartes en overlay */}
            <div 
              className="absolute inset-x-0 bottom-0 h-28 sm:h-36 md:h-44 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" 
            />

            {/* Dégradé haut pour la lisibilité de la navbar et boutons */}
            <div 
              className="absolute inset-x-0 top-0 h-20 sm:h-24 md:h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" 
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
