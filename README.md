# 🧁 SweetCake Bakery — Next.js Template Toko Kue Premium

> **Next.js 16 + Tailwind CSS v4 + framer-motion + TypeScript** — Template landing page toko kue homemade premium dengan animasi scroll cinematic, dark/light mode, dan admin panel CRUD lengkap. Siap deploy dalam 5 menit.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-sweetcake--bakery.vercel.app-FF6B8A?style=for-the-badge)](https://sweetcake-bakery.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## ✨ Preview

| Halaman | Public | Admin |
|---------|--------|-------|
| **Landing Page** | Hero parallax, mood finder, kategori, produk, instagram feed, testimoni, CTA | Dashboard statistik |
| **Katalog** | Grid produk, filter kategori, search, skeleton loading | CRUD produk |
| **Detail Produk** | Quantity picker, add-to-cart dengan animasi | Edit produk |
| **Keranjang** | Animated cart, quantity control, exit animations | — |
| **Checkout** | Multi-step form, order summary, loading state | Manajemen pesanan |
| **Galeri** | Masonry grid dengan lightbox viewer | Upload/delete foto |
| **Testimoni** | Hero stats, masonry grid, form submit | Delete testimoni |
| **Tentang** | Cerita brand, visi, misi, keunggulan | — |
| **Resep** | API ready (data included) | — |

---

## 🚀 Fitur Lengkap

### 🎨 Frontend
- **7 Section Landing Page** — Hero parallax, Cake Mood Finder interaktif, kategori, produk unggulan, Instagram feed, testimoni carousel, CTA
- **Animasi Cinematic** — framer-motion: scroll reveal, parallax, spring, stagger, page transitions, floating elements
- **Dark/Light Mode** — Full theme dengan CSS variables, localStorage persist, `prefers-color-scheme` detection
- **Responsive** — Mobile-first, hamburger menu, grid adaptif, touch-friendly (min 44px)
- **Aksesibilitas** — `aria-label`, semantic HTML, focus-visible, keyboard navigation
- **Typography** — Fredoka (display), Nunito (body), Playfair Display (serif)

### 🛒 E-commerce
- **Katalog Produk** — Grid, filter kategori, search real-time, skeleton loading, empty states
- **Detail Produk** — Quantity picker animasi, add-to-cart dengan feedback
- **Keranjang** — Animated cart dengan exit animations, cart badge di navbar
- **Checkout** — Multi-step form, order summary, loading/error states
- **Pesanan Sukses** — Celebration animation

### 🔐 Admin Panel (Full CRUD)
- **Dashboard** — 4 stat cards (produk, kategori, pesanan, testimoni)
- **Produk** — Tambah/edit/hapus produk dengan form lengkap
- **Kategori** — Tambah/edit/hapus kategori
- **Pesanan** — List pesanan, update status (baru → diproses → dikirim → selesai/dibatalkan)
- **Testimoni** — Lihat/hapus testimoni pelanggan
- **Galeri** — Tambah/hapus foto galeri
- **Auth** — JWT + bcrypt + HttpOnly cookies, middleware protection, login/logout

### 🛡️ Keamanan & SEO
- **JWT Authentication** — Token-based admin auth dengan 24h expiry
- **SEO Metadata** — OpenGraph, Twitter Card, per-page unique title
- **Sitemap & Robots** — Auto-generated `sitemap.xml` dan `robots.txt`
- **Error Boundaries** — Custom 404, error pages, loading states
- **favicon** — Custom branded favicon

### ⚡ Performance
- **Next.js 16 + Turbopack** — Fast dev server, optimized production builds
- **TypeScript** — Full type safety (progressive migration, `allowJs: true`)
- **Tailwind CSS v4** — Utility-first, zero-runtime CSS
- **Lazy Loading** — `loading="lazy"` pada images, dynamic imports siap

---

## 📦 Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Next.js | 16.2.10 | Framework (App Router, Turbopack) |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| framer-motion | 12.42.2 | Animasi |
| bcryptjs | 3.x | Password hashing |
| jose | 6.x | JWT token |

---

## 🚀 Quick Start

```bash
git clone <repo-url> sweetcake-store
cd sweetcake-store
cp .env.example .env.local
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Admin Panel

| URL | Login |
|-----|-------|
| `/admin` | Username: `admin` |
| `/admin/login` | Password: `admin123` |

---

## 🎨 Kustomisasi

Semua teks brand ada di **satu file**: `src/lib/config.ts`

### Ganti Nama Toko

```ts
export const siteConfig = {
  name: 'Toko Kamu',          // ← nama toko
  tagline: 'Toko Kue Premium',
  description: 'Deskripsi toko kamu...',
  // ...
};
```

### Ganti Warna

Edit `src/app/globals.css` — semua CSS variables di `:root` dan `.dark`.

### Ganti Logo

Di `src/components/Navbar.js` — cari `🧁` dan ganti dengan logo SVG atau icon kamu.

### Ganti Gambar

Semua gambar background di `src/components/sections/` — setiap section punya file sendiri.

---

## 📁 Struktur Project

```
sweetcake-bakery/
├── public/                    # Static assets (favicon, manifest)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.js            # Homepage (import 7 section components)
│   │   ├── layout.js          # Root layout + metadata
│   │   ├── globals.css        # CSS variables, keyframes, theme
│   │   ├── loading.js         # Root loading state
│   │   ├── error.js           # Root error boundary
│   │   ├── not-found.js       # Custom 404 page
│   │   ├── sitemap.js         # Auto-generated sitemap
│   │   ├── robots.js          # Robots.txt config
│   │   ├── katalog/           # Product catalog + detail
│   │   ├── keranjang/         # Shopping cart
│   │   ├── checkout/          # Checkout form
│   │   ├── galeri/            # Photo gallery
│   │   ├── testimoni/         # Testimonials + form
│   │   ├── pesanan-sukses/    # Order success page
│   │   ├── tentang/           # About page
│   │   ├── admin/             # Admin panel (CRUD)
│   │   └── api/               # REST API routes
│   ├── components/
│   │   ├── sections/          # ★ Homepage section components
│   │   │   ├── HeroSection.js
│   │   │   ├── MoodSection.js
│   │   │   ├── CategoriesSection.js
│   │   │   ├── ProductsSection.js
│   │   │   ├── InstagramSection.js
│   │   │   ├── TestimonialsSection.js
│   │   │   └── CTASection.js
│   │   ├── Navbar.js          # Fixed glassmorphism navbar
│   │   ├── Footer.js          # 4-column footer
│   │   ├── CakeMood.js        # Mood finder component
│   │   ├── ParallaxSection.js # Reusable parallax wrapper
│   │   ├── Reveal.js          # Scroll reveal animation
│   │   ├── Skeleton.js        # Loading skeletons
│   │   ├── Sprinkles.js       # Decorative sprinkles
│   │   ├── TestimonialCarousel.js
│   │   ├── Breadcrumb.js      # Breadcrumb navigation
│   │   ├── PageTransition.js  # Page fade transition
│   │   ├── ThemeProvider.js   # Dark/light mode provider
│   │   └── ThemeToggle.js     # Theme toggle button
│   ├── lib/
│   │   ├── config.ts          # ★ Semua konfigurasi brand
│   │   └── dataHelper.ts      # JSON file read/write
│   ├── hooks/
│   │   └── useTitle.ts        # SEO title hook
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   └── data/                  # JSON data files
│       ├── products.json
│       ├── categories.json
│       ├── testimonials.json
│       ├── gallery.json
│       ├── orders.json
│       ├── admin.json
│       └── resep.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.js         # (via @tailwindcss/postcss)
└── package.json
```

---

## 🌐 Deploy ke Vercel

```bash
npm run build
```

Push ke GitHub, connect ke Vercel, deploy.

**Catatan:** Template ini menggunakan JSON file storage. Untuk Vercel (serverless), data akan persist selama session. Untuk production, upgrade ke database (Supabase, MongoDB, etc) — atau gunakan mode `/tmp` fallback yang sudah tersedia di `dataHelper.ts`.

---

## 📄 License

MIT — bebas pakai, edit, dan jual kembali untuk client projects.

---

## 🧁 Support

Butuh bantuan? Ada saran? Feel free to reach out:
- Email: hello@sweetcake.id
- Instagram: @sweetcake_id

---

<p align="center">Dibuat dengan 💖 dan 🧁</p>
