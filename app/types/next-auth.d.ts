import "next-auth";

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
