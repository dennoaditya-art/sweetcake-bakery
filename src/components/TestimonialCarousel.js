'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const gradients = [
  { from: 'from-primary/20', to: 'to-rose/10', border: 'border-primary/30' },
  { from: 'from-accent/20', to: 'to-warm/10', border: 'border-accent/30' },
  { from: 'from-mint/20', to: 'to-sky/10', border: 'border-mint/30' },
  { from: 'from-secondary/20', to: 'to-lavender/10', border: 'border-secondary/30' },
];

export default function TestimonialCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];
  const g = gradients[current % gradients.length];

  const variants = {
    enter: dir => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: dir => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`glass rounded-3xl p-8 md:p-10 border ${g.border}`}
            >
              {/* Large quote mark */}
              <div className="text-5xl md:text-6xl text-white/10 leading-none mb-2 font-serif-display">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + idx * 0.08, type: 'spring', stiffness: 200 }}
                    className={idx < t.rating ? '' : 'opacity-30'}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              {/* Message */}
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                {t.message}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {t.photo ? (
                  <motion.img
                    src={t.photo}
                    alt={t.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
                    animate={{ rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ) : (
                  <motion.div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${g.from} ${g.to} border ${g.border} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    animate={{ rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {t.name.charAt(0)}
                  </motion.div>
                )}
                <div>
                  <p className="font-bold text-white text-base">{t.name}</p>
                  <p className="text-xs text-white/40">{t.createdAt}</p>
                </div>
              </div>

              {/* Gradient line decoration */}
              <div className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${g.from} ${g.to} rounded-full opacity-60`} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2.5 bg-primary'
                  : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Testimoni ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <Link
        href="/testimoni"
        className="mt-6 inline-flex items-center gap-1.5 text-white/50 hover:text-accent transition-colors text-sm font-medium mx-auto"
      >
        Lihat Semua Testimoni
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </Link>
    </div>
  );
}
