import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Check } from 'lucide-react';
import Button from '../ui/Button';
import type { Question } from '../../types';

interface Props {
  question: Question;
  onAnswer: (selected: number[], correct: boolean) => void;
  disabled: boolean;
}

export default function QcmMulti({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [answered, setAnswered] = useState(false);
  const correctSet = new Set(question.correct as number[]);

  const toggle = (idx: number) => {
    if (disabled || answered) return;
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    setSelected(next);
  };

  const submit = () => {
    if (disabled || answered || selected.size === 0) return;
    setAnswered(true);
    const isCorrect = selected.size === correctSet.size && [...selected].every(i => correctSet.has(i));
    onAnswer([...selected], isCorrect);
  };

  const expectedCount = correctSet.size;

  return (
    <div className="space-y-3">
      <p className="text-sm text-white/50 mb-2">Sélectionnez {expectedCount} réponse{expectedCount > 1 ? 's' : ''}</p>
      {(question.options as string[]).map((opt, idx) => {
        const isSelected = selected.has(idx);
        const isCorrectOption = correctSet.has(idx);
        let bg = isSelected ? 'bg-violet-500/20 border-violet-400' : 'bg-white/10 hover:bg-white/15 border-white/10';
        if (answered) {
          if (isCorrectOption) bg = 'bg-emerald-500/20 border-emerald-400';
          else if (isSelected) bg = 'bg-red-500/20 border-red-400';
          else bg = 'bg-white/5 border-white/5 opacity-50';
        }
        return (
          <motion.button
            key={idx}
            whileTap={!answered && !disabled ? { scale: 0.99 } : undefined}
            onClick={() => toggle(idx)}
            disabled={disabled || answered}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${bg} cursor-pointer disabled:cursor-default`}
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${isSelected && !answered ? 'bg-violet-500 text-white' : 'bg-white/10'}`}>
              {isSelected && !answered ? <Check size={16} /> : String.fromCharCode(65 + idx)}
            </span>
            <span className="flex-1">{opt}</span>
            {answered && isCorrectOption && <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />}
            {answered && isSelected && !isCorrectOption && <XCircle size={20} className="text-red-400 flex-shrink-0" />}
          </motion.button>
        );
      })}
      {!answered && (
        <Button onClick={submit} disabled={selected.size === 0} className="w-full mt-4">
          Valider ({selected.size}/{expectedCount})
        </Button>
      )}
    </div>
  );
}
