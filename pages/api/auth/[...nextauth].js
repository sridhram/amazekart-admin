import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  secret:process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callback:{
    async jwt({token, account, user}){
       if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
    },
    adapter: MongoDBAdapter(clientPromise),
  }
}
export default NextAuth(authOptions);