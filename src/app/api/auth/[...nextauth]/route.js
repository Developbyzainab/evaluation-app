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
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        try {
          console.log("🔐 Authorize called, email:", credentials?.email, "hasName:", !!credentials?.name);
          
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Missing email or password");
            throw new Error("Email and password are required");
          }

          await connectDB();

          const { email, password, name } = credentials;
          const normalizedEmail = email.toLowerCase().trim();
          const existingUser = await User.findOne({ email: normalizedEmail });

          // REGISTER FLOW: name provided, trying to create new account
          if (!existingUser && name) {
            console.log("📝 Register attempt for:", normalizedEmail);
            try {
              const hashedPassword = await bcrypt.hash(password, 12);
              const newUser = await User.create({
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                role: "user",
                provider: "credentials",
              });
              
              console.log("✅ User created:", newUser.email);
              return {
                id: newUser._id.toString(),
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
              };
            } catch (createError) {
              console.error("❌ User creation failed:", createError);
              if (createError.code === 11000) {
                throw new Error("An account with this email already exists. Please sign in instead.");
              }
              throw new Error("Failed to create account. Please try again.");
            }
          }

          // LOGIN FLOW: user exists
          if (existingUser) {
            // If name is also provided, user is trying to register with existing email
            if (name) {
              console.log("❌ Registration attempted with existing email:", normalizedEmail);
              throw new Error("An account with this email already exists. Please sign in instead.");
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
          }

          // User doesn't exist and no name provided (login attempt for non-existent user)
          console.log("❌ User not found:", normalizedEmail);
          throw new Error("Account not found. Please Sign Up.");
        } catch (error) {
          console.error("❌ Auth error:", error.message);
          // Re-throw to let NextAuth handle the error and redirect to error page
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
          
          // Check if user already exists by email
          const existingUser = await User.findOne({ email: user.email });
          
          if (existingUser) {
            // User exists - link the OAuth account if not already linked
            if (existingUser.provider !== account.provider) {
              existingUser.provider = account.provider;
              existingUser.providerId = account.providerAccountId;
              await existingUser.save();
            }
            return true;
          }
          
          // User doesn't exist - create new user with OAuth info
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
      
      return true; // Allow credentials sign in
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