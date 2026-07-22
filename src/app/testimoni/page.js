'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { SkeletonText, SkeletonAvatar } from '@/components/Skeleton';
import { useTitle } from '@/hooks/useTitle';
import Breadcrumb from '@/components/Breadcrumb';

const cardStyles = [
  { gradient: 'from-primary/10 to-rose/5 border-primary/20', badge: 'bg-primary/20 text-primary' },
  { gradient: 'from-accent/10 to-warm/5 border-accent/20', badge: 'bg-accent/20 text-accent' },
  { gradient: 'from-mint/10 to-sky/5 border-mint/20', badge: 'bg-mint/30 text-mint' },
  { gradient: 'from-secondary/10 to-lavender/5 border-secondary/20', badge: 'bg-secondary/20 text-secondary' },
];

const quotes = ['“', '”', '„', '‟'];

export default function TestimoniPage() {
  useTitle(`Testimoni - ${siteConfig.name}`);
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, message: '' });
  const [submitted, setSubmitted] = useState(false);

  const fetchTestimonials = () => {
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const avgRating = useMemo(() => {
    if (testimonials.length === 0) return 0;
    return (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);
  }, [testimonials]);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', rating: 5, message: '' });
    setSubmitted(true);
    fetchTestimonials();
    setTimeout(() => setSubmitted(false), 3000);
  };

  const gridLayout = useMemo(() => {
    return testimonials.map((_, i) => {
      if (i % 5 === 0) return 'md:col-span-2 md:row-span-1';
      if (i % 5 === 3) return 'md:col-span-1 md:row-span-2';
      return 'md:col-span-1 md:row-span-1';
    });
  }, [testimonials]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Stats */}
      <div className="relative mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-rose/5 -z-10" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob -z-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-blob -z-10" style={{ animationDelay: '3s' }} />

        <div className="max-w-4xl mx-auto px-6 pt-10 pb-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl text-3xl mb-5 shadow-xl shadow-accent/20"
          >
            💬
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-dark dark:text-white font-display mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {siteConfig.testimoniPage.title}
          </motion.h1>

          <motion.p
            className="text-text-muted mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {siteConfig.testimoniPage.subtitle}
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-dark dark:text-white font-display">{testimonials.length}</p>
              <p className="text-xs text-text-muted mt-1">{siteConfig.testimoniPage.stats.totalLabel}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-accent font-display">{avgRating}</p>
              <p className="text-xs text-text-muted mt-1">{siteConfig.testimoniPage.stats.avgLabel}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary font-display">⭐</p>
              <p className="text-xs text-text-muted mt-1">{siteConfig.testimoniPage.stats.highestLabel}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Testimoni' }]} />

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-dark-soft/20 rounded" />
                  ))}
                </div>
                <SkeletonText lines={3} />
                <div className="flex items-center gap-3 mt-4">
                  <SkeletonAvatar />
                  <div className="h-4 bg-dark-soft/20 rounded-lg w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {testimonials.map((t, i) => {
              const s = cardStyles[i % cardStyles.length];
              const span = gridLayout[i];
              return (
                <motion.div
                  key={t.id}
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  className={`bg-white dark:bg-card rounded-2xl p-6 border border-border/50 bg-gradient-to-br ${s.gradient} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group ${span}`}
                >
                  {/* Decorative quote */}
                  <span className="absolute -top-3 -right-2 text-7xl md:text-8xl text-dark-soft/10 dark:text-white/5 font-serif-display leading-none select-none group-hover:scale-110 transition-transform duration-500">
                    {quotes[i % quotes.length]}
                  </span>

                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className={`text-sm ${idx < t.rating ? '' : 'opacity-30'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>

                    {/* Message */}
                    <p className="text-text-muted leading-relaxed mb-4 text-sm">
                      &ldquo;{t.message}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {t.photo ? (
                          <img
                            src={t.photo}
                            alt={t.name}
                            className="w-9 h-9 rounded-xl object-cover border-2 border-white/20 shadow-sm"
                          />
                        ) : (
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} border ${s.border} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                            {t.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-dark dark:text-white text-sm">{t.name}</p>
                          <p className="text-[10px] text-text-muted">{t.createdAt}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badge}`}>
                        {t.rating}.0
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          className="bg-white dark:bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-xl shadow-black/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-rose rounded-xl flex items-center justify-center text-lg shadow-md">
              ✍️
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark dark:text-white font-display">Tulis Testimoni</h2>
              <p className="text-xs text-text-muted">Bagikan pengalaman kamu dengan {siteConfig.name}</p>
            </div>
          </div>

          <AnimatePresence>
            {submitted && (
              <motion.div
                className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-5 py-3 rounded-xl mb-4 flex items-center gap-2 text-sm"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
              >
                ✅ Terima kasih! Testimoni Anda telah dikirim.
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Nama Anda</label>
                <input
                  type="text"
                  placeholder="Masukkan nama..."
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Rating</label>
                <div className="flex gap-1.5 h-[42px] items-center px-4 rounded-xl border border-border bg-white dark:bg-card">
                  {[5, 4, 3, 2, 1].map(n => (
                    <motion.button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, rating: n })}
                      className={`text-xl transition-all duration-200 ${form.rating >= n ? '' : 'opacity-30 grayscale'}`}
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ⭐
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Pesan</label>
              <textarea
                placeholder="Tulis pengalaman kamu..."
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all h-28 resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-rose text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Kirim Testimoni
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
