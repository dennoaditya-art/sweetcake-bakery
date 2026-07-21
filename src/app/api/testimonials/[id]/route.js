import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataHelper';

export async function DELETE(request, { params }) {
  const { id } = await params;
  const testimonials = readData('testimonials');
  const filtered = testimonials.filter(t => t.id !== Number(id));
  if (filtered.length === testimonials.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeData('testimonials', filtered);
  return NextResponse.json({ message: 'Deleted' });
}
