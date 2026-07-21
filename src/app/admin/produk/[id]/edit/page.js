'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProdukPage() {
  const router = useRouter();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', slug: '', categoryId: 1, price: '', description: '', image: '', featured: false, stock: true });

  useEffect(() => {
    Promise.all([
      fetch(`/api/products/${id}`).then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([product, cats]) => {
      setCategories(cats);
      setForm({
        name: product.name,
        slug: product.slug,
        categoryId: product.categoryId,
        price: product.price,
        description: product.description,
        image: product.image,
        featured: product.featured,
        stock: product.stock,
      });
    });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price), categoryId: Number(form.categoryId) }),
    });
    router.push('/admin/produk');
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-dark mb-6">Edit Produk</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md space-y-4">
        <input type="text" placeholder="Nama Produk" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <input type="text" placeholder="Slug" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50" />
        <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="number" placeholder="Harga (Rp)" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <textarea placeholder="Deskripsi" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary h-24" />
        <input type="text" placeholder="URL Gambar" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <div className="flex gap-6">
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Produk Unggulan</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.stock} onChange={e => setForm({ ...form, stock: e.target.checked })} /> Tersedia</label>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-primary text-dark font-bold px-8 py-2 rounded-lg hover:bg-primary-dark transition">Simpan</button>
          <button type="button" onClick={() => router.push('/admin/produk')} className="bg-gray-200 text-gray-700 font-bold px-8 py-2 rounded-lg hover:bg-gray-300 transition">Batal</button>
        </div>
      </form>
    </div>
  );
}
