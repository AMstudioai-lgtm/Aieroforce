import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { SNEAKERS_DATA } from './data/sneakers';
import { SneakerItem } from './types';
import { ImmersiveHero } from './components/ImmersiveHero';
import { SplitBackground } from './components/SplitBackground';
import { SneakerHeroText } from './components/SneakerHeroText';
import { SneakerStage } from './components/SneakerStage';
import { ThumbnailGallery } from './components/ThumbnailGallery';
import { HeaderNav, StepArrows } from './components/NavigationControls';
import { ProductControls } from './components/ProductControls';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AnatomySection } from './components/AnatomySection';
import { CatalogCtaSection } from './components/CatalogCtaSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // État de verrouillage pour l'effet Hero superposée
  const [isHeroOpen, setIsHeroOpen] = useState<boolean>(true);

  const showcaseRef = useRef<HTMLElement>(null);
  const activeSneaker: SneakerItem = SNEAKERS_DATA[currentIndex];

  // Gestion du scroll :
  // - Quand la Hero est ouverte, on bloque le scroll du document pour que seule la Hero gère le premier geste
  // - Quand l'utilisateur est tout en haut de la section split (scrollY === 0) et scrolle vers le haut, la Hero redescend en superposition
  useEffect(() => {
    if (isHeroOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isHeroOpen]);

  // Détection du scroll vers le haut quand on est au sommet de la section 2
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheelOnTop = (e: WheelEvent) => {
      // Si la hero est fermée et qu'on est au sommet (scrollY === 0) et qu'on scrolle vers le haut (deltaY < -25)
      if (!isHeroOpen && window.scrollY <= 5 && e.deltaY < -25) {
        const now = Date.now();
        if (now - lastWheelTime > 600) {
          lastWheelTime = now;
          setIsHeroOpen(true);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      // Doigt descend (touchEndY > touchStartY) alors qu'on est au sommet => faire redescendre la hero
      if (!isHeroOpen && window.scrollY <= 5 && touchEndY - touchStartY > 50) {
        setIsHeroOpen(true);
      }
    };

    window.addEventListener('wheel', handleWheelOnTop, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheelOnTop);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isHeroOpen]);

  const handleSelectSneaker = (sneaker: SneakerItem) => {
    const nextIdx = SNEAKERS_DATA.findIndex((s) => s.id === sneaker.id);
    if (nextIdx !== -1 && nextIdx !== currentIndex) {
      setDirection(nextIdx > currentIndex ? 1 : -1);
      setCurrentIndex(nextIdx);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? SNEAKERS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === SNEAKERS_DATA.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (sneaker: SneakerItem, size: number, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.sneaker.id === sneaker.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.sneaker.id === sneaker.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { sneaker, size, quantity }];
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Fermer la Hero et révéler la section split
  const handleDismissHero = () => {
    setIsHeroOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Réouvrir la Hero (qui redescend en superposition)
  const handleOpenHero = () => {
    setIsHeroOpen(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const isInitialMount = useRef(true);
  if (!isHeroOpen) {
    isInitialMount.current = false;
  }

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'immersive-hero-section') {
      handleOpenHero();
      return;
    }
    
    if (isHeroOpen) {
      setIsHeroOpen(false);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-black text-white selection:bg-white selection:text-black">
      
      {/* 
        HERO IMMERSIVE SUPERPOSÉE :
        - S'affiche en premier
        - Disparaît vers le haut quand on scrolle vers le bas
        - Redescend du haut en superposition quand on remonte tout en haut de la section 2
      */}
      <AnimatePresence>
        {isHeroOpen && (
          <ImmersiveHero key="immersive-hero" onUnlock={handleDismissHero} isInitialMount={isInitialMount.current} />
        )}
      </AnimatePresence>

      {/* HEADER PERSISTANT (Apparaît une fois dans le site) */}
      {!isHeroOpen && (
        <HeaderNav
          currentSneaker={activeSneaker}
          cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onNavigateSection={handleNavigateSection}
        />
      )}

      {/* CONTENU PRINCIPAL SCROLLABLE */}
      <main className="relative z-10 flex flex-col bg-neutral-950">
        
        {/* SECTION 1 : Showcase interactif Split Screen (Modèles A à F) */}
        <section 
          id="showcase-section"
          ref={showcaseRef}
          className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center select-none"
        >
          <div className="relative w-full h-full max-w-[1920px] mx-auto overflow-hidden">
            <SplitBackground currentSneaker={activeSneaker} />
            <SneakerStage currentSneaker={activeSneaker} direction={direction} />
            <div className="absolute inset-x-0 bottom-0 top-[75%] md:top-0 md:inset-y-0 md:left-0 md:w-1/2 z-25 flex items-center pointer-events-none">
              <SneakerHeroText currentSneaker={activeSneaker} direction={direction} />
            </div>
            <StepArrows onPrev={handlePrev} onNext={handleNext} />
            <ThumbnailGallery
              sneakers={SNEAKERS_DATA}
              activeSneaker={activeSneaker}
              onSelect={handleSelectSneaker}
            />
            <ProductControls sneaker={activeSneaker} onAddToCart={handleAddToCart} />
          </div>
        </section>

        {/* SECTION 2 : Anatomie & Matériaux (Tech Specs) */}
        <AnatomySection />

        {/* SECTION 3 : Appel à l'action Catalogue */}
        <CatalogCtaSection
          onExploreModel={(sneaker) => {
            handleSelectSneaker(sneaker);
            showcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          onScrollToTop={() => {
            showcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SECTION 4 : Footer Minimaliste */}
        <Footer />
        
      </main>

      {/* Tiroir panier interactif */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}
