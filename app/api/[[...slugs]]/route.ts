// app/api/[[...slugs]]/route.ts
import "server-only";
import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api" }).get("/", async () => ({
  msg: "elysia api ok",
}));

export const GET = app.handle;
export const POST = app.handle;
export type App = typeof app;
