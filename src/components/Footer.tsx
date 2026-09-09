import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-white/10 pt-16 pb-8 px-6 sm:px-10 lg:px-16 text-white selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        
        {/* Brand & Newsletter */}
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-sm tracking-tighter shadow-md">
              AF
            </div>
            <span className="font-headline font-black text-sm tracking-widest text-white uppercase drop-shadow-md">
              AERO FORCE
            </span>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Collection exclusive 2026. L'icône du basketball repensée pour l'ère moderne avec des matériaux premium et un amorti repoussant les limites.
          </p>
          <div className="flex mt-2">
            <input 
              type="email" 
              placeholder="VOTRE EMAIL" 
              className="bg-neutral-900 border border-white/20 rounded-l-lg px-4 py-3 text-xs tracking-wider outline-none focus:border-white transition-colors w-full"
            />
            <button className="bg-white text-black font-bold text-xs tracking-wider uppercase px-5 py-3 rounded-r-lg hover:bg-neutral-200 transition-colors">
              S'INSCRIRE
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xs tracking-widest uppercase text-white/50 mb-1">Collection</h4>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">Modèle A</a>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">Modèle B</a>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">Éditions Limitées</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xs tracking-widest uppercase text-white/50 mb-1">Support</h4>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">Guide des tailles</a>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">Livraison & Retours</a>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">Contactez-nous</a>
          </div>

          <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
            <h4 className="font-bold text-xs tracking-widest uppercase text-white/50 mb-1">Légal</h4>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">Mentions légales</a>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">Confidentialité</a>
            <a href="#" className="text-neutral-300 hover:text-white text-xs tracking-wide transition-colors">CGV</a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-neutral-500 font-medium tracking-wider uppercase">
        <span>© 2026 AERO FORCE SHOWCASE. DEMO FICTIVE.</span>
        <span>DESIGNED FOR FUTURE.</span>
      </div>
    </footer>
  );
};
