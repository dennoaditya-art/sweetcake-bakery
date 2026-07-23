'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import ParallaxSection from '@/components/ParallaxSection';
import Reveal from '@/components/Reveal';

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-50px' },
};

const staggerItem = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

const CATEGORY_COLORS = [
  'from-primary/20 to-rose/20 border-primary/30',
  'from-accent/20 to-warm/20 border-accent/30',
  'from-mint/20 to-sky/20 border-mint/30',
  'from-secondary/20 to-lavender/20 border-secondary/30',
  'from-coral/20 to-primary/20 border-coral/30',
];

const CATEGORY_IMAGES = [
  'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1486427944544-d2c246c4df1a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1563729784474-d76d0c2be5c6?w=400&h=400&fit=crop',
];

export default function CategoriesSection({ categories }) {
  return (
    <ParallaxSection
      bgImage="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1920&h=1080&fit=crop"
      overlayColor="from-black/75 via-black/50 to-black/70"
      className="min-h-screen md:h-screen"
    >
      <div className="h-full flex flex-col items-center justify-center px-6">
        <Reveal>
          <div className="text-center mb-12">
            <motion.span
              className="text-5xl mb-4 block"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎂
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-display text-shadow">
              {siteConfig.categoriesSection.title}
            </h2>
            <p className="text-white/60 max-w-md mx-auto">
              {siteConfig.categoriesSection.subtitle}
            </p>
          </div>
        </Reveal>

        <motion.div
          className="flex flex-wrap gap-4 justify-center w-full max-w-4xl"
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {categories.map((cat, i) => (
            <motion.div key={cat.id} variants={staggerItem}>
              <Link
                href={`/katalog?category=${cat.id}`}
                className={`group relative block w-36 sm:w-40 h-44 sm:h-48 rounded-2xl overflow-hidden bg-gradient-to-b ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]} hover:shadow-2xl hover:shadow-white/10 transition-all duration-500`}
              >
                <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                  <img
                    src={CATEGORY_IMAGES[i % CATEGORY_IMAGES.length]}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                  <motion.span
                    className="text-4xl mb-2 block"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {siteConfig.categoryEmojis[i % siteConfig.categoryEmojis.length]}
                  </motion.span>
                  <h3 className="font-bold text-white text-sm font-display text-center drop-shadow-lg">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-white/70 mt-1 text-center leading-tight">
                    {cat.description?.split(' ').slice(0, 4).join(' ')}...
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ParallaxSection>
  );
}
