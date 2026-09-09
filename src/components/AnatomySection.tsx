import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Layers, ShieldCheck, Zap } from 'lucide-react';
import { TextReveal, FadeReveal } from './AnimatedText';

export const AnatomySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background Parallax for the giant text
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // Subtle parallax for the cards container
  const yCards = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section 
      id="anatomie"
      ref={containerRef}
      className="relative w-full bg-neutral-950 py-28 sm:py-40 px-6 sm:px-10 lg:px-16 border-t border-white/10 overflow-hidden"
    >
      {/* Background Parallax Typography (Mythe) */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.03] select-none"
      >
        <span className="font-display text-[20rem] sm:text-[30rem] lg:text-[40rem] text-white leading-none tracking-tighter whitespace-nowrap">
          1982
        </span>
      </motion.div>

      {/* Floating subtle ambient lights */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl">
          <FadeReveal delay={0.1}>
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              CRAFTED FOR FLIGHT
            </span>
          </FadeReveal>
          
          <TextReveal 
            text="L'ANATOMIE DU MYTHE"
            tag="h2"
            delay={0.2}
            duration={0.9}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-white uppercase mt-4 mb-6 tracking-tight drop-shadow-md"
          />
          
          <FadeReveal delay={0.4} yOffset={20}>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              Chaque modèle de la collection 2026 intègre les matériaux les plus avancés de notre histoire. 
              Découvrez la fusion parfaite entre l'héritage légendaire de la Air Force 1 et l'innovation technologique de pointe.
            </p>
          </FadeReveal>
        </div>

        {/* Feature Grid with intelligent Parallax & Scroll Reveal */}
        <motion.div 
          style={{ y: yCards }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {/* Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative flex flex-col items-center md:items-start text-center md:text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 p-8 sm:p-10 rounded-3xl backdrop-blur-md transition-colors cursor-default overflow-hidden"
          >
            {/* Glossy reflection on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 border border-white/15 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out shadow-lg">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="relative font-display text-2xl text-white uppercase mb-3 tracking-wide group-hover:text-white transition-colors">
              Cuir Pleine Fleur
            </h3>
            <p className="relative text-neutral-400 text-sm leading-relaxed font-light group-hover:text-neutral-300 transition-colors">
              Sélectionné à la main, le cuir premium assure une durabilité hors normes et se patine naturellement pour une esthétique unique.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative flex flex-col items-center md:items-start text-center md:text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 p-8 sm:p-10 rounded-3xl backdrop-blur-md transition-colors cursor-default overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 border border-white/15 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out shadow-lg">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="relative font-display text-2xl text-white uppercase mb-3 tracking-wide group-hover:text-white transition-colors">
              Amorti Air React
            </h3>
            <p className="relative text-neutral-400 text-sm leading-relaxed font-light group-hover:text-neutral-300 transition-colors">
              Une capsule d'air comprimé encapsulée dans une mousse React ultra-légère offre un retour d'énergie explosif à chaque appui.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative flex flex-col items-center md:items-start text-center md:text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 p-8 sm:p-10 rounded-3xl backdrop-blur-md transition-colors cursor-default overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 border border-white/15 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="relative font-display text-2xl text-white uppercase mb-3 tracking-wide group-hover:text-white transition-colors">
              Traction Aérodynamique
            </h3>
            <p className="relative text-neutral-400 text-sm leading-relaxed font-light group-hover:text-neutral-300 transition-colors">
              La semelle extérieure repensée présente des points de pivot optimisés pour une adhérence multidirectionnelle immédiate.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
