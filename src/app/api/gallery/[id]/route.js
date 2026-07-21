import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataHelper';

export async function DELETE(request, { params }) {
  const { id } = await params;
  const gallery = readData('gallery');
  const filtered = gallery.filter(g => g.id !== Number(id));
  if (filtered.length === gallery.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeData('gallery', filtered);
  return NextResponse.json({ message: 'Deleted' });
}
