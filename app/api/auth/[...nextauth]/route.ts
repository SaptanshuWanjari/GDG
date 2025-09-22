import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/db/mongo";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Add custom user properties to session
      if (session.user) {
        const client = await clientPromise;
        const db = client.db("LibraryManagement");

        // Check if user is an admin
        const admin = await db
          .collection("admins")
          .findOne({ email: session.user.email });
        if (admin) {
          session.user.isAdmin = true;
          session.user.isOwner = admin.isOwner || false;
          session.user.id = admin._id.toString();
        } else {
          // Check if user exists in regular users collection
          const regularUser = await db
            .collection("users")
            .findOne({ email: session.user.email });
          if (regularUser) {
            session.user.isAdmin = false;
            session.user.isOwner = false;
            session.user.id = regularUser._id.toString();
          } else {
            // Create new user if doesn't exist
            const newUser = {
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
              createdAt: new Date(),
              isAdmin: false,
              isOwner: false,
            };
            const result = await db.collection("users").insertOne(newUser);
            session.user.id = result.insertedId.toString();
            session.user.isAdmin = false;
            session.user.isOwner = false;
          }
        }
      }
      return session;
    },
    async signIn() {
      // Allow sign in
      return true;
    },
    async redirect({ baseUrl }) {
      // Redirect to base URL
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "database" as const,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
