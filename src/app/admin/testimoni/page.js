'use client';

import { useState, useEffect } from 'react';

export default function AdminTestimoniPage() {
  const [testimonials, setTestimonials] = useState([]);

  const fetchData = () => {
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async id => {
    if (!confirm('Hapus testimoni ini?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-dark mb-6">Manajemen Testimoni</h1>
      <div className="space-y-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-xl p-6 shadow-md flex justify-between items-start">
            <div>
              <div className="text-yellow-400 mb-1">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p className="text-gray-600 italic">&ldquo;{t.message}&rdquo;</p>
              <p className="font-semibold mt-2">— {t.name} <span className="text-sm text-gray-400 font-normal">{t.createdAt}</span></p>
            </div>
            <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:underline ml-4 whitespace-nowrap">Hapus</button>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-gray-500">Belum ada testimoni.</p>}
      </div>
    </div>
  );
}
