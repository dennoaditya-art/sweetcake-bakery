'use client';

import { useState, useEffect } from 'react';

export default function AdminGaleriPage() {
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({ image: '', caption: '' });

  const fetchData = () => {
    fetch('/api/gallery').then(r => r.json()).then(setGallery);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ image: '', caption: '' });
    fetchData();
  };

  const handleDelete = async id => {
    if (!confirm('Hapus foto ini?')) return;
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-dark mb-6">Manajemen Galeri</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md space-y-4 mb-8 max-w-lg">
        <h2 className="text-xl font-bold">Tambah Foto</h2>
        <input type="text" placeholder="URL Gambar" required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <input type="text" placeholder="Keterangan" required value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <button type="submit" className="bg-primary text-dark font-bold px-8 py-2 rounded-lg hover:bg-primary-dark transition">Tambah</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="h-40 bg-secondary/10 flex items-center justify-center text-4xl">🖼️</div>
            <div className="p-3 flex justify-between items-center">
              <p className="text-sm font-medium truncate">{item.caption}</p>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-sm">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
