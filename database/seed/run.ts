import { PrismaClient } from "@/database/generated";
import userSeeder from "@/database/seed/user-seeder";

const prisma = new PrismaClient();

(async () => {
  const users = await userSeeder();
  await prisma.user.deleteMany();

  const r = await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Seeded:", r.count, "users");
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
