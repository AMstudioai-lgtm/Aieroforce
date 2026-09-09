import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SneakerItem } from '../types';

interface ProductControlsProps {
  sneaker: SneakerItem;
  onAddToCart: (sneaker: SneakerItem, size: number, quantity: number) => void;
}

export const ProductControls: React.FC<ProductControlsProps> = ({
  sneaker,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number>(sneaker.sizes[2] || sneaker.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    onAddToCart(sneaker, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div 
      id="product-controls-container"
      className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-4 sm:left-8 md:left-12 right-4 sm:right-auto z-30 flex flex-col gap-2.5 sm:gap-3 max-w-full sm:max-w-sm"
    >
      {/* Size Selector Strip */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap">
          TAILLE EU :
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {sneaker.sizes.map((size) => (
            <button
              key={size}
              id={`size-btn-${size}`}
              onClick={() => setSelectedSize(size)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all flex-shrink-0 flex items-center justify-center ${
                selectedSize === size
                  ? 'bg-white text-black shadow-md scale-105 ring-1 ring-white'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Row: [- 1 +] and Add to Bag with Price */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quantity Stepper: [- 1 +] */}
        <div 
          id="quantity-stepper"
          className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/15 h-11 sm:h-12"
        >
          <button
            id="btn-decrease-qty"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-8 h-full flex items-center justify-center text-white/80 hover:text-white disabled:opacity-30 transition-opacity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          
          <span 
            id="display-quantity"
            className="w-7 text-center font-bold text-xs sm:text-sm text-white select-none"
          >
            {quantity}
          </span>

          <button
            id="btn-increase-qty"
            onClick={handleIncrease}
            disabled={quantity >= 10}
            className="w-8 h-full flex items-center justify-center text-white/80 hover:text-white disabled:opacity-30 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main CTA: Add to Bag + Price */}
        <motion.button
          id="btn-add-to-cart"
          onClick={handleAdd}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-between px-4 sm:px-5 h-11 sm:h-12 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xl bg-white text-black hover:bg-neutral-100"
        >
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1.5 text-emerald-600 font-extrabold"
                >
                  <Check className="w-4 h-4" />
                  AJOUTÉ
                </motion.span>
              ) : (
                <motion.span
                  key="cart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  AJOUTER
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Price badge inside the CTA button */}
          <div className="flex items-baseline gap-0.5 font-black text-xs sm:text-sm">
            <span>{(sneaker.price * quantity).toFixed(2)}</span>
            <span className="text-[10px]">{sneaker.currency}</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
