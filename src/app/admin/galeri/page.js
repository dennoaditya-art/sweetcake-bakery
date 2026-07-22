'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark dark:text-white font-display">Manajemen Galeri</h1>
        <p className="text-text-muted text-sm mt-1">{gallery.length} foto</p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-card rounded-2xl p-6 border border-border/50 shadow-sm space-y-4 mb-8 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-bold text-dark dark:text-white">Tambah Foto</h2>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">URL Gambar</label>
          <input type="text" placeholder="https://..." required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Keterangan</label>
          <input type="text" placeholder="Contoh: Red Velvet Cake" required value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>
        <button type="submit" className="bg-gradient-to-r from-primary to-rose text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all text-sm">Tambah</button>
      </motion.form>

      {gallery.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">🖼️</span>
          <p className="text-text-muted">Belum ada foto.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-rose/5 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-4xl">🖼️</span>
                )}
              </div>
              <div className="p-3 flex justify-between items-center gap-2">
                <p className="text-sm font-medium text-dark dark:text-white truncate">{item.caption}</p>
                <button onClick={() => handleDelete(item.id)} className="px-2 py-1 rounded-lg text-[10px] font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors shrink-0">Hapus</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
