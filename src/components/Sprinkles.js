'use client';

import { useEffect, useState } from 'react';

const EMOJIS = ['✨', '⭐', '🌟', '💖', '🌈', '🍭', '🎀', '🦋'];
const COLORS = ['bg-pink-400', 'bg-purple-400', 'bg-yellow-400', 'bg-mint-400', 'bg-blue-400', 'bg-orange-400'];

export default function Sprinkles({ count = 15 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      size: 8 + Math.random() * 12,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      isEmoji: Math.random() > 0.5,
    }));
    setParticles(items);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-sprinkle"
          style={{
            left: `${p.left}%`,
            top: `-5%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
