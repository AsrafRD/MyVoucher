const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  const users = [
    {
      username: "user1",
      password: "password1",
      email: "user1@example.com",
      nama: "User One",
    },
    {
      username: "user2",
      password: "password2",
      email: "user2@example.com",
      nama: "User Two",
    },
    {
      username: "user3",
      password: "password3",
      email: "user3@example.com",
      nama: "User Three",
    },
  ];

  for (const user of users) {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  console.log('Data dummy untuk tabel User telah berhasil dibuat.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
