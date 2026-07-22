'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
    ]).then(([products, categories, orders, testimonials]) => {
      setStats({
        products: products.length,
        categories: categories.length,
        orders: orders.length,
        testimonials: testimonials.length,
      });
    });
  }, []);

  const cards = [
    { label: 'Total Produk', value: stats?.products, href: '/admin/produk', gradient: 'from-primary to-rose', icon: '🍰' },
    { label: 'Kategori', value: stats?.categories, href: '/admin/kategori', gradient: 'from-accent to-warm', icon: '📁' },
    { label: 'Pesanan', value: stats?.orders, href: '/admin/pesanan', gradient: 'from-mint to-sky', icon: '📦' },
    { label: 'Testimoni', value: stats?.testimonials, href: '/admin/testimoni', gradient: 'from-secondary to-lavender', icon: '⭐' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark dark:text-white font-display">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">Ringkasan data toko kamu</p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        initial="initial"
        animate="animate"
        variants={{ initial: {}, animate: { transition: { staggerChildren: 0.08 } } }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
          >
            <Link
              href={card.href}
              className="group block bg-white dark:bg-card rounded-2xl p-5 border border-border/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  {card.icon}
                </div>
                <div>
                  <motion.p
                    className="text-3xl font-bold text-dark dark:text-white font-display"
                    initial={false}
                    animate={card.value !== undefined ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {card.value ?? <span className="text-text-muted text-lg">...</span>}
                  </motion.p>
                  <p className="text-text-muted text-sm">{card.label}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
