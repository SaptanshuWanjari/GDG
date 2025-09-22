import { NextResponse } from "next/server";

// This API route is deprecated - use NextAuth instead
export async function POST() {
  return NextResponse.json(
    {
      message:
        "This login endpoint is deprecated. Please use NextAuth authentication.",
    },
    { status: 410 } // Gone
  );
}
