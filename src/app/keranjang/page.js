'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { useTitle } from '@/hooks/useTitle';
import Breadcrumb from '@/components/Breadcrumb';

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function KeranjangPage() {
  useTitle(`Keranjang - ${siteConfig.name}`);
  const [cart, setCart] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [exitingItems, setExitingItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(stored);
    if (stored.length === 0) setShowEmpty(true);
  }, []);

  const updateCart = newCart => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const changeQty = (id, delta) => {
    if (cart.length === 0) return;
    const newCart = cart.map(item => {
      if (item.id === id) {
        const qty = Math.max(1, item.qty + delta);
        return { ...item, qty };
      }
      return item;
    });
    updateCart(newCart);
  };

  const removeItem = id => {
    const newCart = cart.filter(item => item.id !== id);
    if (newCart.length === 0) {
      setExitingItems(cart);
      updateCart(newCart);
      setTimeout(() => {
        setExitingItems([]);
        setShowEmpty(true);
      }, 400);
    } else {
      updateCart(newCart);
    }
  };

  const displayCart = cart.length > 0 || exitingItems.length > 0
    ? (cart.length > 0 ? cart : exitingItems)
    : [];

  const total = displayCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0 && showEmpty) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="relative inline-block mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-28 h-28 bg-gradient-to-br from-primary/20 via-accent/10 to-rose/20 rounded-full mx-auto flex items-center justify-center">
              <motion.span
                className="text-6xl"
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                🛒
              </motion.span>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{ y: [0, -8, 0], rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              🧁
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-3 text-xl"
              animate={{ y: [0, 8, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              ✨
            </motion.div>
          </motion.div>

          <h1 className="text-3xl font-bold text-dark dark:text-white mb-3 font-display">
            {siteConfig.keranjangPage.emptyTitle}
          </h1>
          <p className="text-text-muted mb-2">
            {siteConfig.keranjangPage.emptySubtitle}
          </p>
          <p className="text-text-muted text-sm mb-8">
            {siteConfig.keranjangPage.emptySubtitle2}
          </p>

          <div className="flex flex-col items-center gap-3">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-rose text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              {siteConfig.keranjangPage.emptyCta}
            </Link>
            <Link
              href="/tentang"
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              {siteConfig.keranjangPage.emptySecondaryCta} →
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-rose/5 h-40 -z-10" />
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-dark dark:text-white font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {siteConfig.keranjangPage.title}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Keranjang' }]} />

        <motion.div
          className="space-y-4"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence>
            {displayCart.map(item => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                layout
                exit={{ opacity: 0, x: 100, height: 0 }}
                className="bg-white dark:bg-card rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow flex-wrap sm:flex-nowrap"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-rose/10 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                  🍰
                </div>
                <div className="flex-1 min-w-0 order-3 sm:order-none w-full sm:w-auto mt-1 sm:mt-0">
                  <h3 className="font-semibold text-dark dark:text-white truncate text-sm sm:text-base">{item.name}</h3>
                  <p className="text-primary font-bold text-xs sm:text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-1 bg-white dark:bg-card border border-border rounded-xl">
                  <motion.button
                    onClick={() => changeQty(item.id, -1)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center hover:bg-primary/10 text-text font-bold transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    −
                  </motion.button>
                  <span className="w-7 sm:w-8 text-center font-bold text-text text-sm">{item.qty}</span>
                  <motion.button
                    onClick={() => changeQty(item.id, 1)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center hover:bg-primary/10 text-text font-bold transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
                <p className="font-bold text-dark dark:text-white w-auto sm:w-24 text-right text-xs sm:text-sm order-last sm:order-none ml-auto sm:ml-0">
                  Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </p>
                <motion.button
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-8 bg-white dark:bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <p className="text-text-muted text-sm">{siteConfig.keranjangPage.totalLabel}</p>
            <p className="text-3xl md:text-4xl font-bold text-primary font-display">
              Rp {total.toLocaleString('id-ID')}
            </p>
          </div>
          <Link
            href="/checkout"
            className="w-full md:w-auto bg-gradient-to-r from-primary to-rose text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all text-lg text-center"
          >
            {siteConfig.keranjangPage.checkoutCta} →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}