import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Question } from '../../types';

interface Props {
  question: Question;
  onAnswer: (selected: number[], correct: boolean) => void;
  disabled: boolean;
}

export default function QcmSingle({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const correctIdx = question.correct[0] as number;

  const handleSelect = (idx: number) => {
    if (disabled || answered) return;
    setSelected(idx);
    setAnswered(true);
    onAnswer([idx], idx === correctIdx);
  };

  return (
    <div className="space-y-3">
      {(question.options as string[]).map((opt, idx) => {
        let bg = 'bg-white/10 hover:bg-white/15 border-white/10';
        if (answered) {
          if (idx === correctIdx) bg = 'bg-emerald-500/20 border-emerald-400';
          else if (idx === selected) bg = 'bg-red-500/20 border-red-400';
          else bg = 'bg-white/5 border-white/5 opacity-50';
        }
        return (
          <motion.button
            key={idx}
            whileHover={!answered && !disabled ? { scale: 1.01 } : undefined}
            whileTap={!answered && !disabled ? { scale: 0.99 } : undefined}
            onClick={() => handleSelect(idx)}
            disabled={disabled || answered}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${bg} cursor-pointer disabled:cursor-default`}
          >
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="flex-1">{opt}</span>
            {answered && idx === correctIdx && <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />}
            {answered && idx === selected && idx !== correctIdx && <XCircle size={20} className="text-red-400 flex-shrink-0" />}
          </motion.button>
        );
      })}
    </div>
  );
}
