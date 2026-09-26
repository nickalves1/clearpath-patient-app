import NextAuth from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    {
      id: "hydra",
      name: "Hydra",
      type: "oidc",
      issuer: process.env.AUTH_HYDRA_ISSUER,
      clientId: process.env.AUTH_HYDRA_ID,
      clientSecret: process.env.AUTH_HYDRA_SECRET,
      checks: ["pkce", "state"],
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      session.idToken = token.idToken as string
      return session
    },
  },
})
