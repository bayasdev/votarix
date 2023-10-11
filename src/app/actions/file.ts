'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadFile(data: FormData) {
  const file: File | null = data.get('file') as File;

  if (!file) throw new Error('No file provided');

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // save file to /public/uploads
  const path = join(process.cwd(), 'public', 'uploads', file.name);
  await writeFile(path, buffer);
  console.log(`File saved to ${path}`);

  return { message: 'File uploaded' };
}
