const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const password = 'password123';
  
  const existingAdmin = await prisma.user.findUnique({
    where: { username }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName: 'Furkan',
        lastName: 'Morova',
        role: 'ADMIN'
      }
    });
    console.log(`BASSARILI: Admin hesabı oluşturuldu.\nKullanıcı Adı: ${username}\nŞifre: ${password}`);
  } else {
    console.log('Admin hesabı zaten mevcut.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
