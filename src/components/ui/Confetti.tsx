import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#8B5CF6', '#F97316', '#06B6D4', '#10B981', '#F43F5E', '#FBBF24', '#EC4899'];

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  size: number;
}

export default function Confetti({ show }: { show: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      const p: Particle[] = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 720 - 360,
        size: Math.random() * 8 + 4,
      }));
      setParticles(p);
      const timer = setTimeout(() => setParticles([]), 2500);
      return () => clearTimeout(timer);
    }
    setParticles([]);
  }, [show]);

  return (
    <AnimatePresence>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ top: '-5%', left: `${p.x}%`, opacity: 1, rotate: 0 }}
          animate={{ top: '105%', opacity: 0, rotate: p.rotation }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, delay: p.delay, ease: 'easeIn' }}
          className="fixed pointer-events-none z-50"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </AnimatePresence>
  );
}
