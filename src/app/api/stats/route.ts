import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('parmak_token')?.value;
    if (!token) return NextResponse.json({ error: 'Giriş yapılmamış' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'STUDENT') {
      // Sadece öğrenciler istatistik gönderebilir (Veya admin deneme yapıyorsa izin verilebilir)
      if (!payload || payload.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
      }
    }

    const { lessonId, wpm, errors, timeSeconds, accuracy, correctWords, incorrectWords, errorRate } = await req.json();

    if (!lessonId || typeof wpm !== 'number' || typeof errors !== 'number') {
      return NextResponse.json({ error: 'Eksik veri' }, { status: 400 });
    }

    const result = await prisma.lessonResult.create({
      data: {
        userId: payload.id,
        lessonId,
        wpm,
        errors,
        timeSeconds: timeSeconds || 0,
        accuracy: accuracy || 0,
        correctWords: correctWords || 0,
        incorrectWords: incorrectWords || 0,
        errorRate: errorRate || 0
      }
    });

    return NextResponse.json({ message: 'İstatistik kaydedildi', result });
  } catch (err) {
    return NextResponse.json({ error: 'İstatistik kaydedilirken hata oluştu' }, { status: 500 });
  }
}
