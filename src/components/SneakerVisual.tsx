import React, { useState } from 'react';
import { SneakerItem } from '../types';

interface SneakerVisualProps {
  sneaker: SneakerItem;
  className?: string;
  isThumbnail?: boolean;
}

export const SneakerVisual: React.FC<SneakerVisualProps> = ({
  sneaker,
  className = '',
  isThumbnail = false,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 3D Realistic Ground Shadow */}
      {!isThumbnail && (
        <div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-14 rounded-full opacity-60 blur-2xl pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 55%, transparent 75%)`,
          }}
        />
      )}

      {sneaker.image && !hasError ? (
        <div
          className={`relative overflow-hidden flex items-center justify-center transition-transform duration-300 ${
            isThumbnail
              ? 'w-full h-full rounded-xl'
              : 'w-full max-w-xl max-h-[520px] rounded-3xl'
          }`}
          style={{
            filter: isThumbnail
              ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))'
              : 'drop-shadow(0 24px 38px rgba(0,0,0,0.6)) drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
          }}
        >
          <img
            src={sneaker.image}
            alt={sneaker.name}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover select-none pointer-events-none ${
              isThumbnail
                ? 'aspect-square object-center rounded-xl'
                : 'max-h-[460px] object-contain rounded-2xl ring-1 ring-white/15'
            }`}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        /* Fallback SVG Vector Render */
        <svg
          viewBox="0 0 600 380"
          className="w-full h-auto drop-shadow-2xl select-none"
          style={{
            filter: isThumbnail 
              ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.35))'
              : 'drop-shadow(0 25px 35px rgba(0,0,0,0.5)) drop-shadow(0 10px 15px rgba(0,0,0,0.3))',
          }}
        >
          <defs>
            <linearGradient id={`upper-grad-${sneaker.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={sneaker.accentColor} />
              <stop offset="60%" stopColor={sneaker.primaryColor} />
              <stop offset="100%" stopColor={sneaker.secondaryColor} />
            </linearGradient>

            <linearGradient id={`sole-grad-${sneaker.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E2E8F0" />
              <stop offset="85%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Sole base */}
          <path
            d="M 60 270 C 120 280, 260 290, 480 270 C 530 260, 560 240, 560 210 C 560 195, 520 200, 480 210 C 380 235, 230 240, 100 230 C 70 230, 45 245, 60 270 Z"
            fill={`url(#sole-grad-${sneaker.id})`}
          />

          {/* Upper Body */}
          <path
            d="M 80 235 C 110 238, 200 242, 330 220 C 420 200, 480 170, 520 140 C 490 130, 440 140, 390 160 C 320 185, 230 190, 140 185 C 100 185, 70 210, 80 235 Z"
            fill={`url(#upper-grad-${sneaker.id})`}
          />
        </svg>
      )}
    </div>
  );
};
