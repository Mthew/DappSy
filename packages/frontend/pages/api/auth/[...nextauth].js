import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import db from "../../../utils/db/server";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
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
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );

          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);

          // const result = await siwe.validate({
          //   signature: credentials?.signature || "",
          //   domain: nextAuthUrl.host,
          //   nonce: await getCsrfToken({ req }),
          // });
          const nonce = await getCsrfToken({ req });
          const result = await siwe.validate(credentials?.signature || "");
          
          if (nonce === result?.nonce) {
            return await new User().validate(siwe.address);
            // return {
            //   id: siwe.address,
            // };
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
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        session.address = token.sub;
        session.user.name = token.sub;
        session.user.image = "https://www.fillmurray.com/128/128";
        return session;
      },
    },
  });
}



class User {
  constructor() {}

  async validate(address) {
    const entries = await db.collection("user").get();
    const entriesData = entries.docs.map((entry) => entry.data());

    const user = entriesData.find((entry) => entry.address === address);
    if (!user) {
      const newUser = {
        address,
        name: "no asigned name",
        created: new Date().toISOString(),
      };
      const { id } = await db.collection("user").add(newUser);
      return newUser;
    }
    return user;
  }
}
