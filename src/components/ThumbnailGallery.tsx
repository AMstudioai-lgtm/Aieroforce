import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { SneakerItem } from '../types';

interface ThumbnailGalleryProps {
  sneakers: SneakerItem[];
  activeSneaker: SneakerItem;
  onSelect: (sneaker: SneakerItem) => void;
}

export const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({
  sneakers,
  activeSneaker,
  onSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll pour centrer la carte active
  useEffect(() => {
    const activeEl = document.getElementById(`thumbnail-card-${activeSneaker.id}`);
    if (activeEl && containerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeSneaker.id]);

  return (
    /*
      Conteneur des cartes :
      - Mobile : En bas de la zone image (bottom-[26%]), pleine largeur
      - Desktop : Sur le bas de l'image droite (bottom-5 sm:bottom-7 left-1/2 right-0)
      - Padding-top généreux (pt-4 sm:pt-6) pour que la carte agrandie et son badge ne soient JAMAIS coupés en haut
    */
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      id="thumbnail-gallery-sidebar"
      className="absolute bottom-[26.5%] md:bottom-5 lg:bottom-7 left-0 md:left-1/2 right-0 z-25 md:z-15 pointer-events-auto overflow-hidden pt-4 sm:pt-6"
    >
      <div
        ref={containerRef}
        className="w-full flex flex-row items-end gap-3 sm:gap-3.5 md:gap-4 px-4 sm:px-6 md:px-8 pt-3 pb-2 md:pb-3 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {sneakers.map((sneaker, index) => {
          const isActive = sneaker.id === activeSneaker.id;

          return (
            <motion.button
              key={sneaker.id}
              id={`thumbnail-card-${sneaker.id}`}
              onClick={() => onSelect(sneaker)}
              whileHover={{ scale: isActive ? 1.03 : 1.06 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isActive ? 1.05 : 0.94,
                borderColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.22)',
                backgroundColor: isActive ? 'rgba(0, 0, 0, 0.88)' : 'rgba(0, 0, 0, 0.6)',
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 26,
              }}
              className={`flex-shrink-0 group relative flex flex-col items-center justify-between p-1.5 rounded-xl sm:rounded-2xl border backdrop-blur-xl transition-all duration-300 select-none ${
                isActive 
                  ? 'w-[74px] h-[98px] sm:w-[84px] sm:h-[110px] md:w-[104px] md:h-[132px] shadow-[0_12px_28px_rgba(0,0,0,0.9)] ring-2 ring-white/80' 
                  : 'w-[64px] h-[84px] sm:w-[72px] sm:h-[96px] md:w-[88px] md:h-[114px] opacity-75 hover:opacity-100 hover:border-white/60 shadow-md'
              }`}
            >
              {/* Image miniature avec coins arrondis */}
              <div className="w-full h-12 sm:h-14 md:h-20 flex items-center justify-center overflow-hidden rounded-lg sm:rounded-xl bg-black/50">
                <img
                  src={sneaker.image}
                  alt={sneaker.name}
                  className="w-full h-full object-cover object-center select-none pointer-events-none transform group-hover:scale-108 transition-transform duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Micro Indicator Tag */}
              <span
                className={`text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full transition-colors mt-1 ${
                  isActive
                    ? 'bg-white text-black font-black shadow-sm'
                    : 'text-white/80 bg-black/60 backdrop-blur-sm'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>

              {/* Active Highlight Corner Badge */}
              {isActive && (
                <span
                  className="absolute top-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-black bg-white shadow-md"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
