export type QuestionType = 'qcm_single' | 'qcm_multi' | 'true_false' | 'open_text' | 'drag_drop' | 'fill_blank';

export interface DragDropOption {
  left: string;
  right: string;
}

export interface Question {
  id: string;
  module: number;
  type: QuestionType;
  difficulty: number;
  question: string;
  options: string[] | DragDropOption[];
  correct: (number | string)[];
  keywords: string[];
  explanation: string;
}

export interface GameResult {
  id: string;
  date: string;
  mode: 'exam' | 'quiz';
  module: number | 'all';
  score: number;
  total: number;
  points?: number;
  details: AnswerDetail[];
}

export interface AnswerDetail {
  questionId: string;
  correct: boolean;
  userAnswer: (number | string)[];
  timeSpent?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (profile: Profile) => boolean;
}

export interface Profile {
  id: string;
  name: string;
  avatarIndex: number;
  createdAt: string;
  xp: number;
  level: number;
  history: GameResult[];
  badges: string[];
  bestScores: Record<string, number>;
}

export interface AppData {
  profiles: Profile[];
  activeProfileId: string | null;
}

export const MODULE_NAMES: Record<number, string> = {
  1: 'Fondamentaux & Déontologie',
  2: 'Posture du médiateur',
  3: 'Processus & Techniques de médiation',
  4: 'Accès aux droits & Numérique',
  5: 'Veille sociale & Territoire',
  6: 'Inclusion & Handicap',
};

export const MODULE_COLORS: Record<number, string> = {
  1: 'from-violet-500 to-purple-600',
  2: 'from-orange-400 to-red-500',
  3: 'from-cyan-400 to-blue-500',
  4: 'from-emerald-400 to-teal-500',
  5: 'from-amber-400 to-orange-500',
  6: 'from-pink-400 to-rose-500',
};

export const MODULE_ICONS: Record<number, string> = {
  1: 'BookOpen',
  2: 'Users',
  3: 'MessageCircle',
  4: 'Monitor',
  5: 'Map',
  6: 'Heart',
};
