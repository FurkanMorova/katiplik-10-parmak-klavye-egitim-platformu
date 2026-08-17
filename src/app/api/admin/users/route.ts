import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/auth';

// Get all students
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('parmak_token')?.value;
    if (!token) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Erişim reddedildi' }, { status: 403 });
    }

    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        results: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Ortalama analizleri yapalım
    const enriched = students.map(st => {
      const totalResults = st.results.length;
      const totalWpm = st.results.reduce((acc, r) => acc + r.wpm, 0);
      const totalErrors = st.results.reduce((acc, r) => acc + r.errors, 0);
      const totalTime = st.results.reduce((acc, r) => acc + r.timeSeconds, 0);
      const totalCorrectWords = st.results.reduce((acc, r) => acc + (r.correctWords || 0), 0);
      const totalIncorrectWords = st.results.reduce((acc, r) => acc + (r.incorrectWords || 0), 0);
      const totalErrorRate = st.results.reduce((acc, r) => acc + (r.errorRate || 0), 0);

      // Ders bazlı gruplama
      const lessonMap: Record<string, any> = {};
      st.results.forEach(r => {
        if (!lessonMap[r.lessonId]) {
          lessonMap[r.lessonId] = {
            lessonId: r.lessonId,
            count: 0,
            totalWpm: 0,
            totalErrors: 0,
            totalTime: 0,
            totalCorrectWords: 0,
            totalIncorrectWords: 0,
            totalErrorRate: 0
          };
        }
        const l = lessonMap[r.lessonId];
        l.count += 1;
        l.totalWpm += r.wpm;
        l.totalErrors += r.errors;
        l.totalTime += r.timeSeconds;
        l.totalCorrectWords += r.correctWords || 0;
        l.totalIncorrectWords += r.incorrectWords || 0;
        l.totalErrorRate += r.errorRate || 0;
      });

      const perLessonStats = Object.values(lessonMap).map((l: any) => ({
        lessonId: l.lessonId,
        count: l.count,
        avgWpm: Math.round(l.totalWpm / l.count),
        avgErrors: (l.totalErrors / l.count).toFixed(1),
        avgTime: (l.totalTime / l.count).toFixed(1),
        avgCorrectWords: Math.round(l.totalCorrectWords / l.count),
        avgIncorrectWords: Math.round(l.totalIncorrectWords / l.count),
        avgErrorRate: (l.totalErrorRate / l.count).toFixed(1)
      }));

      return {
        id: st.id,
        firstName: st.firstName,
        lastName: st.lastName,
        username: st.username,
        isExternal: st.isExternal ?? false,
        createdAt: st.createdAt,
        stats: {
          totalAttempts: totalResults,
          bestWpm: st.results.reduce((max, r) => Math.max(max, r.wpm), 0),
          avgWpm: totalResults > 0 ? Math.round(totalWpm / totalResults) : 0,
          avgErrors: totalResults > 0 ? (totalErrors / totalResults).toFixed(1) : 0,
          avgTime: totalResults > 0 ? (totalTime / totalResults).toFixed(1) : 0,
          avgCorrectWords: totalResults > 0 ? Math.round(totalCorrectWords / totalResults) : 0,
          avgIncorrectWords: totalResults > 0 ? Math.round(totalIncorrectWords / totalResults) : 0,
          avgErrorRate: totalResults > 0 ? (totalErrorRate / totalResults).toFixed(1) : 0,
        },
        perLessonStats
      };
    });

    return NextResponse.json(enriched);
  } catch (err) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

// Create new student
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('parmak_token')?.value;
    if (!token) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Erişim reddedildi' }, { status: 403 });
    }

    const { username, password, firstName, lastName } = await req.json();

    if (!username || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Tüm alanlar zorunludur' }, { status: 400 });
    }

    const trimmedUsername = username.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({ where: { username: trimmedUsername } });
    if (existingUser) {
      return NextResponse.json({ error: 'Bu kullanıcı adı zaten mevcut' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: trimmedUsername,
        password: hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role: 'STUDENT',
        isExternal: false,
      }
    });

    return NextResponse.json({ message: 'Öğrenci oluşturuldu', user: newUser });
  } catch (err) {
    return NextResponse.json({ error: 'Öğrenci oluşturulurken hata oluştu' }, { status: 500 });
  }
}

// Delete student (and all associated results)
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('parmak_token')?.value;
    if (!token) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Erişim reddedildi' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    let userId = searchParams.get('id');

    if (!userId) {
      try {
        const body = await req.json();
        userId = body.id;
      } catch (e) {}
    }

    if (!userId) {
      return NextResponse.json({ error: 'Kullanıcı ID zorunludur' }, { status: 400 });
    }

    // Önce kullanıcının tüm çalışma kayıtlarını sil (Foreign Key & Temizlik)
    await prisma.lessonResult.deleteMany({
      where: { userId }
    });

    // Kullanıcıyı sil
    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json({ message: 'Öğrenci ve tüm pratik verileri başarıyla silindi' });
  } catch (err) {
    console.error('Delete user error:', err);
    return NextResponse.json({ error: 'Kullanıcı silinirken hata oluştu' }, { status: 500 });
  }
}
