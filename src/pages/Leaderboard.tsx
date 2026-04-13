import { motion } from 'framer-motion';
import { ChevronLeft, Trophy, Medal, Zap } from 'lucide-react';
import { useProfileStore } from '../stores/useProfileStore';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';

interface Props {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: Props) {
  const profiles = useProfileStore(s => s.profiles);

  const quizRanking = [...profiles]
    .map(p => {
      const quizResults = p.history.filter(h => h.mode === 'quiz');
      const bestPoints = quizResults.reduce((max, h) => Math.max(max, h.points ?? 0), 0);
      return { ...p, bestPoints };
    })
    .sort((a, b) => b.bestPoints - a.bestPoints);

  const examRanking = [...profiles]
    .map(p => {
      const examResults = p.history.filter(h => h.mode === 'exam');
      const avgScore = examResults.length > 0
        ? Math.round(examResults.reduce((sum, h) => sum + (h.score / h.total) * 20, 0) / examResults.length * 10) / 10
        : 0;
      return { ...p, avgScore };
    })
    .sort((a, b) => b.avgScore - a.avgScore);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Trophy size={20} className="text-amber-400" />;
    if (rank === 1) return <Medal size={20} className="text-gray-300" />;
    if (rank === 2) return <Medal size={20} className="text-amber-600" />;
    return <span className="text-sm text-white/40 w-5 text-center">{rank + 1}</span>;
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Classement</h1>
      </div>

      {profiles.length < 2 ? (
        <Card className="text-center py-12">
          <Trophy size={48} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/50">Créez au moins 2 profils pour voir le classement !</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quiz ranking */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={20} className="text-orange-400" />
              <h3 className="font-bold">Mode Quiz - Meilleur score</h3>
            </div>
            <div className="space-y-2">
              {quizRanking.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? 'bg-amber-500/10 border border-amber-400/20' : 'bg-white/5'}`}
                >
                  {getRankIcon(i)}
                  <Avatar index={p.avatarIndex} size={36} />
                  <span className="flex-1 font-medium">{p.name}</span>
                  <span className="font-bold text-orange-400">{p.bestPoints} pts</span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Exam ranking */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={20} className="text-violet-400" />
              <h3 className="font-bold">Mode Examen - Moyenne</h3>
            </div>
            <div className="space-y-2">
              {examRanking.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? 'bg-violet-500/10 border border-violet-400/20' : 'bg-white/5'}`}
                >
                  {getRankIcon(i)}
                  <Avatar index={p.avatarIndex} size={36} />
                  <span className="flex-1 font-medium">{p.name}</span>
                  <span className="font-bold text-violet-400">{p.avgScore}/20</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
