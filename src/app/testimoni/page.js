'use client';

import { useState, useEffect } from 'react';

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, message: '' });
  const [submitted, setSubmitted] = useState(false);

  const fetchTestimonials = () => {
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', rating: 5, message: '' });
    setSubmitted(true);
    fetchTestimonials();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-dark mb-2">Testimoni Pelanggan</h1>
      <p className="text-gray-600 mb-8">Apa kata mereka tentang kue-kue kami</p>

      <div className="space-y-4 mb-12">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-yellow-400 mb-2">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
            <p className="text-gray-600 italic mb-3">&ldquo;{t.message}&rdquo;</p>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-dark">— {t.name}</p>
              <span className="text-sm text-gray-400">{t.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-bold text-dark mb-6">Tulis Testimoni</h2>
        {submitted && <p className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4">Terima kasih! Testimoni Anda telah dikirim.</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nama Anda" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
          <div className="flex items-center gap-2">
            <label className="font-medium">Rating:</label>
            <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
              {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</option>)}
            </select>
          </div>
          <textarea placeholder="Tulis pesan Anda..." required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary h-32" />
          <button type="submit" className="bg-primary text-dark font-bold px-8 py-3 rounded-lg hover:bg-primary-dark transition">Kirim Testimoni</button>
        </form>
      </div>
    </div>
  );
}
