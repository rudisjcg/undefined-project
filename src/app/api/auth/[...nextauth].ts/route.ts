import { connect } from "http2";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

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
                const { email, password } = credentials;

                try {
                    await mongooseConnect();
                }

            }
        })
    ],
}
export default NextAuth(authOptions)