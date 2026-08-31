import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "SkillEval - Professional Skills Assessment",
  description: "Professional skills assessment and certification platform",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#05050a] text-white">
        <SessionProviderWrapper>
          <AuthProvider initialUser={session?.user}>
            {children}
          </AuthProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}