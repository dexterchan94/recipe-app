import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Dexter Chan',
    email: 'dexter@chan.com',
    recipes: {
      create: [
        {
          title: 'Recipe 1',
        },
        {
          title: 'Recipe 2',
        },
      ],
    },
  },
  {
    name: 'Walter White',
    email: 'heisen@berg.com',
    recipes: {
      create: [
        {
          title: 'Blue Sky',
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
