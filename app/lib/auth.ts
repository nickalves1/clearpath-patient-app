import NextAuth from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
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
})