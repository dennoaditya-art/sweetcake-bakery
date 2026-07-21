import { NextResponse } from 'next/server';
import { readData, writeData, getNextId } from '@/lib/dataHelper';

export async function GET() {
  const orders = readData('orders');
  return NextResponse.json(orders);
}

export async function POST(request) {
  const body = await request.json();
  const orders = readData('orders');
  const newOrder = {
    id: getNextId(orders),
    ...body,
    status: 'baru',
    createdAt: new Date().toISOString().split('T')[0],
  };
  orders.push(newOrder);
  writeData('orders', orders);
  return NextResponse.json(newOrder, { status: 201 });
}
