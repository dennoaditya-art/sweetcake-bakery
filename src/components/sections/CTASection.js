'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import ParallaxSection from '@/components/ParallaxSection';
import Reveal from '@/components/Reveal';
import Sprinkles from '@/components/Sprinkles';

export default function CTASection() {
  return (
    <ParallaxSection
      bgImage="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop"
      overlayColor="from-black/70 via-black/50 to-black/70"
      className="min-h-screen md:h-screen"
    >
      <div className="h-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <Sprinkles count={20} />
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob"
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '3s' }}
        />

        <div className="relative z-10">
          <Reveal>
            <motion.span
              className="text-6xl mb-6 block"
              animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {siteConfig.ctaSection.emoji}
            </motion.span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display leading-tight text-shadow-lg">
              {siteConfig.ctaSection.title}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-white/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              {siteConfig.ctaSection.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/katalog"
                className="group bg-gradient-to-r from-primary to-coral text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base inline-flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  {siteConfig.ctaSection.ctaIcon}
                </motion.span>
                {siteConfig.ctaSection.cta}
              </Link>
              <Link
                href="/tentang"
                className="glass text-white/80 font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-300 text-base"
              >
                {siteConfig.ctaSection.secondaryCtaIcon} {siteConfig.ctaSection.secondaryCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </ParallaxSection>
  );
}
