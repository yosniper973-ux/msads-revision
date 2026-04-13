import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({ children, className = '', gradient, onClick, hoverable = false }: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.03, y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`rounded-2xl p-6 backdrop-blur-sm ${gradient ? `bg-gradient-to-br ${gradient}` : 'bg-white/10 border border-white/10'} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
