export function calcQuizPoints(correct: boolean, timeRemainingMs: number, combo: number): {
  points: number;
  newCombo: number;
} {
  if (!correct) {
    return { points: 0, newCombo: 0 };
  }
  const basePoints = 100;
  const timeBonus = Math.round((timeRemainingMs / 35000) * 50);
  const multiplier = combo >= 5 ? 3 : combo >= 2 ? 2 : 1;
  const points = (basePoints + timeBonus) * multiplier;
  return { points, newCombo: combo + 1 };
}

export function getRecommendation(score: number, total: number): {
  text: string;
  color: string;
  emoji: string;
} {
  const ratio = score / total;
  if (ratio >= 0.9) return { text: 'Tu maîtrises !', color: 'text-emerald-400', emoji: '' };
  if (ratio >= 0.7) return { text: 'À revoir sur quelques points', color: 'text-amber-400', emoji: '' };
  return { text: 'À retravailler en priorité', color: 'text-red-400', emoji: '' };
}
