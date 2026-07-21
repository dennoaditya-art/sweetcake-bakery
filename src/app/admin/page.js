'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, testimonials: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
    ]).then(([products, categories, orders, testimonials]) => {
      setStats({ products: products.length, categories: categories.length, orders: orders.length, testimonials: testimonials.length });
    });
  }, []);

  const cards = [
    { label: 'Total Produk', value: stats.products, href: '/admin/produk', color: 'bg-blue-500', icon: '🍰' },
    { label: 'Kategori', value: stats.categories, href: '/admin/kategori', color: 'bg-green-500', icon: '📁' },
    { label: 'Pesanan', value: stats.orders, href: '/admin/pesanan', color: 'bg-orange-500', icon: '📦' },
    { label: 'Testimoni', value: stats.testimonials, href: '/admin/testimoni', color: 'bg-purple-500', icon: '⭐' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-dark mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <Link key={card.label} href={card.href} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>{card.icon}</div>
              <div>
                <p className="text-3xl font-bold text-dark">{card.value}</p>
                <p className="text-gray-600">{card.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
