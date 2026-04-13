import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerBarProps {
  progress: number;
  remaining: number;
}

export default function TimerBar({ progress, remaining }: TimerBarProps) {
  const seconds = Math.ceil(remaining / 1000);
  const color = progress > 0.5 ? 'bg-emerald-400' : progress > 0.25 ? 'bg-amber-400' : 'bg-red-400';

  return (
    <div className="flex items-center gap-3 w-full">
      <Clock size={20} className={progress <= 0.25 ? 'text-red-400 animate-pulse' : 'text-white/60'} />
      <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
      <span className={`text-lg font-bold min-w-[2rem] text-right ${progress <= 0.25 ? 'text-red-400' : 'text-white'}`}>
        {seconds}s
      </span>
    </div>
  );
}
