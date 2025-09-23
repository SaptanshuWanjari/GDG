import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/db/mongo";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "LibraryManagement";
    const db = client.db(dbName);

    // Check if admin already exists
    const existingAdmin = await db.collection("admins").findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const result = await db.collection("admins").insertOne({
      name,
      email,
      password: hashedPassword,
      isOwner: false,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Admin created successfully",
        adminId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
