import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6 font-display font-bold text-primary">404</div>
        <h1 className="text-3xl font-bold text-dark dark:text-white font-display mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-text-muted mb-8 leading-relaxed">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-primary to-rose text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/katalog"
            className="bg-dark dark:bg-white text-white dark:text-dark font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
          >
            Lihat Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}
