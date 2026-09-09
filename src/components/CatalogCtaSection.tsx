import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { SNEAKERS_DATA } from '../data/sneakers';
import { SneakerItem } from '../types';

interface CatalogCtaSectionProps {
  onExploreModel: (sneaker: SneakerItem) => void;
  onScrollToTop: () => void;
}

export const CatalogCtaSection: React.FC<CatalogCtaSectionProps> = ({
  onExploreModel,
  onScrollToTop,
}) => {
  // Sélection d'un échantillon de 4 modèles pour l'aperçu
  const previewModels = SNEAKERS_DATA.slice(0, 4);

  return (
    <section
      id="catalog-cta-section"
      className="relative w-full bg-black py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-white/10 overflow-hidden"
    >
      {/* Halo de lumière d'ambiance subtil en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* 1. Titre d'impact & Accroche */}
        <div className="text-center max-w-3xl mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.3em] text-neutral-400 uppercase">
              COLLECTION COMPLÈTE • 2026
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white uppercase mt-4 mb-5 tracking-tight drop-shadow-lg">
              PRÊT À PRENDRE L'ENVOL ?
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Explorez toutes les déclinaisons de la gamme AERO FORCE. Des coloris iconiques aux finitions sur-mesure, trouvez la paire qui définit votre style.
            </p>
          </motion.div>
        </div>

        {/* 2. Aperçu visuel compact (Teaser Mosaïque) */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-16">
          {previewModels.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => onExploreModel(item)}
              className="group relative bg-neutral-900/70 hover:bg-neutral-900 border border-white/10 hover:border-white/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all cursor-pointer shadow-lg"
            >
              {/* Badge modèle & Prix */}
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-xs font-black tracking-widest text-white uppercase">
                  {item.edition}
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  {item.price} {item.currency}
                </span>
              </div>

              {/* Visuel sneaker */}
              <div className="relative w-full aspect-square flex items-center justify-center my-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Nom & action rapide */}
              <div className="flex items-center justify-between w-full pt-2 border-t border-white/5">
                <span className="text-[11px] sm:text-xs font-medium text-neutral-300 truncate group-hover:text-white transition-colors">
                  {item.name}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. Boutons d'action principaux */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-16 sm:mb-20">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToTop}
            className="w-full sm:w-auto h-14 px-8 sm:px-10 rounded-xl bg-white text-black font-black text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:bg-neutral-200 transition-all cursor-pointer"
          >
            <span>CONFIGURER LES MODÈLES A–F</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </motion.button>
        </div>

        {/* 4. Réassurance client (Micro-arguments) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 text-neutral-400">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Livraison Express
              </span>
              <span className="text-[11px] text-neutral-400">
                Expédition sous 24/48h offerte
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Retours Gratuits
              </span>
              <span className="text-[11px] text-neutral-400">
                30 jours pour changer d'avis
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Authenticité 100%
              </span>
              <span className="text-[11px] text-neutral-400">
                Certificat numérique officiel
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
