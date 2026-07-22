'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark dark:text-white font-display">Manajemen Kategori</h1>
        <p className="text-text-muted text-sm mt-1">{categories.length} kategori</p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-card rounded-2xl p-6 border border-border/50 shadow-sm space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-bold text-dark dark:text-white">{editing ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Nama Kategori</label>
          <input type="text" placeholder="Contoh: Cupcake" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Slug</label>
          <input type="text" placeholder="cupcake" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Deskripsi</label>
          <textarea placeholder="Deskripsi kategori..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all h-20 resize-none" />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-gradient-to-r from-primary to-rose text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all text-sm">{editing ? 'Simpan' : 'Tambah'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', slug: '', description: '' }); }} className="bg-white dark:bg-card border border-border text-text font-bold px-4 py-2.5 rounded-xl hover:bg-muted transition-all text-sm">Batal</button>}
        </div>
      </motion.form>

      <div className="bg-white dark:bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 bg-dark-soft/5">
                <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Nama</th>
                <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Slug</th>
                <th className="p-4 text-xs uppercase tracking-wider text-text-muted font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/30 hover:bg-primary/5 transition-colors"
                >
                  <td className="p-4 font-medium text-dark dark:text-white text-sm">{c.name}</td>
                  <td className="p-4 text-text-muted text-sm">{c.slug}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(c)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors">Edit</button>
                      <button onClick={() => handleDelete(c.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors">Hapus</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
