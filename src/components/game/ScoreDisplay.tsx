import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface ScoreDisplayProps {
  points: number;
  combo: number;
}

export default function ScoreDisplay({ points, combo }: ScoreDisplayProps) {
  const multiplier = combo >= 5 ? 3 : combo >= 2 ? 2 : 1;

  return (
    <div className="flex items-center gap-4">
      <motion.div
        key={points}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl"
      >
        <Zap size={18} className="text-amber-400" />
        <span className="text-xl font-bold">{points}</span>
        <span className="text-white/50 text-sm">pts</span>
      </motion.div>
      {combo >= 2 && (
        <motion.div
          key={combo}
          initial={{ scale: 1.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-lg font-bold text-sm"
        >
          x{multiplier} COMBO
        </motion.div>
      )}
    </div>
  );
}
