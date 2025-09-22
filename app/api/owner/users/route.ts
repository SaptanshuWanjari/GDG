import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getServerAuth } from "@/lib/auth";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET(request: NextRequest) {
  try {
    // Verify owner authentication via NextAuth
    const auth = await getServerAuth();
    if (!auth.isAuthenticated || !auth.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!auth.user.isOwner && !auth.user.isAdmin) {
      return NextResponse.json(
        { error: "Owner access required" },
        { status: 403 }
      );
    }

    await client.connect();
    const db = client.db("LibraryManagement");

    // Fetch all users from all collections
    const [users, admins, owners] = await Promise.all([
      db.collection("users").find({}).toArray(),
      db.collection("admins").find({}).toArray(),
      db.collection("owners").find({}).toArray(),
    ]);

    // Combine all users with their roles
    const allUsers = [
      ...users.map((user) => ({ ...user, role: "user" })),
      ...admins.map((admin) => ({ ...admin, role: "admin" })),
      ...owners.map((owner) => ({ ...owner, role: "owner" })),
    ];

    return NextResponse.json({ success: true, users: allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify owner authentication via NextAuth
    const auth = await getServerAuth();
    if (!auth.isAuthenticated || !auth.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!auth.user.isOwner) {
      return NextResponse.json(
        { error: "Owner access required" },
        { status: 403 }
      );
    }

    const { userId, role } = await request.json();

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

    // Find the user in all collections
    let currentUser = null;
    let currentCollection = null;

    const [user, admin, owner] = await Promise.all([
      db.collection("users").findOne({ _id: new ObjectId(userId) }),
      db.collection("admins").findOne({ _id: new ObjectId(userId) }),
      db.collection("owners").findOne({ _id: new ObjectId(userId) }),
    ]);

    if (user) {
      currentUser = user;
      currentCollection = "users";
    } else if (admin) {
      currentUser = admin;
      currentCollection = "admins";
    } else if (owner) {
      return NextResponse.json(
        { error: "Cannot modify owner roles" },
        { status: 403 }
      );
    }

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If promoting to admin or demoting to user, move between collections
    if (currentCollection === "users" && role === "admin") {
      // Move from users to admins collection
      const adminData = {
        email: currentUser.email,
        password: currentUser.password,
        name: currentUser.name,
        role: "admin" as const,
        createdAt: currentUser.createdAt,
        promotedBy: auth.user.id,
        updatedAt: new Date(),
      };

      await db.collection("admins").insertOne(adminData);
      await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    } else if (currentCollection === "admins" && role === "user") {
      // Move from admins to users collection
      const userData = {
        email: currentUser.email,
        password: currentUser.password,
        name: currentUser.name,
        role: "user" as const,
        createdAt: currentUser.createdAt,
        updatedAt: new Date(),
      };

      await db.collection("users").insertOne(userData);
      await db.collection("admins").deleteOne({ _id: new ObjectId(userId) });
    } else {
      return NextResponse.json(
        { error: "Invalid role change" },
        { status: 400 }
      );
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
