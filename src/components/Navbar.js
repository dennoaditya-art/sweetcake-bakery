'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { siteConfig } from '@/lib/config';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((sum, item) => sum + item.qty, 0));
    };
    updateCart();
    window.addEventListener('storage', updateCart);
    window.addEventListener('cartUpdated', updateCart);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('storage', updateCart);
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) {
    return (
      <nav className="bg-dark text-white px-6 py-3 flex items-center justify-between shadow-md">
        <Link href="/admin" className="text-xl font-bold font-display">{siteConfig.name} Admin</Link>
        <div className="hidden md:flex gap-4 text-sm">
          {siteConfig.admin.nav.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition"
            >
              {link.icon} {link.label}
            </Link>
          ))}
          <Link href="/" className="hover:text-primary ml-4 border-l border-white/20 pl-4 transition">
            {siteConfig.admin.viewStore}
          </Link>
        </div>
      </nav>
    );
  }

  const links = siteConfig.nav.links;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-dark/80 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.span
            className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-lg shadow-md"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🧁
          </motion.span>
          <span className={`text-lg font-bold tracking-tight font-display ${
            scrolled ? 'text-dark dark:text-white' : 'text-white'
          }`}>
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? scrolled
                    ? 'bg-primary/15 text-primary-dark'
                    : 'bg-white/20 text-white'
                  : scrolled
                    ? 'text-text hover:bg-primary/10 hover:text-primary'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/keranjang"
              className={`relative p-2 rounded-full transition ${
                scrolled ? 'hover:bg-primary/10' : 'hover:bg-white/10'
              }`}
            >
              <motion.span
                className={scrolled ? 'text-dark dark:text-white' : 'text-white'}
                whileHover={{ scale: 1.15 }}
              >
                🛒
              </motion.span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>

        <button
          className={`md:hidden w-11 h-11 flex items-center justify-center rounded-xl ${scrolled ? 'text-dark dark:text-white' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Buka menu"
        >
          <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mx-3 mb-3 rounded-2xl bg-white/95 dark:bg-dark/95 backdrop-blur-xl border border-border overflow-hidden shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition ${
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-primary/5 text-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 px-4 pt-3 mt-2 border-t border-border">
                <ThemeToggle />
                <Link
                  href="/keranjang"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-text"
                >
                  Keranjang ({cartCount})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
