import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/app/db/mongo";

export async function POST(req: Request) {
  console.log("=== LOGIN API CALLED ===");
  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { message: "Invalid request format" },
        { status: 400 }
      );
    }

    const { email, password } = requestBody;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const { db } = await connectMongoDB();
    let user = null;
    let isAdmin = false;
    let isOwner = false;

    console.log("Login attempt for email:", email);

    // Check for special admin/owner accounts and create them if they don't exist
    if (email === "admin@admin.com" || email === "owner@library.com") {
      console.log("Checking for admin/owner account:", email);

      let admin = await db.collection("admins").findOne({ email });

      if (!admin) {
        console.log("Admin/Owner account not found, creating:", email);
        const hashedPassword = await bcrypt.hash(
          email === "admin@admin.com" ? "admin123" : "owner123",
          10
        );

        const newAdmin = {
          email,
          name: email === "admin@admin.com" ? "Admin User" : "Owner User",
          password: hashedPassword,
          isOwner: email === "owner@library.com",
          createdAt: new Date(),
        };

        const result = await db.collection("admins").insertOne(newAdmin);
        admin = { ...newAdmin, _id: result.insertedId };
        console.log("Created admin/owner account:", email);
      } else {
        // Check if existing admin password is correct - if not, update it
        const passwordMatch = await bcrypt.compare(
          email === "admin@admin.com" ? "admin123" : "owner123",
          admin.password
        );
        if (!passwordMatch) {
          console.log(
            "Existing admin account has wrong password, updating:",
            email
          );
          const hashedPassword = await bcrypt.hash(
            email === "admin@admin.com" ? "admin123" : "owner123",
            10
          );
          await db.collection("admins").updateOne(
            { _id: admin._id },
            {
              $set: {
                password: hashedPassword,
                updatedAt: new Date(),
              },
            }
          );
          admin.password = hashedPassword;
          console.log("Updated admin/owner password:", email);
        }
      }

      if (admin) {
        user = admin;
        isAdmin = true;
        isOwner = admin.isOwner || false;
        console.log("Using admin account - isOwner:", isOwner);
      }
    }

    // If not a special admin account, search normally
    if (!user) {
      // First check admins collection
      const admin = await db.collection("admins").findOne({ email });
      console.log(
        "Admin search result:",
        admin ? "Found admin user" : "No admin found"
      );

      if (admin) {
        user = admin;
        isAdmin = true;
        isOwner = admin.isOwner || false;
        console.log("Admin user found - isOwner:", isOwner);
      }
    }

    // If not found in admins, check regular users
    if (!user) {
      const regularUser = await db.collection("users").findOne({ email });
      console.log(
        "User search result:",
        regularUser ? "Found regular user" : "No user found"
      );

      if (regularUser) {
        user = regularUser;
        isAdmin = false;
        isOwner = false;
      }
    }

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password validation:", {
      providedPassword: password,
      hasStoredPassword: !!user.password,
      passwordMatch,
    });

    if (!passwordMatch) {
      console.log("Password validation failed for:", email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        isAdmin,
        isOwner,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    console.log("JWT payload created:", {
      userId: user._id,
      email: user.email,
      name: user.name,
      isAdmin,
      isOwner,
    });

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin,
        isOwner,
      },
      token, // Include token in response for debugging
    });

    response.cookies.set("auth-token", token, {
      httpOnly: false, // Allow client-side access for authentication checking
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    console.log(
      "Login successful for:",
      email,
      "- isAdmin:",
      isAdmin,
      "- isOwner:",
      isOwner
    );
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
