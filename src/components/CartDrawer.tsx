import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { SneakerItem } from '../types';
import { SneakerVisual } from './SneakerVisual';

export interface CartItem {
  sneaker: SneakerItem;
  size: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
}) => {
  const total = items.reduce((sum, item) => sum + item.sneaker.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-md bg-neutral-900 border-l border-white/10 h-full flex flex-col p-6 text-white shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-white" />
                <h2 className="font-headline font-bold text-lg">PANIER ({items.length})</h2>
              </div>
              <button
                id="btn-close-cart"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-sm gap-2">
                  <ShoppingBag className="w-10 h-10 opacity-30" />
                  <p>Votre panier est vide</p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={`${item.sneaker.id}-${item.size}-${idx}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="w-16 h-12 flex items-center justify-center">
                      <SneakerVisual sneaker={item.sneaker} isThumbnail={true} />
                    </div>

                    <div className="flex-1 ml-3">
                      <h4 className="font-headline font-bold text-sm">{item.sneaker.name}</h4>
                      <p className="text-xs text-neutral-400">
                        Taille : {item.size} | Qté : {item.quantity}
                      </p>
                      <p className="text-xs font-mono font-bold text-white mt-0.5">
                        {(item.sneaker.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="text-neutral-500 hover:text-red-400 p-1.5 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Total */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-neutral-400">TOTAL TTC</span>
                  <span className="font-mono text-lg font-bold">{total.toFixed(2)} €</span>
                </div>

                <button
                  id="btn-checkout"
                  onClick={() => {
                    alert('Commande validée pour démonstration interactive !');
                    onClose();
                  }}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-200 active:scale-95 transition-all shadow-lg"
                >
                  <span>COMMANDER MAINTENANT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
