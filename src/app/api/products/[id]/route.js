import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataHelper';

export async function GET(request, { params }) {
  const { id } = await params;
  const products = readData('products');
  const product = products.find(p => p.id === Number(id));
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const products = readData('products');
  const index = products.findIndex(p => p.id === Number(id));
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  products[index] = { ...products[index], ...body, id: Number(id) };
  writeData('products', products);
  return NextResponse.json(products[index]);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const products = readData('products');
  const filtered = products.filter(p => p.id !== Number(id));
  if (filtered.length === products.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeData('products', filtered);
  return NextResponse.json({ message: 'Deleted' });
}
