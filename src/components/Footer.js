import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2D1B36] text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 bg-gradient-to-br from-primary to-rose rounded-xl flex items-center justify-center text-lg shadow-md">🧁</span>
              <span className="text-lg font-bold text-white font-display">SweetCake</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md">
              Toko kue homemade dengan resep turun-temurun. Kami menghadirkan kue berkualitas dengan cita rasa istimewa untuk setiap momen spesial Anda. Dibuat dengan cinta dari bahan-bahan terbaik.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 font-display">Menu</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary transition">Beranda</Link></li>
              <li><Link href="/katalog" className="hover:text-primary transition">Katalog</Link></li>
              <li><Link href="/galeri" className="hover:text-primary transition">Galeri</Link></li>
              <li><Link href="/testimoni" className="hover:text-primary transition">Testimoni</Link></li>
              <li><Link href="/tentang" className="hover:text-primary transition">Tentang</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 font-display">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">📍 <span>Jl. Merdeka No. 123</span></li>
              <li className="flex items-center gap-2">📞 <span>0812-3456-7890</span></li>
              <li className="flex items-center gap-2">✉️ <span>hello@sweetcake.com</span></li>
              <li className="flex items-center gap-2">🕐 <span>Sen-Sab: 08.00 - 20.00</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2026 SweetCake. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-primary cursor-pointer transition">Instagram</span>
            <span className="hover:text-primary cursor-pointer transition">TikTok</span>
            <span className="hover:text-primary cursor-pointer transition">Shopee</span>
            <span className="hover:text-primary cursor-pointer transition">GoFood</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
