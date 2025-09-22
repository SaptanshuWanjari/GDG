// JWT payload interface
interface JWTPayload {
  userId?: string;
  email?: string;
  name?: string;
  isAdmin?: boolean;
  isOwner?: boolean;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

// Utility function to get cookies on the client side
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift() || null;
    return cookieValue;
  }

  return null;
}

// Helper function to decode JWT token
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
}

// Check if JWT token is expired
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Token expiration check error:", error);
    return true;
  }
}

// Check if user is authenticated by checking for valid, non-expired token
export function isAuthenticated(): boolean {
  const token = getCookie("auth-token");

  if (!token || token === "" || token === "undefined") {
    console.log("Auth check: No token found");
    return false;
  }

  // Check if token is expired
  if (isTokenExpired(token)) {
    console.warn("Auth check: Token is expired");
    return false;
  }

  console.log("Auth check: Token is valid");
  return true;
}

// Get user data from JWT token
export function getUserFromToken(): JWTPayload | null {
  const token = getCookie("auth-token");

  if (!token || !isAuthenticated()) {
    return null;
  }

  return decodeJWT(token);
}
