'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import Sprinkles from '@/components/Sprinkles';
import CakeMood from '@/components/CakeMood';
import ParallaxSection from '@/components/ParallaxSection';
import Reveal from '@/components/Reveal';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const BG_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1920&h=1080&fit=crop',
  mood: 'https://images.unsplash.com/photo-1486427944544-d2c246c4df1a?w=1920&h=1080&fit=crop',
  categories: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1920&h=1080&fit=crop',
  products: 'https://images.unsplash.com/photo-1563729784474-d76d0c2be5c6?w=1920&h=1080&fit=crop',
  instagram: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&h=1080&fit=crop',
  testimonials: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&h=1080&fit=crop',
  cta: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop',
};

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

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
    fetch('/api/categories').then(r => r.json()).then(setCategories);
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
  }, []);

  const productDelays = useMemo(() => {
    const arr = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.5];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img src={BG_IMAGES.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </motion.div>

        {/* Floating decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        </div>

        <motion.div
          className="relative z-10 h-full flex items-center"
          style={{ y: heroContentY, opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
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
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-4 font-display"
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
                    className="group bg-gradient-to-r from-primary to-coral text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base inline-flex items-center gap-2"
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
                    className="glass text-white/80 font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-300 text-base"
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

              {/* Hero Right - 3D Stacked Products */}
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

        {/* Scroll indicator */}
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

      {/* ===== CAKE MOOD ===== */}
      <ParallaxSection
        bgImage={BG_IMAGES.mood}
        overlayColor="from-black/75 via-black/50 to-black/80"
        className="h-screen"
      >
        <div className="h-full flex flex-col items-center justify-center px-6 relative">
          {/* Floating labels */}
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

      {/* ===== KATEGORI ===== */}
      <ParallaxSection
        bgImage={BG_IMAGES.categories}
        overlayColor="from-black/75 via-black/50 to-black/70"
        className="h-screen"
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
            {categories.map((cat, i) => {
              const emojis = siteConfig.categoryEmojis;
              const colors = [
                'from-primary/20 to-rose/20 border-primary/30',
                'from-accent/20 to-warm/20 border-accent/30',
                'from-mint/20 to-sky/20 border-mint/30',
                'from-secondary/20 to-lavender/20 border-secondary/30',
                'from-coral/20 to-primary/20 border-coral/30',
              ];
              const images = [
                'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1486427944544-d2c246c4df1a?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1563729784474-d76d0c2be5c6?w=400&h=400&fit=crop',
              ];

              return (
                <motion.div key={cat.id} variants={staggerItem}>
                  <Link
                    href={`/katalog?category=${cat.id}`}
                    className={`group relative block w-40 h-48 rounded-2xl overflow-hidden bg-gradient-to-b ${colors[i % colors.length]} border ${colors[i % colors.length].split(' ')[2]} hover:shadow-2xl hover:shadow-white/10 transition-all duration-500`}
                  >
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                      <img
                        src={images[i % images.length]}
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
                        {emojis[i % emojis.length]}
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
              );
            })}
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ===== PRODUK UNGGULAN ===== */}
      <ParallaxSection
        bgImage={BG_IMAGES.products}
        overlayColor="from-black/80 via-black/50 to-black/80"
        className="min-h-screen py-20"
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
              {products.slice(0, 8).map((product, i) => {
                const badges = siteConfig.productBadges;
                const gradients = [
                  'from-primary/20 to-rose/10',
                  'from-accent/20 to-warm/10',
                  'from-mint/20 to-sky/10',
                  'from-secondary/20 to-lavender/10',
                ];
                return (
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
                      <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${gradients[i % gradients.length]} text-white border border-white/20 backdrop-blur`}>
                        {badges[i % badges.length]}
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
                );
              })}
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

      {/* ===== INSTAGRAM FEED ===== */}
      <ParallaxSection
        bgImage={BG_IMAGES.instagram}
        overlayColor="from-black/75 via-black/50 to-black/70"
        className="h-screen"
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

      {/* ===== TESTIMONIALS ===== */}
      <ParallaxSection
        bgImage={BG_IMAGES.testimonials}
        overlayColor="from-black/70 via-black/50 to-black/70"
        className="h-screen"
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

      {/* ===== CTA ===== */}
      <ParallaxSection
        bgImage={BG_IMAGES.cta}
        overlayColor="from-black/70 via-black/50 to-black/70"
        className="h-screen"
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
    </div>
  );
}
