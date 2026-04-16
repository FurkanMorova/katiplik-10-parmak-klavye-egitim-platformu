import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const exams = await prisma.examContent.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(exams);
  } catch (err) {
    console.error("Fetch exams error:", err);
    return NextResponse.json({ error: 'Sınav metinleri yüklenemedi.' }, { status: 500 });
  }
}
