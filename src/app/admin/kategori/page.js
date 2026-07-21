'use client';

import { useState, useEffect } from 'react';

export default function AdminKategoriPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });
  const [editing, setEditing] = useState(null);

  const fetchData = () => {
    fetch('/api/categories').then(r => r.json()).then(setCategories);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (editing) {
      await fetch(`/api/categories/${editing}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditing(null);
    } else {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: '', slug: '', description: '' });
    fetchData();
  };

  const handleEdit = cat => {
    setEditing(cat.id);
    setForm({ name: cat.name, slug: cat.slug, description: cat.description });
  };

  const handleDelete = async id => {
    if (!confirm('Hapus kategori ini?')) return;
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-dark mb-6">Manajemen Kategori</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md space-y-4 mb-8">
        <h2 className="text-xl font-bold">{editing ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
        <input type="text" placeholder="Nama Kategori" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
        <input type="text" placeholder="Slug" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50" />
        <textarea placeholder="Deskripsi" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary h-20" />
        <div className="flex gap-4">
          <button type="submit" className="bg-primary text-dark font-bold px-8 py-2 rounded-lg hover:bg-primary-dark transition">{editing ? 'Simpan' : 'Tambah'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', slug: '', description: '' }); }} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Batal</button>}
        </div>
      </form>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-dark text-white">
            <tr><th className="p-3">Nama</th><th className="p-3">Slug</th><th className="p-3">Aksi</th></tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3 text-gray-500">{c.slug}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(c)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
