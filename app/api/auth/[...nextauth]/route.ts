import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/app/db/mongo";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const client = await clientPromise;
          const dbName = process.env.MONGODB_DB || "LibraryManagement";
          const db = client.db(dbName);

          let user = null;
          let isAdmin = false;
          let isOwner = false;

          // Check admins collection first
          const admin = await db
            .collection("admins")
            .findOne({ email: credentials.email });
          if (admin) {
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              admin.password
            );
            if (passwordMatch) {
              user = admin;
              isAdmin = true;
              isOwner = admin.isOwner || false;
            }
          } else {
            // Check regular users collection
            const regularUser = await db
              .collection("users")
              .findOne({ email: credentials.email });
            if (regularUser) {
              const passwordMatch = await bcrypt.compare(
                credentials.password,
                regularUser.password
              );
              if (passwordMatch) {
                user = regularUser;
                isAdmin = false;
                isOwner = false;
              }
            }
          }

          if (user) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              isAdmin,
              isOwner,
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist user data to token
      if (user) {
        token.isAdmin = user.isAdmin;
        token.isOwner = user.isOwner;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send token properties to client
      if (token) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.isOwner = token.isOwner as boolean;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // When signing in with Google, ensure we persist the user to our users collection
      try {
        if (account?.provider === "google") {
          const client = await clientPromise;
          const db = client.db(process.env.MONGODB_DB || "LibraryManagement");

          // Robust email extraction from user/profile
          const profileAny = profile as unknown as Record<string, unknown>;
          const getFirstEmail = (p: Record<string, unknown> | undefined) => {
            if (!p) return null;
            const e = p.email;
            if (typeof e === "string" && e.length > 0) return e;
            const emails = p.emails;
            if (Array.isArray(emails) && emails.length > 0) {
              const first = emails[0];
              if (typeof first === "string") return first;
              if (
                first &&
                typeof first === "object" &&
                "value" in (first as Record<string, unknown>)
              ) {
                const val = (first as Record<string, unknown>).value;
                if (typeof val === "string") return val;
              }
            }
            return null;
          };

          const email =
            (user && (user.email as string)) ||
            getFirstEmail(profileAny) ||
            null;

          console.log(
            "[nextauth] signIn callback - provider:",
            account.provider,
            "email:",
            email
          );

          if (!email) {
            console.warn(
              "[nextauth] signIn: no email found in Google profile, skipping user upsert",
              { profile }
            );
            return true;
          }

          const existing = await db.collection("users").findOne({ email });
          if (!existing) {
            const insertRes = await db.collection("users").insertOne({
              name: (user && user.name) || profileAny?.name || "",
              email,
              image: (user && user.image) || profileAny?.picture || null,
              createdAt: new Date(),
            });
            console.log(
              "[nextauth] signIn: inserted new user with id",
              insertRes.insertedId?.toString()
            );
          } else {
            // update existing profile fields if missing
            const updateRes = await db.collection("users").updateOne(
              { email },
              {
                $set: {
                  name: (user && user.name) || existing.name,
                  image: (user && user.image) || existing.image,
                },
              }
            );
            console.log("[nextauth] signIn: updated existing user", {
              matchedCount: updateRes.matchedCount,
              modifiedCount: updateRes.modifiedCount,
            });
          }
        }
      } catch (err) {
        console.error("Error upserting Google user:", err);
      }

      return true;
    },
    // (signIn handled above for Google upsert) fallback allow sign in for other providers
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
    strategy: "jwt" as const,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
