import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Send } from 'lucide-react';
import Button from '../ui/Button';
import type { Question } from '../../types';
import { matchFillBlank } from '../../lib/textMatch';

interface Props {
  question: Question;
  onAnswer: (selected: string[], correct: boolean) => void;
  disabled: boolean;
}

export default function FillBlank({ question, onAnswer, disabled }: Props) {
  const expected = question.correct as string[];
  const parts = question.question.split('___');
  const [values, setValues] = useState<string[]>(new Array(expected.length).fill(''));
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const submit = () => {
    if (disabled || answered || values.some(v => !v.trim())) return;
    const res = values.map((v, i) => matchFillBlank(v, expected[i]));
    setResults(res);
    setAnswered(true);
    const allCorrect = res.every(Boolean);
    onAnswer(values, allCorrect);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-lg leading-relaxed">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < expected.length && (
              <span className="inline-block mx-1 align-middle">
                <input
                  type="text"
                  value={values[i]}
                  onChange={e => {
                    const next = [...values];
                    next[i] = e.target.value;
                    setValues(next);
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={disabled || answered}
                  placeholder={`mot ${i + 1}`}
                  className={`w-40 px-3 py-1 rounded-lg border-2 bg-white/5 text-white text-center outline-none transition-all ${
                    answered
                      ? results[i] ? 'border-emerald-400' : 'border-red-400'
                      : 'border-white/20 focus:border-violet-400'
                  }`}
                />
                {answered && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block ml-1 align-middle">
                    {results[i]
                      ? <CheckCircle size={18} className="text-emerald-400 inline" />
                      : <XCircle size={18} className="text-red-400 inline" />
                    }
                  </motion.span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>
      {answered && results.some(r => !r) && (
        <div className="text-sm text-white/60">
          <span className="font-semibold text-white/80">Réponses attendues : </span>
          {expected.join(', ')}
        </div>
      )}
      {!answered && (
        <Button onClick={submit} disabled={values.some(v => !v.trim())} className="w-full">
          <Send size={16} className="inline mr-2" />
          Valider
        </Button>
      )}
    </div>
  );
}
