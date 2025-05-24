import { password } from "@/config/hashing";
import type { Prisma } from "@/database/generated";

const hash = async (
  user: Prisma.UserCreateInput
): Promise<Prisma.UserCreateInput> => ({
  ...user,
  password: await password.make(user.password),
});

export default async (): Promise<Prisma.UserCreateInput[]> =>
  await Promise.all(
    [
      {
        email: "admin@gmail.com",
        name: "admin",
        password: "admin123",
      },
      {
        email: "admin@gmail.com",
        name: "Admin",
        password: "admin123",
      },
      {
        email: "user1@example.com",
        name: "Alice",
        password: "password1",
      },
      {
        email: "user2@example.com",
        name: "Bob",
        password: "password2",
      },
      {
        email: "mod@example.com",
        name: "Moderator",
        password: "modsecure",
      },
    ].map(hash)
  );
