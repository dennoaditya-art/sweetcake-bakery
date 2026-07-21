import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataHelper';

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const categories = readData('categories');
  const index = categories.findIndex(c => c.id === Number(id));
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  categories[index] = { ...categories[index], ...body, id: Number(id) };
  writeData('categories', categories);
  return NextResponse.json(categories[index]);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const categories = readData('categories');
  const filtered = categories.filter(c => c.id !== Number(id));
  if (filtered.length === categories.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeData('categories', filtered);
  return NextResponse.json({ message: 'Deleted' });
}
