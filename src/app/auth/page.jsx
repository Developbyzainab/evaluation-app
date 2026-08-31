import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthClient from "./AuthClient";

export const dynamic = 'force-dynamic';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);
  
  return <AuthClient user={session?.user} />;
}