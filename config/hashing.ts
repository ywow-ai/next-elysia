import bcrypt from "bcrypt";

export const password = {
  async make(plain: string, saltRounds: number = 10) {
    "use server";
    return await bcrypt.hash(plain, saltRounds);
  },
  async verify(plain: string, hashed: string) {
    "use server";
    return await bcrypt.compare(plain, hashed);
  },
};
