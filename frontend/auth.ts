import { Console } from "console";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { createUser, userExists } from "./lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })],

    callbacks: {
        async signIn({ user }) {
            // Custom logic after user signs in
            const check = await userExists(user);
            console.log(user)
            console.log(check)
            if (!check.data) {
                console.log("start")
                const response = await createUser(user);
                console.log(await response);
            }

            // You can perform any synchronous or asynchronous tasks here
            // For example, logging, database updates, etc.

            // Return true to proceed with the sign in
            // Return false to deny access
            return true;
        }
    },
    trustHost: true,
})