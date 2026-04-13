import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Heart } from 'lucide-react';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => onDone(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center"
        >
          <div className="flex justify-center gap-4 mb-8">
            <motion.div animate={{ rotate: phase >= 1 ? 360 : 0 }} transition={{ duration: 0.8 }}>
              <BookOpen size={40} className="text-violet-400" />
            </motion.div>
            <motion.div animate={{ rotate: phase >= 1 ? 360 : 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <Users size={40} className="text-orange-400" />
            </motion.div>
            <motion.div animate={{ rotate: phase >= 1 ? 360 : 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <Heart size={40} className="text-cyan-400" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent mb-4"
          >
            MSADS Révision
          </motion.h1>

          {phase >= 1 && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white/60 text-lg"
            >
              Médiateur Social Accès aux Droits et Services
            </motion.p>
          )}

          {phase >= 2 && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white/40 text-sm mt-2"
            >
              RNCP36241 - Niveau 4
            </motion.p>
          )}

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 2, ease: 'linear' }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto mt-8"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
