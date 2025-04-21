import {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type CustomSession  from "../../models/CustomSession";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                try {
                    const res = await fetch("http://localhost:3000/users/register", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            name: user.name,
                            phone: "",
                            password: "true",
                            email: user.email,
                            address: "",
                            zipcode: 0,
                            role: 0,
                        }),
                    });

                    if (!res.ok) {
                        console.log("Lỗi request:", await res.json());
                        return token;
                    }
                    const data = await res.json();
                    token.accessToken = data.access_token;
                    token.refreshToken = data.refresh_token;

                } catch (error) {
                    console.log("Lỗi request:", error);
                }
            }
            return token;
        },
        async session({session, token}) {
            return {
                ...session,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            } as CustomSession;
        }

    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
};
