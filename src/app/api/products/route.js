import { NextResponse } from 'next/server';
import { readData, writeData, getNextId } from '@/lib/dataHelper';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const search = searchParams.get('search');

  let products = readData('products');

  if (category) {
    products = products.filter(p => p.categoryId === Number(category));
  }
  if (featured === 'true') {
    products = products.filter(p => p.featured);
  }
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(products);
}

export async function POST(request) {
  const body = await request.json();
  const products = readData('products');
  const newProduct = {
    id: getNextId(products),
    ...body,
    featured: body.featured || false,
    stock: body.stock !== undefined ? body.stock : true,
    createdAt: new Date().toISOString().split('T')[0],
  };
  products.push(newProduct);
  writeData('products', products);
  return NextResponse.json(newProduct, { status: 201 });
}
