import type { Badge, Profile } from '../types';

export const BADGES: Badge[] = [
  {
    id: 'first_perfect',
    name: 'Premier 20/20',
    description: 'Obtenir un score parfait en mode examen',
    icon: 'Trophy',
    condition: (p: Profile) => p.history.some(h => h.mode === 'exam' && h.score === h.total),
  },
  {
    id: 'streak_10',
    name: 'Série de 10',
    description: '10 bonnes réponses consécutives',
    icon: 'Flame',
    condition: (p: Profile) => {
      return p.history.some(h => {
        let streak = 0;
        for (const d of h.details) {
          if (d.correct) { streak++; if (streak >= 10) return true; }
          else streak = 0;
        }
        return false;
      });
    },
  },
  {
    id: 'module_master',
    name: 'Module maîtrisé',
    description: 'Obtenir au moins 18/20 sur un module en examen',
    icon: 'Star',
    condition: (p: Profile) => p.history.some(h => h.mode === 'exam' && h.score >= 18),
  },
  {
    id: 'marathoner',
    name: 'Marathonien',
    description: 'Répondre à 50 questions d\'affilée',
    icon: 'Footprints',
    condition: (p: Profile) => {
      let total = 0;
      for (const h of p.history) { total += h.details.length; }
      return total >= 50;
    },
  },
  {
    id: 'all_modules',
    name: 'Explorateur',
    description: 'Passer un examen dans chacun des 6 modules',
    icon: 'Compass',
    condition: (p: Profile) => {
      const modules = new Set(p.history.filter(h => h.mode === 'exam' && typeof h.module === 'number').map(h => h.module));
      return modules.size >= 6;
    },
  },
  {
    id: 'speed_demon',
    name: 'Éclair',
    description: 'Obtenir plus de 1500 points en mode quiz',
    icon: 'Zap',
    condition: (p: Profile) => p.history.some(h => h.mode === 'quiz' && (h.points ?? 0) >= 1500),
  },
  {
    id: 'persistent',
    name: 'Persévérant',
    description: 'Passer 10 examens au total',
    icon: 'Repeat',
    condition: (p: Profile) => p.history.filter(h => h.mode === 'exam').length >= 10,
  },
  {
    id: 'quiz_master',
    name: 'Maître du Quiz',
    description: 'Obtenir plus de 2000 points en mode quiz',
    icon: 'Crown',
    condition: (p: Profile) => p.history.some(h => h.mode === 'quiz' && (h.points ?? 0) >= 2000),
  },
];
