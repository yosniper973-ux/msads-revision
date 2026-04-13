import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Send } from 'lucide-react';
import Button from '../ui/Button';
import type { Question } from '../../types';
import { matchKeywords } from '../../lib/textMatch';

interface Props {
  question: Question;
  onAnswer: (selected: string[], correct: boolean) => void;
  disabled: boolean;
}

export default function OpenText({ question, onAnswer, disabled }: Props) {
  const [text, setText] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const submit = () => {
    if (disabled || answered || !text.trim()) return;
    const correct = matchKeywords(text, question.keywords);
    setIsCorrect(correct);
    setAnswered(true);
    onAnswer([text], correct);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || answered}
          placeholder="Tapez votre réponse ici..."
          rows={3}
          className={`w-full p-4 rounded-xl border-2 bg-white/5 text-white placeholder-white/30 outline-none resize-none transition-all ${
            answered
              ? isCorrect ? 'border-emerald-400' : 'border-red-400'
              : 'border-white/10 focus:border-violet-400'
          }`}
        />
        {answered && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3"
          >
            {isCorrect
              ? <CheckCircle size={24} className="text-emerald-400" />
              : <XCircle size={24} className="text-red-400" />
            }
          </motion.div>
        )}
      </div>
      {answered && (
        <div className="text-sm text-white/60">
          <span className="font-semibold text-white/80">Mots-clés attendus : </span>
          {question.keywords.join(', ')}
        </div>
      )}
      {!answered && (
        <Button onClick={submit} disabled={!text.trim()} className="w-full">
          <Send size={16} className="inline mr-2" />
          Valider
        </Button>
      )}
    </div>
  );
}
