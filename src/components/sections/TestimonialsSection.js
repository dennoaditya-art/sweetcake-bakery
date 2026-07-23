'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import ParallaxSection from '@/components/ParallaxSection';
import Reveal from '@/components/Reveal';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export default function TestimonialsSection({ testimonials }) {
  return (
    <ParallaxSection
      bgImage="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&h=1080&fit=crop"
      overlayColor="from-black/70 via-black/50 to-black/70"
      className="min-h-screen md:h-screen"
    >
      <div className="h-full flex flex-col items-center justify-center px-6">
        <Reveal>
          <div className="text-center mb-10">
            <motion.span
              className="text-5xl mb-4 block"
              animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💬
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-display text-shadow">
              {siteConfig.testimonialsSection.title}
            </h2>
            <p className="text-white/60 max-w-md mx-auto">
              {siteConfig.testimonialsSection.subtitle}
            </p>
          </div>
        </Reveal>

        {testimonials.length > 0 && <TestimonialCarousel testimonials={testimonials} />}

        <Reveal delay={0.3}>
          <Link
            href="/testimoni"
            className="mt-8 inline-flex items-center gap-1 text-accent font-bold hover:gap-2 transition-all"
          >
            Lihat Semua Testimoni
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </Reveal>
      </div>
    </ParallaxSection>
  );
}
