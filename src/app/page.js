'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import MoodSection from '@/components/sections/MoodSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import InstagramSection from '@/components/sections/InstagramSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
    fetch('/api/categories').then(r => r.json()).then(setCategories);
    fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
  }, []);

  return (
    <div className="relative">
      <HeroSection products={products} />
      <MoodSection />
      <CategoriesSection categories={categories} />
      <ProductsSection products={products} />
      <InstagramSection />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </div>
  );
}
