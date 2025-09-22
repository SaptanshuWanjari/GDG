import { NextResponse } from "next/server";

// This API route is deprecated - use NextAuth signOut instead
export async function POST() {
  return NextResponse.json(
    {
      message:
        "This logout endpoint is deprecated. Please use NextAuth signOut.",
    },
    { status: 410 } // Gone
  );
}
