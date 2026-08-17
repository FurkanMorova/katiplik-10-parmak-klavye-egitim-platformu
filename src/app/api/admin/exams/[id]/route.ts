import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get('parmak_token')?.value;
    if (!token) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Erişim reddedildi' }, { status: 403 });
    }

    const { id } = await params;

    await prisma.examContent.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Sınav metni silindi' });
  } catch (err) {
    return NextResponse.json({ error: 'Sınav metni silinirken hata oluştu' }, { status: 500 });
  }
}
