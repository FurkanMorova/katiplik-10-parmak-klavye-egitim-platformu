import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('parmak_token')?.value;
    if (!token) return NextResponse.json({ error: 'Giriş yapılmamış' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    const results = await prisma.lessonResult.findMany({
      where: { userId: payload.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: 'İstatistikler getirilirken hata oluştu' }, { status: 500 });
  }
}
