import { NextResponse } from 'next/server';
import { readData, writeData, getNextId } from '@/lib/dataHelper';

export async function GET() {
  const testimonials = readData('testimonials');
  return NextResponse.json(testimonials);
}

export async function POST(request) {
  const body = await request.json();
  const testimonials = readData('testimonials');
  const newTestimonial = {
    id: getNextId(testimonials),
    ...body,
    createdAt: new Date().toISOString().split('T')[0],
  };
  testimonials.push(newTestimonial);
  writeData('testimonials', testimonials);
  return NextResponse.json(newTestimonial, { status: 201 });
}
