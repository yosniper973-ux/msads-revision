import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ value, max, color = 'bg-violet-500', height = 'h-3', showLabel = false }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-white/60 mb-1">
          <span>{value} / {max}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-white/10 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}
