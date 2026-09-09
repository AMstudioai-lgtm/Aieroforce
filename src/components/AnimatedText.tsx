import React from 'react';
import { motion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p' | 'div';
}

/**
 * TextReveal : Révélation de texte signature haut de gamme
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.85,
  tag = 'h2',
}) => {
  const Tag = tag as any;
  const words = text.split(' ');

  return (
    <Tag className={`inline-flex flex-wrap gap-x-[0.26em] gap-y-[0.1em] ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            initial={{ y: '120%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: duration,
              delay: delay + index * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block will-change-transform transform-gpu"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

interface FadeRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

/**
 * FadeReveal : Apparition fluide avec translation pour sous-titres et paragraphes
 */
export const FadeReveal: React.FC<FadeRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  yOffset = 24,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};
