'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-dark">Manajemen Produk</h1>
        <Link href="/admin/produk/tambah" className="bg-primary text-dark font-bold px-6 py-2 rounded-lg hover:bg-primary-dark transition">+ Tambah Produk</Link>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-dark text-white">
            <tr>
              <th className="p-3">Nama</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Stok</th>
              <th className="p-3">Unggulan</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{categories.find(c => c.id === p.categoryId)?.name || '-'}</td>
                <td className="p-3">Rp {p.price.toLocaleString('id-ID')}</td>
                <td className="p-3">{p.stock ? '✅' : '❌'}</td>
                <td className="p-3">{p.featured ? '⭐' : '-'}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/produk/${p.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
