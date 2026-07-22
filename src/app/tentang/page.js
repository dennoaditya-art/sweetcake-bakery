'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { useTitle } from '@/hooks/useTitle';
import Breadcrumb from '@/components/Breadcrumb';

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function TentangPage() {
  useTitle(`Tentang - ${siteConfig.name}`);
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-soft via-primary/10 to-dark-soft" />
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob"
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '3s' }}
        />
        <div className="relative z-10 text-center px-6 pb-16">
          <motion.span
            className="text-6xl mb-4 block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            🧁
          </motion.span>
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white font-display mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {siteConfig.aboutPage.title}
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {siteConfig.aboutPage.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        <motion.div
          className="bg-white dark:bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-xl shadow-black/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Breadcrumb items={[{ label: 'Tentang' }]} />
          <motion.div className="space-y-10 mt-6">
          {/* Cerita Kami */}
          <motion.section variants={fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-gradient-to-br from-primary to-rose rounded-xl flex items-center justify-center text-lg">📖</span>
              <h2 className="text-2xl font-bold text-dark dark:text-white font-display">{siteConfig.aboutPage.story.title}</h2>
            </div>
            <p className="text-text-muted leading-relaxed">
              {siteConfig.aboutPage.story.content}
            </p>
          </motion.section>

          {/* Visi */}
          <motion.section variants={fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-gradient-to-br from-accent to-warm rounded-xl flex items-center justify-center text-lg">🎯</span>
              <h2 className="text-2xl font-bold text-dark dark:text-white font-display">{siteConfig.aboutPage.vision.title}</h2>
            </div>
            <p className="text-text-muted leading-relaxed italic">
              &ldquo;{siteConfig.aboutPage.vision.content}&rdquo;
            </p>
          </motion.section>

          {/* Misi */}
          <motion.section variants={fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-gradient-to-br from-mint to-sky rounded-xl flex items-center justify-center text-lg">⭐</span>
              <h2 className="text-2xl font-bold text-dark dark:text-white font-display">Misi</h2>
            </div>
            <ul className="space-y-3">
              {[
                { icon: '🥚', text: 'Menggunakan bahan-bahan berkualitas terbaik tanpa pengawet' },
                { icon: '🎂', text: 'Menjaga konsistensi rasa dan kualitas produk' },
                { icon: '💝', text: 'Memberikan pelayanan terbaik kepada setiap pelanggan' },
                { icon: '✨', text: 'Terus berinovasi dalam menciptakan varian kue baru' },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-text-muted"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm shrink-0">
                    {item.icon}
                  </span>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Mengapa Memilih Kami */}
          <motion.section variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 bg-gradient-to-br from-secondary to-lavender rounded-xl flex items-center justify-center text-lg">💪</span>
              <h2 className="text-2xl font-bold text-dark dark:text-white font-display">Mengapa Memilih Kami?</h2>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {siteConfig.aboutReasons.map((r, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`bg-gradient-to-br ${r.color} p-6 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {r.icon}
                  </motion.div>
                  <h3 className="font-bold text-dark text-base font-display">{r.title}</h3>
                  <p className="text-sm text-dark/60 mt-1">{r.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
