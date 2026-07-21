'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DetailProdukPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`).then(r => r.json()).then(data => {
      setProduct(data);
      fetch('/api/categories').then(r => r.json()).then(cats => {
        setCategory(cats.find(c => c.id === data.categoryId));
      });
    });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link href="/katalog" className="text-primary-dark hover:underline mb-6 inline-block">&larr; Kembali ke Katalog</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl p-8 shadow-md">
        <div className="h-80 md:h-96 rounded-xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          {category && <span className="bg-primary/20 text-primary-dark px-3 py-1 rounded-full text-sm font-medium">{category.name}</span>}
          <h1 className="text-3xl font-bold text-dark mt-3 mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary-dark mb-4">Rp {product.price.toLocaleString('id-ID')}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <label className="font-medium">Jumlah:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-100">−</button>
              <span className="px-4 py-2 font-medium min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
          </div>

          <button onClick={addToCart} className={`w-full py-3 rounded-lg font-bold text-lg transition ${added ? 'bg-green-500 text-white' : 'bg-primary text-dark hover:bg-primary-dark'}`}>
            {added ? '✓ Ditambahkan!' : 'Tambah ke Keranjang'}
          </button>
        </div>
      </div>
    </div>
  );
}
