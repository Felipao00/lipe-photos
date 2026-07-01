import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'site-data.json');

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { photos: [], about: '', music: '/audio/musica.mp3', logo: '' };
  }
}

function saveData(data: any) {
  // Garante que a pasta data existe
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = readData();
  
  if (body.photo) {
    data.photos.push(body.photo);
  }
  if (body.about !== undefined) {
    data.about = body.about;
  }
  if (body.music !== undefined) {
    data.music = body.music;
  }
  if (body.logo !== undefined) {
    data.logo = body.logo;
  }
  
  saveData(data);
  return NextResponse.json({ success: true, logo: data.logo });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const data = readData();
  data.photos = data.photos.filter((p: any) => p.id !== id);
  saveData(data);
  return NextResponse.json({ success: true });
}