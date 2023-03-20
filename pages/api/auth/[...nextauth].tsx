import NextAuth, { Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
 
	pages: {
		signIn: "/auth/signin",
	},
  
  callbacks: {
    async session({ session, token,user }:any) {
      // Send properties to the client, like an access_token and user id from a provider.
         session.user.username = session.user.name
         .split(" ")
         .join("")
         .toLocaleLowerCase();

         session.user.uuid = token.sub;
      return session
    }
  },
 
  secret: process.env.JWT_SECRET,
 
}

export default NextAuth(authOptions)