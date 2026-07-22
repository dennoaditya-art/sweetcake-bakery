'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminTestimoniPage() {
  const [testimonials, setTestimonials] = useState([]);

  const fetchData = () => {
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async id => {
    if (!confirm('Hapus testimoni ini?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark dark:text-white font-display">Manajemen Testimoni</h1>
        <p className="text-text-muted text-sm mt-1">{testimonials.length} testimoni</p>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">💬</span>
          <p className="text-text-muted">Belum ada testimoni.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-card rounded-2xl p-5 border border-border/50 flex justify-between items-start gap-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-sm mb-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} className={idx < t.rating ? 'text-accent' : 'text-border'}>{idx < t.rating ? '⭐' : '☆'}</span>
                  ))}
                </div>
                <p className="text-text-muted italic leading-relaxed mb-2">&ldquo;{t.message}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-dark dark:text-white text-sm">— {t.name}</span>
                  <span className="text-xs text-text-muted">{t.createdAt}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors shrink-0"
              >
                Hapus
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
