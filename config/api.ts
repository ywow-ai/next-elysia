import { treaty } from "@elysiajs/eden";
import type { App } from "@/app/api/[[...slugs]]/route";

const { api } = treaty<App>("http://localhost:3000");

export { api };
