import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🔐 Authorize called for login, email:", credentials?.email);

          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Missing email or password");
            throw new Error("Email and password are required");
          }

          await connectDB();

          const { email, password } = credentials;
          const normalizedEmail = email.toLowerCase().trim();
          const existingUser = await User.findOne({ email: normalizedEmail });

          // LOGIN FLOW ONLY: user must exist
          if (!existingUser) {
            console.log("❌ User not found:", normalizedEmail);
            throw new Error("Account not found. Please Sign Up.");
          }

          const isValid = await bcrypt.compare(password, existingUser.password);
          if (!isValid) {
            console.log("❌ Invalid password for:", normalizedEmail);
            throw new Error("Invalid email or password");
          }

          existingUser.lastLoginAt = new Date();
          await existingUser.save();

          console.log("✅ Login successful:", normalizedEmail);
          return {
            id: existingUser._id.toString(),
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };
        } catch (error) {
          console.error("❌ Auth error:", error.message);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID || "",
      teamId: process.env.APPLE_TEAM_ID || "",
      keyId: process.env.APPLE_KEY_ID || "",
      privateKey: process.env.APPLE_PRIVATE_KEY || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "apple") {
        try {
          await connectDB();

          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            if (existingUser.provider !== account.provider) {
              existingUser.provider = account.provider;
              existingUser.providerId = account.providerAccountId;
              await existingUser.save();
            }
            return true;
          }

          const newUser = await User.create({
            name: user.name || profile?.name || "User",
            email: user.email,
            provider: account.provider,
            providerId: account.providerAccountId,
            role: "user",
          });

          console.log("✅ OAuth user created:", newUser.email);
          return true;
        } catch (error) {
          console.error("❌ OAuth signIn error:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };