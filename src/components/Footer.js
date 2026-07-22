import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-soft text-white/70 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-accent/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <span className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform">
                🧁
              </span>
              <span className="text-lg font-bold text-white font-display">SweetCake</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md text-white/50">
              Toko kue homemade dengan resep turun-temurun. Kami menghadirkan kue berkualitas dengan cita rasa istimewa untuk setiap momen spesial Anda. Dibuat dengan cinta dari bahan-bahan terbaik.
            </p>
            <div className="flex gap-3 mt-5">
              {['🍰', '🧁', '🍪', '🎂'].map((emoji, i) => (
                <span key={i} className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm hover:bg-white/10 transition-colors cursor-pointer">
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 font-display text-sm uppercase tracking-wider">Menu</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/katalog', label: 'Katalog' },
                { href: '/galeri', label: 'Galeri' },
                { href: '/testimoni', label: 'Testimoni' },
                { href: '/tentang', label: 'Tentang' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 font-display text-sm uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">📍 <span>Jl. Merdeka No. 123</span></li>
              <li className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">📞 <span>0812-3456-7890</span></li>
              <li className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">✉️ <span>hello@sweetcake.com</span></li>
              <li className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">🕐 <span>Sen-Sab: 08.00 - 20.00</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>&copy; 2026 SweetCake. All rights reserved.</p>
          <div className="flex gap-6">
            {['Instagram', 'TikTok', 'Shopee', 'GoFood'].map(social => (
              <span key={social} className="hover:text-primary cursor-pointer transition-colors duration-300 tracking-wider uppercase text-[10px]">
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
