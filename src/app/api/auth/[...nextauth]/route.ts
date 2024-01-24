import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import { SessionStrategy } from "next-auth";
import authOptions from "./option";

const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
});

export { handler as GET, handler as POST };
