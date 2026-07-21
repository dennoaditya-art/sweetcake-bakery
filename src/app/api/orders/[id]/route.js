import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/dataHelper';

export async function GET(request, { params }) {
  const { id } = await params;
  const orders = readData('orders');
  const order = orders.find(o => o.id === Number(id));
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const orders = readData('orders');
  const index = orders.findIndex(o => o.id === Number(id));
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  orders[index] = { ...orders[index], ...body, id: Number(id) };
  writeData('orders', orders);
  return NextResponse.json(orders[index]);
}
