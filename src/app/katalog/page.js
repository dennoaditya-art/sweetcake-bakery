'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function KatalogContent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category');

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    let url = '/api/products';
    const params = [];
    if (activeCategory) params.push(`category=${activeCategory}`);
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (params.length) url += '?' + params.join('&');
    fetch(url).then(r => r.json()).then(setProducts);
  }, [activeCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Katalog Produk</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => router.push('/katalog')} className={`px-4 py-2 rounded-lg font-medium transition ${!activeCategory ? 'bg-primary text-dark' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Semua</button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => router.push(`/katalog?category=${cat.id}`)} className={`px-4 py-2 rounded-lg font-medium transition ${activeCategory === String(cat.id) ? 'bg-primary text-dark' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{cat.name}</button>
          ))}
        </div>
      </div>

      {/* Grid Produk */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Link key={product.id} href={`/katalog/${product.id}`} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-dark">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{categories.find(c => c.id === product.categoryId)?.name}</p>
                <p className="text-primary-dark font-bold text-xl">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function KatalogPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <KatalogContent />
    </Suspense>
  );
}
