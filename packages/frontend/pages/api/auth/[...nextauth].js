import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

import { UserRepository } from "../../../database";

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          console.log("CREDENTIALS", credentials);
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          // const result = await siwe.validate({
          //   signature: credentials?.signature || "",
          //   domain: nextAuthUrl.host,
          //   nonce: await getCsrfToken({ req }),
          // });
          const nonce = await getCsrfToken({ req });
          // console.log("PAS POR AQUI", siwe);
          // const result = await siwe.validate(credentials?.signature || "");

          // if (nonce === result?.nonce) {
          if (nonce === siwe?.nonce) {
            return await new UserRepository().validate(siwe.address);
          }
          return null;
        } catch (e) {
          console.log("Saco error", e);
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      maxAge: 2592000, /// 30d
      strategy: "jwt",
      updateAge: 86400, // cada día
    },
    pages: {
      signIn: "/auth/signin",
      signOut: "/auth/signout",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, account, user }) {
        console.log("JWT ======>", { token, account, user });

        if (account) {
          token.address = account.address;
        }

        return token;
      },
      async session({ session, token }) {
        console.log("OE!! ======> ", session, token);
        
        session.address = token.address;
        session.user.name = token.name;
        session.user.image = "https://www.fillmurray.com/128/128";
        return session;
      },
    },
  });
}
