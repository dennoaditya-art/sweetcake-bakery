import Link from 'next/link';

export default function PesananSuksesPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold text-dark mb-4">Pesanan Berhasil!</h1>
      <p className="text-gray-600 mb-8">Terima kasih! Pesanan Anda telah kami terima. Kami akan segera menghubungi Anda untuk konfirmasi.</p>
      <div className="flex gap-4 justify-center">
        <Link href="/" className="bg-primary text-dark font-bold px-8 py-3 rounded-lg hover:bg-primary-dark transition">Kembali ke Beranda</Link>
        <Link href="/katalog" className="bg-dark text-white font-bold px-8 py-3 rounded-lg hover:bg-secondary transition">Belanja Lagi</Link>
      </div>
    </div>
  );
}
