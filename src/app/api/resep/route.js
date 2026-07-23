import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'src', 'data', 'resep.json');

function getResep() {
  return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
}

function saveResep(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const data = getResep();
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = getResep();
  const id = data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1;
  const resep = {
    id,
    slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    ...body,
    createdAt: new Date().toISOString().split('T')[0],
  };
  data.push(resep);
  saveResep(data);
  return Response.json(resep, { status: 201 });
}

export async function PUT(req) {
  const body = await req.json();
  const data = getResep();
  const idx = data.findIndex(r => r.id === body.id);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  saveResep(data);
  return Response.json(data[idx]);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id'));
  const data = getResep().filter(r => r.id !== id);
  saveResep(data);
  return Response.json({ success: true });
}
