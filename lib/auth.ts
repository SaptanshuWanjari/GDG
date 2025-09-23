import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getServerAuth() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { isAuthenticated: false, user: null };
    }

    return {
      isAuthenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        isAdmin: session.user.isAdmin,
        isOwner: session.user.isOwner,
      },
    };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}
