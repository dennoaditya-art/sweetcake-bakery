'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['✨', '⭐', '🌟', '💖', '🌈', '🍭', '🎀', '🦋'];

export default function Sprinkles({ count = 15 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: ((i * 13 + 7) % 100),
      delay: (i * 0.7) % 5,
      duration: 4 + ((i * 3) % 6),
      size: 12 + ((i * 5) % 16),
      emoji: EMOJIS[i % EMOJIS.length],
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(items);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.left}%`, fontSize: `${p.size}px` }}
          initial={{ y: '-10vh', opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0],
            rotate: 720,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
