import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { mongooseConnect } from "@/lib/mongoose"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        Credentials({
            name: "credentials",
            credentials: {},


            async authorize(credentials) {
                const { email, password } = credentials as Record<string, string>;

                try {
                    await mongooseConnect();
                    // Assuming you have a User model and a validateUser function
                    const user = await User.findOne({ email });
                    if (!user) return null;

                    const comparePassword = await bcrypt.compare(password, user.password)

                    if (!comparePassword) return null;

                    return user;

                } catch (err) {
                    // Handle error
                    console.log(err, "error")
                }

                // Return null if authentication fails
                return null;
            }
        })
    ],
}
const handler = NextAuth(authOptions)


export { handler as GET, handler as POST };