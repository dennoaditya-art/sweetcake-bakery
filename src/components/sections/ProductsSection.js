'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import ParallaxSection from '@/components/ParallaxSection';
import Reveal from '@/components/Reveal';

const GRADIENTS = [
  'from-primary/20 to-rose/10',
  'from-accent/20 to-warm/10',
  'from-mint/20 to-sky/10',
  'from-secondary/20 to-lavender/10',
];

export default function ProductsSection({ products }) {
  const productDelays = useMemo(() => {
    const arr = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.5];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <ParallaxSection
      bgImage="https://images.unsplash.com/photo-1563729784474-d76d0c2be5c6?w=1920&h=1080&fit=crop"
      overlayColor="from-black/80 via-black/50 to-black/80"
      className="min-h-screen py-12 md:py-20"
    >
      <div className="h-full flex flex-col items-center justify-center px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-display text-shadow">
              {siteConfig.productsSection.title}
            </h2>
            <p className="text-white/60 max-w-md mx-auto">
              {siteConfig.productsSection.subtitle}
            </p>
          </div>
        </Reveal>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl">
            {products.slice(0, 8).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.9,
                  delay: productDelays[i],
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link
                  href={`/katalog/${product.id}`}
                  className="group relative block aspect-square rounded-2xl overflow-hidden bg-dark-soft"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 group-hover:from-black/50 transition-all duration-500" />
                  <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${GRADIENTS[i % GRADIENTS.length]} text-white border border-white/20 backdrop-blur`}>
                    {siteConfig.productBadges[i % siteConfig.productBadges.length]}
                  </span>
                  <div className="absolute inset-0 flex items-end p-3">
                    <motion.div
                      className="w-full"
                      initial={false}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-bold text-white text-xs md:text-sm font-display leading-tight drop-shadow-lg">
                        {product.name}
                      </h3>
                      <p className="text-accent font-bold text-xs mt-0.5 drop-shadow">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 group-hover:ring-white/20 transition-all duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <motion.div
              className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}

        <Reveal delay={0.3}>
          <div className="mt-12">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 glass text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              Lihat Semua Menu
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </Reveal>
      </div>
    </ParallaxSection>
  );
}
