export default function TentangPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Tentang SweetCake</h1>

      <div className="bg-white rounded-2xl p-8 shadow-md space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-primary-dark mb-3">Cerita Kami</h2>
          <p className="text-gray-700 leading-relaxed">SweetCake berdiri sejak 2020, berawal dari kecintaan kami terhadap dunia baking. Resep-resep yang kami gunakan adalah resep turun-temurun dari keluarga yang telah kami sempurnakan selama bertahun-tahun.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary-dark mb-3">Visi</h2>
          <p className="text-gray-700 leading-relaxed">Menjadi toko kue homemade terpercaya yang menghadirkan kebahagiaan melalui setiap gigitan kue kami.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary-dark mb-3">Misi</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Menggunakan bahan-bahan berkualitas terbaik tanpa pengawet</li>
            <li>Menjaga konsistensi rasa dan kualitas produk</li>
            <li>Memberikan pelayanan terbaik kepada setiap pelanggan</li>
            <li>Terus berinovasi dalam menciptakan varian kue baru</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary-dark mb-3">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-accent rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🥚</div>
              <h3 className="font-semibold">Bahan Fresh</h3>
              <p className="text-sm text-gray-600">Telur, mentega, dan bahan segar setiap hari</p>
            </div>
            <div className="bg-accent rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">👩‍🍳</div>
              <h3 className="font-semibold">Homemade</h3>
              <p className="text-sm text-gray-600">Dibuat dengan tangan, bukan mesin pabrik</p>
            </div>
            <div className="bg-accent rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold">Pengiriman</h3>
              <p className="text-sm text-gray-600">Diantar dengan hati-hati hingga ke rumah Anda</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
