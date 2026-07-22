'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonCard } from '@/components/Skeleton';
import { useTitle } from '@/hooks/useTitle';
import Breadcrumb from '@/components/Breadcrumb';

export default function GaleriPage() {
  useTitle('Galeri - SweetCake');
  const [gallery, setGallery] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(setGallery);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-rose/5 via-accent/5 to-primary/5 h-48 -z-10" />
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-dark dark:text-white font-display mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Galeri Foto
          </motion.h1>
          <motion.p
            className="text-text-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Lihat hasil karya kue kami
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Galeri' }]} />

        {gallery.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} className="h-64" />
            ))}
          </div>
        ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {gallery.map((item, i) => {
            const gradients = [
              'from-primary/20 to-rose/10',
              'from-accent/20 to-warm/10',
              'from-mint/20 to-sky/10',
              'from-secondary/20 to-lavender/10',
              'from-coral/20 to-primary/10',
            ];
            return (
              <motion.div
                key={item.id}
                variants={{
                  initial: { opacity: 0, y: 30, scale: 0.95 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                }}
                onClick={() => setLightbox(item)}
                className="group cursor-pointer"
              >
                <div className={`relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]} border border-border/50`}>
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <motion.span
                      className="glass text-white px-5 py-2 rounded-full text-sm font-medium"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      🔍 Lihat Detail
                    </motion.span>
                  </div>
                </div>
                <p className="text-sm text-text-muted mt-3 text-center font-medium">{item.caption}</p>
              </motion.div>
            );
          })}
        </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="max-w-2xl w-full"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="relative h-[24rem]">
                  <img
                    src={lightbox.image}
                    alt={lightbox.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-dark dark:text-white font-display">{lightbox.caption}</h3>
                    <p className="text-text-muted text-sm mt-1">Koleksi SweetCake</p>
                  </div>
                  <motion.button
                    onClick={() => setLightbox(null)}
                    className="w-10 h-10 rounded-full bg-dark dark:bg-white text-white dark:text-dark flex items-center justify-center font-bold hover:scale-105 transition-transform"
                    whileHover={{ rotate: 90 }}
                  >
                    ✕
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
