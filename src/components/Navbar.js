'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((sum, item) => sum + item.qty, 0));
    };
    updateCart();
    window.addEventListener('storage', updateCart);
    window.addEventListener('cartUpdated', updateCart);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('storage', updateCart);
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) {
    return (
      <nav className="bg-dark text-white px-6 py-3 flex items-center justify-between shadow-md">
        <Link href="/admin" className="text-xl font-bold font-display">SweetCake Admin</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/admin" className="hover:text-primary transition">Dashboard</Link>
          <Link href="/admin/produk" className="hover:text-primary transition">Produk</Link>
          <Link href="/admin/kategori" className="hover:text-primary transition">Kategori</Link>
          <Link href="/admin/pesanan" className="hover:text-primary transition">Pesanan</Link>
          <Link href="/admin/testimoni" className="hover:text-primary transition">Testimoni</Link>
          <Link href="/admin/galeri" className="hover:text-primary transition">Galeri</Link>
          <Link href="/" className="hover:text-primary ml-4 border-l border-white/20 pl-4 transition">Lihat Toko</Link>
        </div>
      </nav>
    );
  }

  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/katalog', label: 'Katalog' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/testimoni', label: 'Testimoni' },
    { href: '/tentang', label: 'Tentang' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 dark:bg-dark/95 backdrop-blur-lg shadow-sm'
        : 'bg-gradient-to-b from-black/20 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 bg-gradient-to-br from-primary to-rose rounded-xl flex items-center justify-center text-lg shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
            🧁
          </span>
          <span className={`text-lg font-bold tracking-tight ${scrolled ? 'text-dark dark:text-white' : 'text-white'} font-display`}>
            SweetCake
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? scrolled
                    ? 'bg-primary/20 text-primary-dark'
                    : 'bg-white/20 text-white'
                  : scrolled
                    ? 'text-text hover:bg-primary/10 hover:text-primary'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/keranjang"
              className={`relative p-2 rounded-full transition ${
                scrolled ? 'hover:bg-primary/10' : 'hover:bg-white/10'
              }`}
            >
              <span className={scrolled ? 'text-dark dark:text-white' : 'text-white'}>🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <button
          className={`md:hidden text-xl ${scrolled ? 'text-dark dark:text-white' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-dark border-t border-border px-6 py-4 flex flex-col gap-2 shadow-lg">
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg hover:bg-primary/10 font-medium transition">
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 px-4 pt-2 border-t border-border mt-2">
            <ThemeToggle />
            <Link href="/keranjang" onClick={() => setMenuOpen(false)} className="font-medium">Keranjang ({cartCount})</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
