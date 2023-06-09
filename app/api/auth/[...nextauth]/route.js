import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import User from "@/models/user";
import dbConnect from "@/utils/database.js";

dbConnect();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = await sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile, credentials, user }) {
      try {
        const user = await User.findOne({ email: profile.email });
        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
