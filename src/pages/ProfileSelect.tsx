import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useProfileStore } from '../stores/useProfileStore';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

interface Props {
  onSelect: () => void;
  onCreateNew: () => void;
}

export default function ProfileSelect({ onSelect, onCreateNew }: Props) {
  const { profiles, selectProfile, deleteProfile } = useProfileStore();

  const handleSelect = (id: string) => {
    selectProfile(id);
    onSelect();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold mb-2">Qui es-tu ?</h1>
        <p className="text-white/50">Sélectionne ton profil ou crées-en un nouveau</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl w-full mb-8">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="relative group"
          >
            <button
              onClick={() => handleSelect(profile.id)}
              className="w-full p-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl transition-all text-center cursor-pointer"
            >
              <Avatar index={profile.avatarIndex} size={64} className="mx-auto mb-3" />
              <p className="font-semibold truncate">{profile.name}</p>
              <p className="text-xs text-white/40">Niv. {profile.level}</p>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); deleteProfile(profile.id); }}
              className="absolute -top-2 -right-2 w-7 h-7 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: profiles.length * 0.05 }}
          onClick={onCreateNew}
          className="w-full p-4 border-2 border-dashed border-white/20 hover:border-violet-400 rounded-2xl transition-all text-center cursor-pointer hover:bg-white/5"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Plus size={28} className="text-white/50" />
          </div>
          <p className="text-white/50">Nouveau</p>
        </motion.button>
      </div>
    </div>
  );
}
