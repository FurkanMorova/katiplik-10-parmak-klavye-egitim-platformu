const { PrismaClient } = require('@prisma/client');

async function testConnection(url, name) {
  const prisma = new PrismaClient({
    datasources: { db: { url } },
  });
  try {
    const count = await prisma.user.count();
    console.log(`\n✅ [BASARILI] ${name} - Baglanti calisiyor!!! Kullanici sayisi: ${count}`);
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.log(`\n❌ [HATA] ${name} - TAM HATA:`);
    console.error(error);
    await prisma.$disconnect();
    return false;
  }
}

async function main() {
  console.log("Supabase Baglanti Testi Basliyor (Detayli Hata)...");
  await testConnection("postgresql://postgres.wuxvlltnziwjjhihvfpb:Onparmak2026!@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true", "Vercel icin gecerli Pooler Baglantisi (6543)");
}
main();
