import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function AdminLoading() {
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
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-text-muted text-sm">Memuat...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
