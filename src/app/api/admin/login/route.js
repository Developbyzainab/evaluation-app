import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error("Admin credentials not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (username === adminUsername && password === adminPassword) {
      const token = Buffer.from(
        JSON.stringify({
          username: adminUsername,
          timestamp: Date.now(),
          expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        })
      ).toString("base64");

      const response = NextResponse.json({ success: true });

      // Secure token (HttpOnly) for server-side validation
      // Works on localhost and production
      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions = {
        httpOnly: true,
        secure: isProduction, // true in production, false on localhost
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      };

      response.cookies.set("admin_token", token, cookieOptions);

      // Non-HttpOnly cookie for client-side profile display
      response.cookies.set("admin_username", adminUsername, {
        ...cookieOptions,
        httpOnly: false,
      });

      console.log("Admin login successful, cookies set:", {
        admin_token: "set",
        admin_username: "set",
        maxAge: cookieOptions.maxAge,
        secure: cookieOptions.secure,
        sameSite: cookieOptions.sameSite,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}