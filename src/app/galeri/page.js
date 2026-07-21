'use client';

import { useState, useEffect } from 'react';

export default function GaleriPage() {
  const [gallery, setGallery] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(setGallery);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-dark mb-2">Galeri Foto</h1>
      <p className="text-gray-600 mb-8">Lihat hasil karya kue kami</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map(item => (
          <div key={item.id} onClick={() => setLightbox(item)} className="cursor-pointer group">
            <div className="h-64 rounded-xl overflow-hidden relative">
              <img src={item.image} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition font-semibold bg-dark/60 px-4 py-2 rounded-lg">Lihat</span>
              </div>
            </div>
            <p className="text-sm text-text-muted mt-2 text-center font-medium">{item.caption}</p>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 bg-dark/80 z-50 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <div className="bg-white dark:bg-card rounded-2xl p-4 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <div className="h-96 rounded-xl overflow-hidden mb-4">
              <img src={lightbox.image} alt={lightbox.caption} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-dark dark:text-white">{lightbox.caption}</h3>
            <button onClick={() => setLightbox(null)} className="mt-4 bg-dark text-white px-6 py-2 rounded-lg hover:bg-secondary transition">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
