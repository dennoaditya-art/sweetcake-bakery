'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SkeletonCard } from '@/components/Skeleton';

export default function AdminProdukPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = () => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([p, c]) => { setProducts(p); setCategories(c); });
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async id => {
    if (!confirm('Hapus produk ini?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white font-display">Manajemen Produk</h1>
          <p className="text-text-muted text-sm mt-1">{products.length} produk</p>
        </div>
        <Link
          href="/admin/produk/tambah"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-rose text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
        >
          + Tambah Produk
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/50 bg-dark-soft/5">
                  <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Produk</th>
                  <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Kategori</th>
                  <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Harga</th>
                  <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Status</th>
                  <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Unggulan</th>
                  <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border/30 hover:bg-primary/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-rose/10 flex items-center justify-center text-lg shrink-0">
                          🍰
                        </div>
                        <span className="font-semibold text-dark dark:text-white text-sm">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-text-muted">{categories.find(c => c.id === p.categoryId)?.name || '-'}</td>
                    <td className="p-4 text-sm font-semibold text-dark dark:text-white">Rp {p.price.toLocaleString('id-ID')}</td>
                    <td className="p-4">{p.stock ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Tersedia</span> : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">Habis</span>}</td>
                    <td className="p-4">{p.featured ? <span className="text-sm">⭐</span> : <span className="text-text-muted text-sm">—</span>}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/produk/${p.id}/edit`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors">Edit</Link>
                        <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors">Hapus</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
