'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { SkeletonCard } from '@/components/Skeleton';
import { useTitle } from '@/hooks/useTitle';
import Breadcrumb from '@/components/Breadcrumb';

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const categoryGradients = [
  { bg: 'from-primary/20 to-rose/10', active: 'from-primary to-rose', emoji: '🎂' },
  { bg: 'from-accent/20 to-warm/10', active: 'from-accent to-warm', emoji: '🍪' },
  { bg: 'from-mint/20 to-sky/10', active: 'from-mint to-sky', emoji: '🍰' },
  { bg: 'from-secondary/20 to-lavender/10', active: 'from-secondary to-lavender', emoji: '🥖' },
  { bg: 'from-coral/20 to-primary/10', active: 'from-coral to-primary', emoji: '🧋' },
];

function KatalogContent() {
  useTitle(`Katalog - ${siteConfig.name}`);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category');

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    let url = '/api/products';
    const params = [];
    if (activeCategory) params.push(`category=${activeCategory}`);
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (params.length) url += '?' + params.join('&');
    fetch(url).then(r => r.json()).then(setProducts);
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-rose/5 h-48 -z-10" />
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-dark dark:text-white font-display mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {siteConfig.katalogPage.title}
          </motion.h1>
          <motion.p
            className="text-text-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {siteConfig.katalogPage.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Katalog' }]} />

        {/* Search & Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white dark:bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <motion.button
              onClick={() => router.push('/katalog')}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                !activeCategory
                  ? 'bg-gradient-to-r from-primary to-rose text-white shadow-lg shadow-primary/20'
                  : 'bg-white dark:bg-card text-text-muted hover:text-text border border-border hover:border-primary/30'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Semua
            </motion.button>
            {categories.map((cat, i) => {
              const g = categoryGradients[i % categoryGradients.length];
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => router.push(`/katalog?category=${cat.id}`)}
                  className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === String(cat.id)
                      ? `bg-gradient-to-r ${g.active} text-white shadow-lg shadow-primary/20`
                      : 'bg-white dark:bg-card text-text-muted hover:text-text border border-border hover:border-primary/30'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{g.emoji}</span>
                  {cat.name}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid Produk */}
        <AnimatePresence mode="wait">
          {products.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.span
                className="text-6xl block mb-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🧁
              </motion.span>
              <p className="text-text-muted text-lg">Produk tidak ditemukan.</p>
              <p className="text-text-muted text-sm mt-1">Coba kata kunci lain atau pilih kategori berbeda</p>
            </motion.div>
          ) : (
            <motion.div
              key="products"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {products.map((product, i) => {
                const g = categoryGradients[i % categoryGradients.length];
                return (
                  <motion.div
                    key={product.id}
                    variants={fadeUp}
                    layout
                  >
                    <Link
                      href={`/katalog/${product.id}`}
                      className="group block bg-white dark:bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
                    >
                      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-dark-soft to-dark">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br ${g.bg} border border-white/20 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          {g.emoji}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-base text-dark dark:text-white font-display group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-text-muted mt-1">
                          {categories.find(c => c.id === product.categoryId)?.name || 'Kue'}
                        </p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                          <p className="text-primary font-bold text-lg">
                            Rp {product.price.toLocaleString('id-ID')}
                          </p>
                          <motion.span
                            className="text-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                          >
                            🛒
                          </motion.span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function KatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    }>
      <KatalogContent />
    </Suspense>
  );
}
