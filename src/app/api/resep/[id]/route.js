import { readFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'src', 'data', 'resep.json');

export async function GET(req, { params }) {
  const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  const resep = data.find(r => r.id === parseInt(params.id) || r.slug === params.id);
  if (!resep) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(resep);
}
