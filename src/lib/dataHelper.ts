import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

export function readData(filename) {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function writeData(filename, data) {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getNextId(items) {
  if (items.length === 0) return 1;
  return Math.max(...items.map(item => item.id)) + 1;
}

// Serverless-compatible read using /tmp directory
// Falls back to source data directory if /tmp not available
export function readDataServerless(filename) {
  const tmpPath = path.join('/tmp', 'sweetcake-data', `${filename}.json`);
  const srcPath = path.join(process.cwd(), 'src', 'data', `${filename}.json`);

  if (fs.existsSync(tmpPath)) {
    return JSON.parse(fs.readFileSync(tmpPath, 'utf-8'));
  }

  const data = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
  try {
    fs.mkdirSync(path.dirname(tmpPath), { recursive: true });
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch {}
  return data;
}

export function writeDataServerless(filename, data) {
  const tmpPath = path.join('/tmp', 'sweetcake-data', `${filename}.json`);

  try {
    fs.mkdirSync(path.dirname(tmpPath), { recursive: true });
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch {}

  const srcPath = path.join(process.cwd(), 'src', 'data', `${filename}.json`);
  try {
    fs.writeFileSync(srcPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch {}
}
