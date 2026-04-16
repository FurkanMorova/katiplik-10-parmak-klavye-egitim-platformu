import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('parmak_token')?.value;
    if (!token) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Erişim reddedildi' }, { status: 403 });
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Başlık ve içerik zorunludur' }, { status: 400 });
    }

    const newExam = await prisma.examContent.create({
      data: { title, content }
    });

    return NextResponse.json(newExam);
  } catch (err) {
    return NextResponse.json({ error: 'Sınav metni eklenirken hata oluştu' }, { status: 500 });
  }
}
