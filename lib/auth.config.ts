import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// This file is edge-safe — no Node.js-only imports (like mongoose/bcrypt) here.
// Heavy validation (DB lookup, password check) happens in `authorize` within auth.ts.

export default {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "your@email.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            // `authorize` is intentionally omitted here.
            // It's defined in auth.ts where we can safely use mongoose & bcrypt.
        }),
    ],
    pages: {
        signIn: "/login",
    },
} satisfies NextAuthConfig;
