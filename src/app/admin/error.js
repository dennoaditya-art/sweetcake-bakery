'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export default function AdminError({ error, reset }) {
  return (
    <div className="min-h-screen bg-muted dark:bg-dark pt-16">
      <div className="flex">
        <aside className="hidden md:flex flex-col w-56 min-h-[calc(100vh-4rem)] bg-white dark:bg-card border-r border-border/50 p-4 gap-1 fixed left-0 top-16">
          <div className="text-[10px] uppercase tracking-widest text-text-muted font-semibold px-3 mb-2">Menu</div>
          {siteConfig.admin.nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text hover:bg-primary/5 transition-all duration-200"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="mt-auto pt-4 border-t border-border/50">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              ← {siteConfig.admin.viewStore}
            </Link>
          </div>
        </aside>
        <main className="flex-1 md:ml-56 p-4 md:p-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              className="text-center max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-6xl block mb-6">😵</span>
              <h1 className="text-3xl font-bold text-dark dark:text-white font-display mb-3">
                Ada yang Tidak Beres
              </h1>
              <p className="text-text-muted mb-8 leading-relaxed">
                Maaf, terjadi kesalahan. Silakan coba lagi.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={reset}
                  className="bg-gradient-to-r from-primary to-rose text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                >
                  Coba Lagi
                </button>
                <Link
                  href="/admin"
                  className="bg-dark dark:bg-white text-white dark:text-dark font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
                >
                  Dashboard
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
