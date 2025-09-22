import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/db/mongo";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectMongoDB();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user object
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      isAdmin: false,
      isOwner: false,
    };

    // Insert user into database
    const result = await db.collection("users").insertOne(newUser);

    if (!result.insertedId) {
      return NextResponse.json(
        { message: "Failed to create user" },
        { status: 500 }
      );
    }

    // Create response with user data (excluding password)
    const response = NextResponse.json({
      message: "User registered successfully",
      user: {
        id: result.insertedId,
        name: newUser.name,
        email: newUser.email,
        isAdmin: false,
        isOwner: false,
      },
    });

    // NOTE: Do not set auth-token cookie here. Authentication is handled by NextAuth.
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
