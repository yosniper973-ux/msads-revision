import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useProfileStore } from '../stores/useProfileStore';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

interface Props {
  onDone: () => void;
  onBack: () => void;
}

export default function ProfileCreate({ onDone, onBack }: Props) {
  const [name, setName] = useState('');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const { createProfile } = useProfileStore();

  const handleCreate = () => {
    if (!name.trim()) return;
    createProfile(name.trim(), avatarIndex);
    onDone();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <button onClick={onBack} className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
        <ArrowLeft size={24} />
      </button>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Nouveau profil</h1>
        <p className="text-white/50">Choisis un pseudo et un avatar</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md space-y-6"
      >
        <div>
          <label className="block text-sm text-white/60 mb-2">Pseudo</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="Ton prénom ou pseudo..."
            maxLength={20}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 outline-none focus:border-violet-400 transition-colors"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-3">Avatar</label>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 8 }, (_, i) => (
              <button
                key={i}
                onClick={() => setAvatarIndex(i)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  avatarIndex === i
                    ? 'border-violet-400 bg-violet-500/20 scale-110'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <Avatar index={i} size={48} className="mx-auto" />
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleCreate} disabled={!name.trim()} size="lg" className="w-full">
          Créer mon profil
        </Button>
      </motion.div>
    </div>
  );
}
