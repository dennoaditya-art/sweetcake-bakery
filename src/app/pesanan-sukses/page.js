'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { useTitle } from '@/hooks/useTitle';
import Breadcrumb from '@/components/Breadcrumb';

export default function PesananSuksesPage() {
  useTitle(`${siteConfig.pesananSuksesPage.title} - ${siteConfig.name}`);
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Breadcrumb items={[{ label: 'Pesanan Berhasil' }]} />
        <motion.div
          className="text-7xl mb-6"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎉
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4 font-display">
          {siteConfig.pesananSuksesPage.title}
        </h1>

        <p className="text-text-muted mb-8 leading-relaxed">
          {siteConfig.pesananSuksesPage.subtitle}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-primary to-rose text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            {siteConfig.pesananSuksesPage.cta}
          </Link>
          <Link
            href="/katalog"
            className="bg-dark dark:bg-white text-white dark:text-dark font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all"
          >
            {siteConfig.pesananSuksesPage.secondaryCta}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
