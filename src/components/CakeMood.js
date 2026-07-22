'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const moods = [
  {
    id: 'happy', icon: '😊', label: 'Ceria',
    vibe: 'Manis & ceria!', tag: 'kue basah',
    bg: 'from-amber-400 to-orange-400',
    shadow: 'shadow-amber-500/30',
    emoji: '🌈',
  },
  {
    id: 'celebrate', icon: '🎉', label: 'Rayakan',
    vibe: 'Waktunya pesta!', tag: 'cake',
    bg: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-500/30',
    emoji: '🎊',
  },
  {
    id: 'chill', icon: '😌', label: 'Santai',
    vibe: 'Ngemil santuy~', tag: 'kue kering',
    bg: 'from-emerald-400 to-teal-400',
    shadow: 'shadow-emerald-500/30',
    emoji: '🌿',
  },
  {
    id: 'love', icon: '🥰', label: 'Sayang',
    vibe: 'Buat tersayang 💕', tag: 'roti',
    bg: 'from-rose-400 to-pink-400',
    shadow: 'shadow-rose-500/30',
    emoji: '💝',
  },
  {
    id: 'cheer', icon: '🔥', label: 'Semangat',
    vibe: 'Semangat lagi!', tag: 'minuman',
    bg: 'from-violet-400 to-purple-400',
    shadow: 'shadow-violet-500/30',
    emoji: '⚡',
  },
];

export default function CakeMood() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleMood = mood => {
    setSelected(mood.id);
    setTimeout(() => {
      router.push(`/katalog?search=${encodeURIComponent(mood.tag)}`);
    }, 700);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={{
          initial: {},
          whileInView: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {moods.map(m => (
          <motion.button
            key={m.id}
            onClick={() => handleMood(m)}
            variants={{
              initial: { opacity: 0, y: 40, scale: 0.85 },
              whileInView: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ scale: 1.06, y: -8 }}
            whileTap={{ scale: 0.92 }}
            className={`group relative flex flex-col items-center gap-2 px-4 py-6 rounded-2xl transition-all duration-300 ${
              selected === m.id
                ? `bg-gradient-to-br ${m.bg} text-white shadow-xl ${m.shadow}`
                : 'bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20'
            }`}
          >
            {/* Hover glow */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${m.bg} blur-xl`} />

            <motion.span
              className="text-3xl md:text-4xl relative z-10"
              animate={selected === m.id ? {
                rotate: [0, -15, 15, -10, 0],
                scale: [1, 1.25, 1.15, 1],
              } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {m.icon}
            </motion.span>

            <motion.span
              className="text-xl relative z-10"
              animate={selected === m.id ? {
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              } : {}}
              transition={{ duration: 0.3, repeat: 2 }}
            >
              {m.emoji}
            </motion.span>

            <span className="font-bold text-sm font-display relative z-10">{m.label}</span>
            <span className="text-[10px] text-white/60 group-hover:text-white/90 transition-colors relative z-10">
              {m.vibe}
            </span>

            {selected === m.id && (
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                layoutId="moodIndicator"
                transition={{ type: 'spring', stiffness: 300 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 glass rounded-full px-6 py-3"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.span
                className="w-3 h-3 bg-accent rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-white font-semibold text-sm">
                Mencari kue yang cocok buat kamu...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
