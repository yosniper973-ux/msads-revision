import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import type { Question, DragDropOption } from '../../types';

interface Props {
  question: Question;
  onAnswer: (selected: number[], correct: boolean) => void;
  disabled: boolean;
}

export default function DragDrop({ question, onAnswer, disabled }: Props) {
  const options = question.options as DragDropOption[];
  const [leftItems] = useState(() => options.map((o, i) => ({ text: o.left, origIdx: i })));
  const [rightItems, setRightItems] = useState(() => {
    const shuffled = [...options.map((o, i) => ({ text: o.right, origIdx: i }))];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [answered, setAnswered] = useState(false);

  const tryMatch = useCallback((leftIdx: number, rightIdx: number) => {
    if (disabled || answered) return;
    const next = new Map(matches);
    // Remove existing matches for these indices
    for (const [k, v] of next) {
      if (k === leftIdx || v === rightIdx) next.delete(k);
    }
    next.set(leftIdx, rightIdx);
    setMatches(next);
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [matches, disabled, answered]);

  const handleLeftClick = (idx: number) => {
    if (disabled || answered) return;
    if (selectedRight !== null) {
      tryMatch(idx, selectedRight);
    } else {
      setSelectedLeft(selectedLeft === idx ? null : idx);
    }
  };

  const handleRightClick = (idx: number) => {
    if (disabled || answered) return;
    if (selectedLeft !== null) {
      tryMatch(selectedLeft, idx);
    } else {
      setSelectedRight(selectedRight === idx ? null : idx);
    }
  };

  const submit = () => {
    if (disabled || answered || matches.size !== leftItems.length) return;
    setAnswered(true);
    const allCorrect = leftItems.every((left, leftIdx) => {
      const rightIdx = matches.get(leftIdx);
      if (rightIdx === undefined) return false;
      return rightItems[rightIdx].origIdx === left.origIdx;
    });
    const selectedArr = leftItems.map((_, i) => matches.get(i) ?? -1);
    onAnswer(selectedArr, allCorrect);
  };

  const getMatchColor = (leftIdx: number) => {
    if (!answered) return 'bg-violet-500/30 border-violet-400';
    const rightIdx = matches.get(leftIdx);
    if (rightIdx === undefined) return '';
    const isCorrect = rightItems[rightIdx].origIdx === leftItems[leftIdx].origIdx;
    return isCorrect ? 'bg-emerald-500/20 border-emerald-400' : 'bg-red-500/20 border-red-400';
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/50 mb-2">Cliquez sur un élément à gauche puis à droite pour les associer</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {leftItems.map((item, idx) => {
            const isMatched = matches.has(idx);
            const isSelected = selectedLeft === idx;
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLeftClick(idx)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all text-sm cursor-pointer ${
                  isSelected ? 'border-violet-400 bg-violet-500/20' :
                  isMatched ? getMatchColor(idx) :
                  'border-white/10 bg-white/10 hover:bg-white/15'
                }`}
              >
                <span className="font-semibold">{item.text}</span>
              </motion.button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rightItems.map((item, idx) => {
            const isMatched = [...matches.values()].includes(idx);
            const isSelected = selectedRight === idx;
            const matchedLeftIdx = [...matches.entries()].find(([, v]) => v === idx)?.[0];
            let matchColor = 'border-white/10 bg-white/10 hover:bg-white/15';
            if (isSelected) matchColor = 'border-violet-400 bg-violet-500/20';
            else if (isMatched && matchedLeftIdx !== undefined) {
              if (!answered) matchColor = 'bg-violet-500/10 border-violet-400/50';
              else {
                const correct = rightItems[idx].origIdx === leftItems[matchedLeftIdx].origIdx;
                matchColor = correct ? 'bg-emerald-500/20 border-emerald-400' : 'bg-red-500/20 border-red-400';
              }
            }
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRightClick(idx)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all text-sm cursor-pointer ${matchColor}`}
              >
                {item.text}
                {answered && isMatched && matchedLeftIdx !== undefined && (
                  rightItems[idx].origIdx === leftItems[matchedLeftIdx].origIdx
                    ? <CheckCircle size={16} className="text-emerald-400 inline ml-2" />
                    : <XCircle size={16} className="text-red-400 inline ml-2" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      {!answered && (
        <Button onClick={submit} disabled={matches.size !== leftItems.length} className="w-full mt-4">
          Valider les associations
        </Button>
      )}
    </div>
  );
}
