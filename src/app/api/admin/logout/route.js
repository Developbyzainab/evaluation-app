import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Delete cookies with same options as set
  response.cookies.delete("admin_token", { path: "/" });
  response.cookies.delete("admin_username", { path: "/" });

  console.log("Admin logout successful, cookies cleared");
  
  return response;
}