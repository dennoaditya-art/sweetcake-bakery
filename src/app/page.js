'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import Sprinkles from '@/components/Sprinkles';
import ScrollReveal from '@/components/ScrollReveal';
import CakeMood from '@/components/CakeMood';
import Mascot from '@/components/Mascot';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
    fetch('/api/categories').then(r => r.json()).then(setCategories);
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
  }, []);

  const instagramPosts = [
    { id: 1, emoji: '🎂', caption: 'Red velvet cake fresh from oven!', likes: 234 },
    { id: 2, emoji: '🍰', caption: 'Bolu lapis spesial weekend', likes: 189 },
    { id: 3, emoji: '🍪', caption: 'Nastar keju lumer di mulut', likes: 312 },
    { id: 4, emoji: '🧁', caption: 'Cupcake rainbow untuk si kecil', likes: 156 },
  ];

  const badges = ['🔥 Best Seller', '⭐ Most Loved', '✨ New', '💖 Popular'];
  const [produkVisible, setProdukVisible] = useState(false);
  const produkRef = useRef(null);

  useEffect(() => {
    const el = produkRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProdukVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shuffledDelays = useMemo(() => {
    const arr = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const layers = [
    {
      id: 'hero',
      z: 10,
      bg: 'bg-gradient-to-br from-[#2D1B36] via-[#4A3060] to-[#1A1122]',
      content: (
        <div className="h-full flex items-center relative overflow-hidden">
          <Sprinkles count={18} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          {/* Customer photos background */}
          <div className="absolute inset-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=800&fit=crop" alt="" className="absolute -top-10 -left-10 w-80 h-80 object-cover rounded-full opacity-15 blur-sm" />
            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop" alt="" className="absolute bottom-10 -right-10 w-96 h-96 object-cover rounded-full opacity-10 blur-sm" />
            <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=600&fit=crop" alt="" className="absolute top-1/3 right-1/4 w-60 h-60 object-cover rounded-full opacity-10 blur-sm" />
          </div>
          {/* Dark overlay untuk readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B36]/90 via-[#2D1B36]/70 to-[#1A1122]/90" />
          {/* Decorative floating emojis */}
          <span className="absolute top-[15%] left-[8%] text-2xl md:text-3xl animate-float opacity-40" style={{ animationDelay: '0s', animationDuration: '4s' }}>🎂</span>
          <span className="absolute top-[25%] right-[12%] text-xl md:text-2xl animate-float opacity-30" style={{ animationDelay: '1s', animationDuration: '5s' }}>🧁</span>
          <span className="absolute bottom-[20%] left-[5%] text-lg md:text-xl animate-float opacity-25" style={{ animationDelay: '2s', animationDuration: '6s' }}>🍪</span>
          <span className="absolute bottom-[15%] right-[8%] text-xl md:text-2xl animate-float opacity-35" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>🍰</span>
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 lg:mb-8">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse-soft" />
                    Homemade with Love
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 lg:mb-6 font-display">
                    Manisnya
                    <br />
                    <span className="bg-gradient-to-r from-primary via-rose to-secondary bg-clip-text text-transparent">
                      Kebahagiaan
                    </span>
                  </h1>
                  <p className="text-white/60 text-base md:text-lg lg:text-xl mb-6 lg:mb-10 max-w-md leading-relaxed">
                    Setiap gigitan adalah cerita. Kami hadirkan kue homemade dengan cinta dan bahan terbaik untuk momen berharga Anda.
                  </p>
                  <div className="flex flex-wrap gap-3 lg:gap-4 justify-center lg:justify-start">
                    <Link href="/katalog" className="group bg-gradient-to-r from-primary to-rose text-white font-bold px-6 lg:px-8 py-3 lg:py-3.5 rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-sm lg:text-base inline-flex items-center gap-2">
                      Jelajahi Katalog
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </Link>
                    <Link href="/tentang" className="border-2 border-white/20 text-white/80 font-semibold px-6 lg:px-8 py-3 lg:py-3.5 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 text-sm lg:text-base">
                      Cerita Kami
                    </Link>
                  </div>
                  <div className="flex items-center gap-6 mt-8 lg:mt-10 justify-center lg:justify-start">
                    <div className="flex -space-x-3">
                      {['😊', '🥰', '😋', '🤩'].map((e, i) => (
                        <span key={i} className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border-2 border-[#2D1B36] flex items-center justify-center text-xs lg:text-sm bg-white/10 backdrop-blur">{e}</span>
                      ))}
                    </div>
                    <p className="text-white/40 text-xs lg:text-sm">Dicintai <span className="text-white/80 font-semibold">2.500+</span> pelanggan</p>
                  </div>
                </ScrollReveal>
              </div>

              {products.length > 0 && (
                <ScrollReveal delay={300}>
                  <div className="flex items-center justify-center mt-4 lg:mt-0">
                    <div className="relative scale-75 md:scale-90 lg:scale-100">
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/20 to-rose/30 rounded-[2.5rem] blur-2xl" />
                      <div className="relative w-72 h-72 lg:w-80 lg:h-80 animate-float">
                        <Link href={`/katalog/${products[0]?.id}`} className="absolute inset-0 rounded-[2rem] rotate-12 shadow-2xl shadow-primary/30 overflow-hidden group block transition-transform hover:scale-105 hover:rotate-[18deg] duration-500">
                          <img src={products[0]?.image} alt={products[0]?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <span className="absolute bottom-3 left-3 text-white text-xs font-bold drop-shadow-lg">{products[0]?.name}</span>
                        </Link>
                        <Link href={`/katalog/${products[1]?.id}`} className="absolute inset-3 rounded-[2rem] -rotate-6 shadow-2xl shadow-secondary/20 overflow-hidden group block transition-transform hover:scale-105 hover:-rotate-[12deg] duration-500">
                          <img src={products[1]?.image} alt={products[1]?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <span className="absolute bottom-3 left-3 text-white text-xs font-bold drop-shadow-lg">{products[1]?.name}</span>
                        </Link>
                        <Link href={`/katalog/${products[2]?.id}`} className="absolute inset-6 rounded-[2rem] rotate-3 shadow-2xl shadow-accent/20 overflow-hidden group block transition-transform hover:scale-105 hover:rotate-[9deg] duration-500">
                          <img src={products[2]?.image} alt={products[2]?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <span className="absolute bottom-3 left-3 text-white text-xs font-bold drop-shadow-lg">{products[2]?.name}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'mood',
      z: 20,
      bg: 'bg-cream dark:bg-dark',
      content: (
        <div className="h-full flex flex-col items-center justify-center px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block text-5xl mb-4">💭</span>
              <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-3 font-display">
                Cake Mood Finder
              </h2>
              <p className="text-text-muted max-w-md mx-auto">Pilih suasana hati, kami carikan kue yang paling pas untukmu</p>
            </div>
            <CakeMood />
          </ScrollReveal>
        </div>
      ),
    },
    {
      id: 'kategori',
      z: 30,
      bg: 'bg-white dark:bg-card',
      content: (
        <div className="h-full flex flex-col items-center justify-center px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-5xl mb-4 block">📋</span>
              <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-3 font-display">
                Kategori Pilihan
              </h2>
              <p className="text-text-muted max-w-md mx-auto">Jelajahi berbagai jenis kue yang kami buat dengan penuh cinta</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center w-full max-w-4xl">
              {categories.map((cat, i) => {
                const variants = ['animate-pop-in', 'animate-pop-in-up', 'animate-pop-in-left', 'animate-pop-in-right', 'animate-pop-in'];
                const anim = variants[i % variants.length];
                const delays = [0.1, 0.25, 0.4, 0.2, 0.35];
                return (
                  <Link
                    key={cat.id}
                    href={`/katalog?category=${cat.id}`}
                    className={`group relative bg-white dark:bg-card rounded-2xl p-5 text-center card-shadow hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden opacity-0 ${anim}`}
                    style={{ animationDelay: `${delays[i]}s`, animationFillMode: 'forwards', width: '160px' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-4xl mb-2 block group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                      {['🎂', '🍪', '🍰', '🥖', '🧋'][i] || '🍰'}
                    </span>
                    <h3 className="font-bold text-dark dark:text-white text-sm font-display">{cat.name}</h3>
                    <p className="text-[10px] text-text-muted mt-1 leading-tight">{cat.description?.split(' ').slice(0, 5).join(' ')}...</p>
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      ),
    },
    {
      id: 'produk',
      z: 40,
      bg: 'bg-dark',
      content: (
        <div ref={produkRef} className="h-full w-full relative overflow-hidden">
          {products.length > 0 && (
            <>
              {/* Full-bleed grid — 8 produk sama besar, penuh tanpa celah */}
              <div className="absolute inset-0 flex flex-wrap">
                {products.slice(0, 8).map((product, i) => {
                  const badgesList = ['🔥 Best Seller', '⭐ Most Loved', '✨ New', '💖 Popular'];
                  return (
                    <div
                      key={product.id}
                      className="w-1/2 md:w-1/4 h-1/2"
                      style={produkVisible ? { animation: `pop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${shuffledDelays[i]}s both` } : {}}
                    >
                      <Link href={`/katalog/${product.id}`} className="group relative block w-full h-full overflow-hidden">
                        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white">
                          {badgesList[i % badgesList.length]}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-bold text-white text-xs md:text-sm font-display leading-tight">{product.name}</h3>
                          <p className="text-primary font-bold text-xs mt-0.5">Rp {product.price.toLocaleString('id-ID')}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Overlay title + CTA */}
              <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8 pointer-events-none z-10">
                <div className="bg-gradient-to-b from-black/60 to-transparent -mx-5 md:-mx-8 -mt-5 md:-mt-8 px-5 md:px-8 pt-5 md:pt-8 pb-10">
                  <h2 className="text-xl md:text-3xl font-bold text-white font-display" style={{ animation: 'pop-in-up 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both' }}>Produk Unggulan</h2>
                  <p className="text-white/50 text-sm mt-0.5" style={{ animation: 'pop-in-up 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both' }}>Paling laris dan banyak dicintai</p>
                </div>
                <div className="flex justify-center pointer-events-auto" style={{ animation: 'pop-in-up 0.5s ease-out 0.5s both' }}>
                  <Link href="/katalog" className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold px-5 py-2 rounded-full hover:bg-white/25 hover:border-white/40 transition-all duration-300 text-xs md:text-sm shadow-lg">
                    Lihat Semua Menu <span>→</span>
                  </Link>
                </div>
              </div>
            </>
          )}

          {products.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-white/40">Loading...</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'instagram',
      z: 50,
      bg: 'bg-gradient-to-br from-lavender/30 via-cream to-rose/20 dark:from-dark dark:via-card dark:to-dark',
      content: (
        <div className="h-full flex flex-col items-center justify-center px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl text-3xl mb-4 shadow-lg">📸</span>
              <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-3 font-display">
                Instagram Feed
              </h2>
              <p className="text-text-muted">Ikuti <span className="text-primary font-bold">@sweetcake_id</span> untuk update manis setiap hari</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {instagramPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 100}>
                <div className="group relative bg-white dark:bg-card rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 via-rose/20 to-secondary/20 dark:from-primary/10 dark:via-rose/10 dark:to-secondary/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                    {post.emoji}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <p className="text-sm font-medium">{post.caption}</p>
                      <p className="text-xs text-white/70 mt-1">❤️ {post.likes} likes</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-base">
              <span>📱</span> Follow @sweetcake_id
            </a>
          </ScrollReveal>
        </div>
      ),
    },
    {
      id: 'testimoni',
      z: 60,
      bg: 'bg-white dark:bg-card',
      content: (
        <div className="h-full flex flex-col items-center justify-center px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-5xl mb-4 block">💬</span>
              <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-3 font-display">
                Kata Mereka
              </h2>
              <p className="text-text-muted max-w-md mx-auto">Yang sudah cobain, pada suka semua!</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {testimonials.slice(0, 3).map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 150}>
                <div className="bg-cream dark:bg-muted rounded-2xl p-6 card-shadow hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-1 text-yellow-400 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx}>{idx < t.rating ? '⭐' : '☆'}</span>
                    ))}
                  </div>
                  <p className="text-text-muted italic leading-relaxed mb-4">&ldquo;{t.message}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-rose rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-dark dark:text-white text-sm">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.createdAt}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <Link href="/testimoni" className="mt-8 inline-flex items-center gap-1 text-primary font-bold hover:gap-2 transition-all">
              Lihat Semua Testimoni <span>→</span>
            </Link>
          </ScrollReveal>
        </div>
      ),
    },
    {
      id: 'cta',
      z: 70,
      bg: 'bg-gradient-to-br from-[#2D1B36] via-[#4A3060] to-[#1A1122]',
      content: (
        <div className="h-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
          <Sprinkles count={15} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative z-10">
            <ScrollReveal>
              <span className="text-6xl mb-6 block animate-bounce-gentle">🧁</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display leading-tight">
                Siap Manjain Lidah?
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Pesan sekarang dan nikmati kue homemade fresh dari dapur kami. Setiap pemesanan dibuat dengan cinta khusus untukmu.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/katalog" className="group bg-gradient-to-r from-primary to-rose text-white font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base inline-flex items-center gap-2">
                  <span>🛒</span> Mulai Belanja
                </Link>
                <Link href="/tentang" className="border-2 border-white/20 text-white/80 font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 text-base">
                  📞 Hubungi Kami
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative" style={{ height: `${layers.length * 100}vh` }}>
      {layers.map((layer) => (
        <section
          key={layer.id}
          className={`sticky top-0 h-screen overflow-hidden ${layer.bg}`}
          style={{ zIndex: layer.z }}
        >
          {layer.content}
        </section>
      ))}
    </div>
  );
}
