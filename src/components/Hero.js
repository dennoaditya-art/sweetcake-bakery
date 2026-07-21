'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="h-screen bg-gradient-to-br from-dark via-secondary to-dark flex items-center overflow-hidden relative">
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
              🧁 Homemade & Premium Quality
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              Manisnya
              <span className="text-primary block mt-2">Kebahagiaan</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-lg">
              Toko kue homemade dengan cita rasa istimewa. Dibuat dengan cinta dari bahan-bahan terbaik untuk setiap momen spesial Anda.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/katalog" className="bg-primary text-dark font-bold px-8 py-3 rounded-full hover:bg-primary-dark transition text-lg shadow-lg shadow-primary/25">
                Lihat Katalog
              </Link>
              <Link href="/tentang" className="border-2 border-white/30 text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition text-lg">
                Tentang Kami
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl rotate-12 shadow-2xl flex items-center justify-center">
                <span className="text-8xl">🎂</span>
              </div>
              <div className="absolute inset-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl -rotate-6 shadow-2xl flex items-center justify-center">
                <span className="text-8xl">🍰</span>
              </div>
              <div className="absolute inset-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl rotate-3 shadow-2xl flex items-center justify-center">
                <span className="text-8xl">🍪</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
