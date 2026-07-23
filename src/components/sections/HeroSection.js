'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '@/lib/config';

const BG_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1920&h=1080&fit=crop',
};

export default function HeroSection({ products }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-screen md:h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
        <img src={BG_IMAGES.hero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ y: heroContentY, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="pt-16 sm:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 glass text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse-soft" />
                  {siteConfig.hero.badge}
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-4 font-display"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {siteConfig.hero.title}
                <br />
                <span className="bg-gradient-to-r from-accent via-primary to-rose bg-clip-text text-transparent">
                  {siteConfig.hero.titleHighlight}
                </span>
              </motion.h1>

              <motion.p
                className="text-white/80 text-lg md:text-xl max-w-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {siteConfig.hero.subtitle}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href="/katalog"
                  className="group bg-gradient-to-r from-primary to-coral text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-sm sm:text-base inline-flex items-center gap-2 min-h-[44px]"
                >
                  {siteConfig.hero.cta}
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </Link>
                <Link
                  href="/tentang"
                  className="glass text-white/80 font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-300 text-sm sm:text-base min-h-[44px] inline-flex items-center"
                >
                  {siteConfig.nav.links.find(l => l.href === '/tentang')?.label || 'Cerita Kami'}
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <div className="flex -space-x-3">
                  {['😊', '🥰', '😋', '🤩'].map((e, i) => (
                    <motion.span
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-sm bg-white/10 backdrop-blur"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
                <p className="text-white/50 text-sm">
                  {siteConfig.hero.socialProof.replace('{count}', siteConfig.hero.socialProofCount)}
                </p>
              </motion.div>
            </div>

            {products.length > 0 && (
              <motion.div
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="relative w-96 h-96">
                  <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-accent/10 to-coral/20 rounded-full blur-3xl" />
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      initial={{ rotate: (i - 1) * 8, y: (i - 1) * 20, scale: 1 - i * 0.08 }}
                      animate={{
                        rotate: (i - 1) * 8,
                        y: (i - 1) * 20,
                        scale: 1 - i * 0.08,
                      }}
                      transition={{ duration: 0.8, delay: 0.2 * i }}
                    >
                      <Link
                        href={`/katalog/${products[i]?.id}`}
                        className="block w-full h-full rounded-[2rem] overflow-hidden shadow-2xl group"
                      >
                        <img
                          src={products[i]?.image}
                          alt={products[i]?.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute bottom-4 left-4 text-white font-bold drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {products[i]?.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Gulir</span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center p-1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-2.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
