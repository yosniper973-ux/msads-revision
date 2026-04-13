import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Question } from '../../types';

interface Props {
  question: Question;
  onAnswer: (selected: number[], correct: boolean) => void;
  disabled: boolean;
}

export default function TrueFalse({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const correctIdx = question.correct[0] as number;

  const handleSelect = (idx: number) => {
    if (disabled || answered) return;
    setSelected(idx);
    setAnswered(true);
    onAnswer([idx], idx === correctIdx);
  };

  const buttons = [
    { label: 'Vrai', idx: 0, icon: '✓' },
    { label: 'Faux', idx: 1, icon: '✗' },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {buttons.map(({ label, idx, icon }) => {
        let bg = 'bg-white/10 hover:bg-white/20 border-white/10';
        if (answered) {
          if (idx === correctIdx) bg = 'bg-emerald-500/20 border-emerald-400';
          else if (idx === selected) bg = 'bg-red-500/20 border-red-400';
          else bg = 'bg-white/5 border-white/5 opacity-50';
        }
        return (
          <motion.button
            key={idx}
            whileHover={!answered && !disabled ? { scale: 1.05 } : undefined}
            whileTap={!answered && !disabled ? { scale: 0.95 } : undefined}
            onClick={() => handleSelect(idx)}
            disabled={disabled || answered}
            className={`flex-1 max-w-[200px] p-6 rounded-2xl border-2 transition-all text-center cursor-pointer disabled:cursor-default ${bg}`}
          >
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-lg font-bold">{label}</div>
            {answered && idx === correctIdx && <CheckCircle size={24} className="text-emerald-400 mx-auto mt-2" />}
            {answered && idx === selected && idx !== correctIdx && <XCircle size={24} className="text-red-400 mx-auto mt-2" />}
          </motion.button>
        );
      })}
    </div>
  );
}
