import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface JWTPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function getServerAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { isAuthenticated: false, user: null };
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return { isAuthenticated: false, user: null };
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;
    return {
      isAuthenticated: true,
      user: {
        id: decoded.sub,
        email: decoded.email,
      },
    };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

// Client-side auth check (fallback to localStorage for now)
export function getClientAuth() {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: null };
  }

  const token = localStorage.getItem("token");
  return { isAuthenticated: !!token, user: token ? { token } : null };
}
