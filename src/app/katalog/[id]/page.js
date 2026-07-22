'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { SkeletonCard, SkeletonText } from '@/components/Skeleton';
import { useTitle } from '@/hooks/useTitle';

export default function DetailProdukPage() {
  useTitle(`Detail - ${siteConfig.name}`);
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`).then(r => r.json()).then(data => {
      setProduct(data);
      fetch('/api/categories').then(r => r.json()).then(cats => {
        setCategory(cats.find(c => c.id === data.categoryId));
      });
    });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkeletonCard className="h-72 md:h-96" />
            <div className="space-y-4 pt-4">
              <div className="h-6 bg-dark-soft/20 rounded-full w-24" />
              <div className="h-10 bg-dark-soft/20 rounded-2xl w-3/4" />
              <div className="h-8 bg-dark-soft/20 rounded-2xl w-1/3" />
              <SkeletonText lines={4} />
              <div className="h-12 bg-dark-soft/20 rounded-xl w-full mt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1 text-text-muted hover:text-primary transition-colors mb-8 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Kembali ke Katalog
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-xl shadow-black/5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Image */}
          <motion.div
            className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-dark-soft to-dark group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            {category && (
              <motion.span
                className="inline-flex self-start items-center gap-1.5 bg-gradient-to-r from-primary/20 to-rose/10 text-primary-dark dark:text-primary px-3 py-1.5 rounded-full text-sm font-medium border border-primary/20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
              >
                🏷️ {category.name}
              </motion.span>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mt-4 mb-2 font-display">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-primary mb-4">
              Rp {product.price.toLocaleString('id-ID')}
            </p>

            <p className="text-text-muted leading-relaxed mb-6 flex-1">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium text-dark dark:text-white text-sm">Jumlah:</label>
              <div className="flex items-center bg-white dark:bg-card border border-border rounded-xl overflow-hidden">
                <motion.button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2.5 text-lg hover:bg-primary/10 transition-colors text-text"
                  whileTap={{ scale: 0.9 }}
                  disabled={qty <= 1}
                >
                  −
                </motion.button>
                <motion.span
                  className="px-5 py-2.5 font-bold min-w-[48px] text-center text-text"
                  key={qty}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  {qty}
                </motion.span>
                <motion.button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2.5 text-lg hover:bg-primary/10 transition-colors text-text"
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              onClick={addToCart}
              className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all duration-300 ${
                added
                  ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg shadow-green-400/30'
                  : 'bg-gradient-to-r from-primary to-rose text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    ✓ Ditambahkan ke Keranjang!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    🛒 Tambah ke Keranjang
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
