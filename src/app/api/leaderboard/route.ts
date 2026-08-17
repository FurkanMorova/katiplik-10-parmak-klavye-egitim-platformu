import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'weekly';
    const type = searchParams.get('type') || 'exam'; // 'exam' (3dk doğru kelime) | 'speed' (genel DBK)

    let dateFilter: { gte?: Date } | undefined;
    const now = new Date();

    if (period === 'daily') {
      dateFilter = { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) };
    } else if (period === 'weekly') {
      dateFilter = { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
    }

    const isExam = type === 'exam';

    // 3 dakikalık katiplik sınavlarında en az 170 saniye yazılmış ve doğru kelimesi olanlar
    const whereClause: any = {
      ...(dateFilter ? { createdAt: dateFilter } : {}),
      ...(isExam ? { correctWords: { gt: 0 }, timeSeconds: { gte: 170 } } : { wpm: { gt: 0 } }),
    };

    const results = await prisma.lessonResult.groupBy({
      by: ['userId'],
      _max: {
        wpm: true,
        correctWords: true,
        accuracy: true,
      },
      _count: { id: true },
      where: whereClause,
      orderBy: isExam ? { _max: { correctWords: 'desc' } } : { _max: { wpm: 'desc' } },
      take: 15,
    });

    if (results.length === 0) {
      return Response.json([]);
    }

    const userIds = results.map(r => r.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, firstName: true, lastName: true },
    });

    const userMap = new Map(users.map(u => [u.id, u]));

    const leaderboard = results.map((r, i) => ({
      rank: i + 1,
      userId: r.userId,
      firstName: userMap.get(r.userId)?.firstName || 'Anonim',
      lastName: userMap.get(r.userId)?.lastName?.charAt(0) || '',
      bestScore: isExam ? (r._max.correctWords || 0) : (r._max.wpm || 0),
      bestWpm: r._max.wpm || 0,
      bestCorrectWords: r._max.correctWords || 0,
      bestAccuracy: r._max.accuracy || 0,
      totalTests: r._count.id,
      type,
    }));

    return Response.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard API error:', error);
    return Response.json([]);
  }
}
