import { NextResponse } from 'next/server';
import { readData, writeData, getNextId } from '@/lib/dataHelper';

export async function GET() {
  const categories = readData('categories');
  return NextResponse.json(categories);
}

export async function POST(request) {
  const body = await request.json();
  const categories = readData('categories');
  const newCategory = {
    id: getNextId(categories),
    ...body,
  };
  categories.push(newCategory);
  writeData('categories', categories);
  return NextResponse.json(newCategory, { status: 201 });
}
