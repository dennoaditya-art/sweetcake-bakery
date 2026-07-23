export interface Product {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  price: number;
  description: string;
  image: string;
  featured: boolean;
  stock: boolean;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
  photo?: string;
}

export interface GalleryItem {
  id: number;
  image: string;
  caption: string;
}

export interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  notes?: string;
  items: CartItem[];
  total: number;
  status: 'baru' | 'diproses' | 'dikirim' | 'selesai' | 'dibatalkan';
  createdAt: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export interface AdminUser {
  username: string;
  passwordHash: string;
}
