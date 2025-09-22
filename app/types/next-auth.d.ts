import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      isAdmin: boolean;
      isOwner: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    isAdmin: boolean;
    isOwner: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
    isOwner: boolean;
  }
}
