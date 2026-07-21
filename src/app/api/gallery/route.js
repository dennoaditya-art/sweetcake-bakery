import { NextResponse } from 'next/server';
import { readData, writeData, getNextId } from '@/lib/dataHelper';

export async function GET() {
  const gallery = readData('gallery');
  return NextResponse.json(gallery);
}

export async function POST(request) {
  const body = await request.json();
  const gallery = readData('gallery');
  const newItem = {
    id: getNextId(gallery),
    ...body,
    createdAt: new Date().toISOString().split('T')[0],
  };
  gallery.push(newItem);
  writeData('gallery', gallery);
  return NextResponse.json(newItem, { status: 201 });
}
