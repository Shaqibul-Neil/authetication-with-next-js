import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

//next auth creates a session that takes only name, image, email.
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here

    CredentialsProvider({
      // Sign in with {name} button
      name: "Email & Password",
      //form inputs
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials, req) {
        //my own login logic
        const { email, password } = credentials;
        //find user in database
        const user = await dbConnect("users").findOne({ email });
        //if no user
        if (!user) return null;
        //user exists then match password
        const isPasswordOk = await bcrypt.compare(password, user.password);
        if (isPasswordOk) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    //order of execution 1
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    //order of execution 4
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    //order of execution 3
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    //order of execution 2
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
