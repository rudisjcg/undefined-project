import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { SessionStrategy } from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await mongooseConnect();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await User.findOne({ email });

        if (!user) return null;

        const passwordCorrect = await bcrypt.compare(password, user?.password);

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};
const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
});

export { handler as GET, handler as POST };
