import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const type = formData.get('type') as string; // 'photo' ou 'audio'
  
  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const folder = type === 'audio' ? 'audio' : 'photos';
  const dir = path.join(process.cwd(), 'public', folder);
  await mkdir(dir, { recursive: true });
  
  const filePath = path.join(dir, file.name);
  await writeFile(filePath, buffer);
  
  const url = `/${folder}/${file.name}`;
  
  return NextResponse.json({ url });
}