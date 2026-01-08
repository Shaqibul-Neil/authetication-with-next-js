import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
  { name: "hablu", password: "1234" },
  { name: "bablu", password: "5678" },
  { name: "dablu", password: "9012" },
  { name: "kablu", password: "3456" },
];
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here

    CredentialsProvider({
      // Sign in with {name} button
      name: "Email & Password",
      //form inputs
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        secretCode: {
          label: "Secret Code",
          type: "number",
          placeholder: "enter code",
        },
      },
      async authorize(credentials, req) {
        //my own login logic
        const { username, password, secretCode } = credentials;
        //find user
        const user = userList.find((u) => u.name === username);
        //if no user
        if (!user) return null;
        //user exists then match password
        const isPasswordOk = user.password === password;
        if (isPasswordOk) return user;
        return null;
      },
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
