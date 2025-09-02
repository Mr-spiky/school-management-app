import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), 'public', 'schoolImages', filename);
    
    // Save file
    await writeFile(filepath, buffer);
    
    return NextResponse.json({ filename: `/schoolImages/${filename}` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}