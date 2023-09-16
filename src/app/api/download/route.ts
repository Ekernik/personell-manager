import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/utils/authOptions';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 403, message: 'Access Denied' });
  }

  const filePath = path.join(process.cwd(), 'src', 'db', 'data.db');

  if (req.method !== 'GET') return;
  if (!fs.existsSync(filePath)) return;

  const file = fs.readFileSync(filePath);

  return new NextResponse(file, {
    headers: { 'content-type': 'application/octet-stream' },
  });
}
