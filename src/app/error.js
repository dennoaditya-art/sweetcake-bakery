'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RootError({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
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
          Maaf, terjadi kesalahan. Silakan coba lagi atau kembali ke beranda.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-primary to-rose text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="bg-dark dark:bg-white text-white dark:text-dark font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
