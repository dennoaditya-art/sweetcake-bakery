# SweetCake — Toko Kue Homemade Template

> **Next.js 16 + Tailwind CSS v4 + framer-motion** — Template landing page toko kue homemade premium dengan animasi scroll cinematic, dark/light mode, dan admin panel lengkap.

**Live Demo → [sweetcake-bakery.vercel.app](https://sweetcake-bakery.vercel.app)**

![Hero Screenshot](https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1200&h=630&fit=crop)

---

## ✨ Fitur Utama

| Fitur | Detail |
|-------|--------|
| **Landing Page** | 7 section cinematic dengan parallax, scroll-driven animation, floating decorations |
| **Cake Mood Finder** | Pilih mood, dapat rekomendasi kue — interaktif dengan animasi spring |
| **Katalog Produk** | Grid responsive, filter kategori, search, skeleton loading |
| **Detail Produk** | Halaman produk individu dengan quantity picker & add-to-cart |
| **Keranjang** | Animated cart, quantity control, exit animations |
| **Checkout** | Multi-step form, order summary, loading state |
| **Galeri** | Masonry grid dengan lightbox viewer |
| **Testimoni** | Hero stats, masonry grid, form submit + carousel di homepage |
| **Tentang Kami** | Cerita brand, visi, misi, keunggulan |
| **Admin Panel** | Sidebar layout, Dashboard stats, CRUD Produk/Kategori/Pesanan/Testimoni/Galeri |
| **Dark Mode** | Full dark/light theme, persist ke localStorage |
| **Animasi** | framer-motion — scroll reveal, stagger, parallax, spring, page transitions |
| **SEO Ready** | Unique page title per halaman, meta description |
| **Responsive** | Mobile-first, hamburger menu, semua halaman responsive |
| **Accessibility** | aria-labels, keyboard navigation, focus-visible, semantic HTML |

---

## 🚀 Tech Stack

- **Next.js 16** (Turbopack)
- **Tailwind CSS v4**
- **framer-motion** — animasi
- **shadcn/ui** (Radix UI primitives) — siap dipakai
- **Google Fonts** — Fredoka (display), Nunito (body), Playfair Display (serif)

---

## 📦 Instalasi

```bash
git clone <repo-url> sweetcake-store
cd sweetcake-store
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Build Production

```bash
npm run build
npm start
```

---

## 🎨 Kustomisasi

Semua konfigurasi brand ada di **satu file**: `src/lib/config.js`

### Ganti Nama Toko

Edit `src/lib/config.js`:

```js
export const siteConfig = {
  name: 'Toko Kamu',          // ← nama toko
  tagline: 'Toko Kue Premium',
  description: 'Deskripsi toko kamu...',
  // ...
};
```

### Ganti Contact & Social Media

```js
contact: {
  email: 'kamu@email.com',
  phone: '08xx-xxxx-xxxx',
  address: 'Kota, Indonesia',
},
social: {
  instagram: 'https://instagram.com/akun_kamu',
  instagramHandle: '@akun_kamu',
},
```

### Ganti Hero Section

```js
hero: {
  badge: 'Homemade dengan Cinta',
  title: 'Tagline Utama',
  titleHighlight: 'Kata Kunci',
  subtitle: 'Deskripsi hero...',
  cta: 'Tombol CTA',
  socialProof: 'Dicintai {count} pelanggan',
  socialProofCount: '1.000+',
},
```

### Ganti Semua Teks Halaman

Setiap halaman punya konfigurasi teks masing-masing di `config.js`:
- `katalogPage`, `keranjangPage`, `checkoutPage`, `galeriPage`, `pesananSuksesPage`
- `aboutPage`, `testimoniPage`, `testimonialsSection`, `instagramSection`
- `moodSection`, `categoriesSection`, `productsSection`, `ctaSection`
- `footer`, `nav`, `admin`

### Ganti Warna

Edit `src/app/globals.css` — semua CSS variables ada di `:root` dan `.dark`.

### Ganti Logo

Di `Navbar.js` — cari `🧁` dan ganti dengan logo/icon kamu.

### Ganti Gambar

Semua gambar background ada di `src/app/page.js` — array `BG_IMAGES`.

---

## 📦 Data & Konten

Semua data disimpan sebagai **JSON files** di `src/data/`:

| File | Isi |
|------|-----|
| `products.json` | Produk — `id, name, slug, price, image, description, categoryId, stock, featured` |
| `categories.json` | Kategori — `id, name, slug, description` |
| `testimonials.json` | Testimoni — `id, name, message, rating, photo, createdAt` |
| `gallery.json` | Galeri foto — `id, image, caption` |
| `orders.json` | Pesanan (otomatis dari form checkout) |

Tinggal edit file JSON-nya langsung — **no database needed**.

---

## 📂 Struktur Project

```
src/
├── app/
│   ├── page.js                # Homepage (7 section)
│   ├── layout.js              # Root layout + metadata
│   ├── globals.css            # CSS variables, keyframes, theme
│   ├── katalog/               # Katalog + detail produk
│   ├── keranjang/             # Keranjang belanja
│   ├── checkout/              # Checkout form
│   ├── galeri/                # Galeri foto
│   ├── testimoni/             # Testimoni + form
│   ├── pesanan-sukses/        # Sukses page
│   ├── tentang/               # About page
│   └── admin/                 # Admin panel (CRUD)
├── components/
│   ├── Navbar.js              # Fixed glassmorphism navbar
│   ├── Footer.js              # 4-column footer
│   ├── CakeMood.js            # Mood finder component
│   ├── ParallaxSection.js     # Reusable parallax wrapper
│   ├── Reveal.js              # Scroll reveal animation
│   ├── Skeleton.js            # Loading skeletons
│   ├── Sprinkles.js           # Decorative sprinkles
│   ├── TestimonialCarousel.js # Auto-slide carousel
│   ├── Breadcrumb.js          # Breadcrumb navigation
│   ├── PageTransition.js      # Page fade transition
│   ├── ThemeProvider.js       # Dark/light mode provider
│   └── ThemeToggle.js         # Theme toggle button
├── lib/
│   └── config.js              # ★ Semua konfigurasi brand
├── hooks/
│   └── useTitle.js            # SEO title hook
└── data/                      # JSON data files
```

---

## 🌐 Deploy ke Vercel

```bash
npm run build    # pastikan build success
```

Push ke GitHub, connect ke Vercel, deploy.

Sudah include `next.config.mjs` dengan `remotePatterns` untuk `images.unsplash.com`.

---

## 📄 License

MIT — bebas pakai, edit, jual lagi untuk client.

---

## 🧁 Admin Panel

**URL:** `/admin` (sidebar navigasi)
**Login:** `admin / admin123`

Dashboard statistik, CRUD Produk, Kategori, Pesanan, Testimoni, Galeri.
