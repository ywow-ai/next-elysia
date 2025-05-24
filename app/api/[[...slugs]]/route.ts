// app/api/[[...slugs]]/route.ts
import "server-only";
import { Elysia, t } from "elysia";
import { PrismaClient } from "@/database/generated";
import * as hash from "@/config/hashing";

const prisma = new PrismaClient();

const app = new Elysia({ prefix: "/api" })
  .get("/", async () => {
    "use server";

    return {
      msg: "elysia api ok",
    };
  })
  .post(
    "/login",
    async ({ body: { identifier, password }, set }) => {
      "use server";

      try {
        const finded = await prisma.user.findFirst({
          where: { OR: [{ username: identifier }, { email: identifier }] },
        });

        if (!finded) {
          set.status = 401;
          return { message: "Unauthorized" };
        }

        const isValid = await hash.password.verify(password, finded.password);
        if (!isValid) {
          set.status = 401;
          return { message: "Unauthorized" };
        }

        set.status = 200;
        return { message: "Authorized" };
      } catch (error) {
        set.status = 500;
        return { message: String(error) };
      }
    },
    {
      body: t.Object({
        identifier: t.String(),
        password: t.String(),
      }),
      response: {
        200: t.Object({ message: t.String() }),
        401: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
    }
  );

export const GET = app.handle;
export const POST = app.handle;
export type App = typeof app;
