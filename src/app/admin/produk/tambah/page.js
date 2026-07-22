'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TambahProdukPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', slug: '', categoryId: 1, price: '', description: '', image: '/images/products/default.jpg', featured: false, stock: true });

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price), categoryId: Number(form.categoryId) }),
    });
    router.push('/admin/produk');
  };

  return (
    <div className="max-w-2xl">
      <Link href="/admin/produk" className="inline-flex items-center gap-1 text-text-muted hover:text-primary transition-colors mb-6 text-sm group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali
      </Link>

      <h1 className="text-3xl font-bold text-dark dark:text-white font-display mb-6">Tambah Produk</h1>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Nama Produk</label>
          <input type="text" placeholder="Contoh: Red Velvet Cupcake" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Slug</label>
          <input type="text" placeholder="red-velvet-cupcake" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Kategori</label>
          <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Harga (Rp)</label>
          <input type="number" placeholder="25000" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Deskripsi</label>
          <textarea placeholder="Deskripsi produk..." required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all h-24 resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">URL Gambar</label>
          <input type="text" placeholder="https://..." value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
            <span className="text-sm text-text group-hover:text-primary transition-colors">Produk Unggulan</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input type="checkbox" checked={form.stock} onChange={e => setForm({ ...form, stock: e.target.checked })} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
            <span className="text-sm text-text group-hover:text-primary transition-colors">Tersedia</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-gradient-to-r from-primary to-rose text-white font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all">Simpan</button>
          <button type="button" onClick={() => router.push('/admin/produk')} className="bg-white dark:bg-card border border-border text-text font-bold px-8 py-2.5 rounded-xl hover:bg-muted transition-all">Batal</button>
        </div>
      </motion.form>
    </div>
  );
}
