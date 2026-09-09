import React from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { SneakerItem } from '../types';

import { motion } from 'motion/react';

interface HeaderNavProps {
  currentSneaker: SneakerItem;
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  cartCount,
  onOpenCart,
  onNavigateSection,
}) => {
  return (
    <motion.header 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 md:px-10 py-3 sm:py-4 bg-black/60 backdrop-blur-xl border-b border-white/10 transition-all"
    >
      {/* Brand logo & Category Tabs */}
      <div className="flex items-center gap-4 sm:gap-8 md:gap-10">
        <button 
          onClick={() => onNavigateSection?.('immersive-hero-section')}
          className="flex items-center gap-2 cursor-pointer group text-left"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-base sm:text-lg tracking-tighter shadow-md group-hover:scale-105 transition-transform">
            AF
          </div>
          <span className="font-headline font-black text-xs sm:text-sm tracking-widest text-white uppercase inline-block">
            AERO FORCE
          </span>
        </button>

        {/* Navigation Tabs ciblés sur le produit */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider text-neutral-400">
          <button
            onClick={() => onNavigateSection?.('immersive-hero-section')}
            className="hover:text-white transition-colors cursor-pointer uppercase py-1"
          >
            ACCUEIL
          </button>
          <button
            onClick={() => onNavigateSection?.('showcase-section')}
            className="hover:text-white text-white font-bold transition-colors cursor-pointer uppercase py-1 relative"
          >
            COLLECTION A–F
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
          </button>
          <button
            onClick={() => onNavigateSection?.('anatomie')}
            className="hover:text-white transition-colors cursor-pointer uppercase py-1"
          >
            ANATOMIE TECH
          </button>
          <button
            onClick={() => onNavigateSection?.('catalog-cta-section')}
            className="hover:text-white transition-colors cursor-pointer uppercase py-1"
          >
            CATALOGUE
          </button>
        </nav>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          id="btn-wishlist"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer"
          title="Favoris"
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <button 
          id="btn-share"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer"
          title="Partager"
        >
          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <button
          id="btn-cart-header"
          onClick={onOpenCart}
          className="relative h-8 sm:h-9 px-3.5 sm:px-4 rounded-full bg-white text-black font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-lg hover:bg-neutral-100 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">PANIER</span>
          {cartCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </motion.header>
  );
};

interface StepArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const StepArrows: React.FC<StepArrowsProps> = ({ onPrev, onNext }) => {
  return (
    <div 
      id="step-arrows-container"
      className="absolute top-[22%] sm:top-[24%] md:top-1/2 -translate-y-1/2 left-3 right-3 md:left-auto md:right-10 z-30 flex items-center justify-between md:justify-end gap-3 pointer-events-none"
    >
      <button
        id="btn-prev-sneaker"
        onClick={onPrev}
        className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 md:bg-black/50 hover:bg-white hover:text-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-xl pointer-events-auto active:scale-95 cursor-pointer"
        title="Précédent"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        id="btn-next-sneaker"
        onClick={onNext}
        className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 md:bg-black/50 hover:bg-white hover:text-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-xl pointer-events-auto active:scale-95 cursor-pointer"
        title="Suivant"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};
