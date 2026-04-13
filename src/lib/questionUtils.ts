import type { Question } from '../types';
import questionsData from '../data/questions.json';

export const allQuestions: Question[] = questionsData as Question[];

export function getQuestionsByModule(module: number): Question[] {
  return allQuestions.filter(q => q.module === module);
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickQuestions(module: number | 'all', count: number): Question[] {
  const pool = module === 'all' ? allQuestions : getQuestionsByModule(module);
  return shuffleArray(pool).slice(0, count);
}

export function getModuleStats(history: { module: number | 'all'; score: number; total: number }[]) {
  const stats: Record<number, { attempts: number; avgScore: number; bestScore: number }> = {};
  for (let m = 1; m <= 6; m++) {
    const moduleResults = history.filter(h => h.module === m);
    if (moduleResults.length === 0) {
      stats[m] = { attempts: 0, avgScore: 0, bestScore: 0 };
    } else {
      const scores = moduleResults.map(h => (h.score / h.total) * 20);
      stats[m] = {
        attempts: moduleResults.length,
        avgScore: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10,
        bestScore: Math.max(...scores),
      };
    }
  }
  return stats;
}

export function getStars(avgScore: number): number {
  if (avgScore >= 18) return 3;
  if (avgScore >= 14) return 2;
  if (avgScore >= 10) return 1;
  return 0;
}
