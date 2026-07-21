'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    if (stored.length === 0) router.push('/katalog');
    setCart(stored);
  }, [router]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const order = {
      ...form,
      items: cart,
      total,
    };
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    router.push('/pesanan-sukses');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-xl font-bold text-dark">Data Pemesan</h2>
          <input type="text" placeholder="Nama Lengkap" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
          <input type="tel" placeholder="No. Telepon" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
          <textarea placeholder="Alamat Lengkap" required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary h-24" />
          <textarea placeholder="Catatan (opsional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary h-24" />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-xl font-bold text-dark">Ringkasan Pesanan</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-dark">{item.name}</p>
                <p className="text-sm text-gray-500">{item.qty} x Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              <p className="font-bold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2">
            <p className="text-lg font-bold text-dark">Total</p>
            <p className="text-2xl font-bold text-primary-dark">Rp {total.toLocaleString('id-ID')}</p>
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-primary text-dark font-bold py-3 rounded-lg hover:bg-primary-dark transition text-lg disabled:opacity-50">
            {submitting ? 'Memproses...' : 'Buat Pesanan'}
          </button>
        </div>
      </form>
    </div>
  );
}
