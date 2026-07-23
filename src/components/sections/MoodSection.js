'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import ParallaxSection from '@/components/ParallaxSection';
import CakeMood from '@/components/CakeMood';

export default function MoodSection() {
  return (
    <ParallaxSection
      bgImage="https://images.unsplash.com/photo-1486427944544-d2c246c4df1a?w=1920&h=1080&fit=crop"
      overlayColor="from-black/75 via-black/50 to-black/80"
      className="min-h-screen md:h-screen"
    >
      <div className="h-full flex flex-col items-center justify-center px-6 relative">
        <motion.div
          className="absolute top-12 left-8 text-2xl opacity-20 hidden md:block"
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🍪
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-3xl opacity-20 hidden md:block"
          animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          🧁
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-12 text-xl opacity-15 hidden md:block"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          🎀
        </motion.div>

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent via-primary to-rose rounded-2xl text-3xl mb-5 shadow-xl shadow-accent/20">
              💭
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-3 font-display text-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {siteConfig.moodSection.title}<span className="bg-gradient-to-r from-accent via-primary to-rose bg-clip-text text-transparent">{siteConfig.moodSection.titleHighlight}</span>?
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-md mx-auto text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {siteConfig.moodSection.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <CakeMood />
        </motion.div>
      </div>
    </ParallaxSection>
  );
}
