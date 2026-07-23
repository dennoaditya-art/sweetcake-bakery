'use client';

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

export default function InstagramSection() {
  return (
    <ParallaxSection
      bgImage="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&h=1080&fit=crop"
      overlayColor="from-black/75 via-black/50 to-black/70"
      className="min-h-screen md:h-screen"
    >
      <div className="h-full flex flex-col items-center justify-center px-6">
        <Reveal>
          <div className="text-center mb-10">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl text-3xl mb-4 shadow-lg"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              📸
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-display text-shadow">
              {siteConfig.instagramSection.title}
            </h2>
            <p className="text-white/80">
              {siteConfig.instagramSection.subtitle.replace('{handle}', siteConfig.social.instagramHandle)}
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {siteConfig.instagramSection.posts.map((post, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                {post.emoji}
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white">
                  <p className="text-sm font-medium">{post.caption}</p>
                  <p className="text-xs text-white/70 mt-1">❤️ {post.likes} suka</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.3}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-white font-bold px-8 py-3 rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base"
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              📱
            </motion.span>
            {siteConfig.instagramSection.cta.replace('{handle}', siteConfig.social.instagramHandle)}
          </a>
        </Reveal>
      </div>
    </ParallaxSection>
  );
}
