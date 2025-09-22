import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isOwner: boolean;
  iat?: number;
  exp?: number;
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== OWNER PROMOTE API CALLED ===");

    // Verify owner authentication
    const token = request.cookies.get("auth-token")?.value;
    console.log("Token found:", !!token);

    if (!token) {
      console.log("No auth token found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    console.log("JWT payload decoded:", {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name,
      isAdmin: decoded.isAdmin,
      isOwner: decoded.isOwner,
    });

    if (!decoded.isOwner) {
      console.log("Access denied - not owner");
      return NextResponse.json(
        { error: "Owner access required" },
        { status: 403 }
      );
    }

    const { userId, role } = await request.json();
    console.log("Promote request:", { userId, role });

    if (!userId || !role) {
      return NextResponse.json(
        { error: "User ID and role are required" },
        { status: 400 }
      );
    }

    if (!["user", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("LibraryManagement");

    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(userId) }, { $set: { role: role } });

    console.log("Role update result:", result);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}`,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
