'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function KeranjangPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const updateCart = newCart => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const changeQty = (id, delta) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const qty = Math.max(1, item.qty + delta);
        return { ...item, qty };
      }
      return item;
    });
    updateCart(newCart);
  };

  const removeItem = id => {
    updateCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold text-dark mb-4">Keranjang Belanja</h1>
        <p className="text-gray-500 mb-8">Keranjang Anda masih kosong. Yuk, belanja!</p>
        <Link href="/katalog" className="bg-primary text-dark font-bold px-8 py-3 rounded-lg hover:bg-primary-dark transition">Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-dark mb-8">Keranjang Belanja</h1>

      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-md">
            <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center text-2xl">🍰</div>
            <div className="flex-1">
              <h3 className="font-semibold text-dark">{item.name}</h3>
              <p className="text-primary-dark font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => changeQty(item.id, -1)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold">−</button>
              <span className="w-8 text-center font-medium">{item.qty}</span>
              <button onClick={() => changeQty(item.id, 1)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold">+</button>
            </div>
            <p className="font-bold text-dark w-24 text-right">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 font-bold">✕</button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 mt-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-gray-600">Total Belanja</p>
          <p className="text-3xl font-bold text-primary-dark">Rp {total.toLocaleString('id-ID')}</p>
        </div>
        <Link href="/checkout" className="bg-primary text-dark font-bold px-8 py-3 rounded-lg hover:bg-primary-dark transition text-lg">Lanjut ke Checkout</Link>
      </div>
    </div>
  );
}
