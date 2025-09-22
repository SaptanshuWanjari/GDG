import clientPromise from "@/app/db/mongo";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isOwner: boolean;
  iat?: number;
  exp?: number;
}

// PUT - Update a book (Admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log("=== BOOK EDIT API CALLED ===");
    const { id } = await params;
    console.log("Book ID to edit:", id);

    // Check authentication and admin role
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    console.log("Token found:", !!token);
    if (!token) {
      console.log("No auth token found in cookies");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT_SECRET not configured");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;
    console.log("JWT payload decoded:", {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name,
      isAdmin: decoded.isAdmin,
      isOwner: decoded.isOwner,
    });

    // Check if user is admin or owner
    if (!decoded.isAdmin && !decoded.isOwner) {
      console.log("Access denied - not admin or owner");
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const { title, author, category, summary, publishedYear, isbn } =
      await request.json();

    if (!title || !author || !category) {
      return NextResponse.json(
        { error: "Title, author, and category are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "LibraryManagement";
    const db = client.db(dbName);
    const books = db.collection("books");

    const updateData = {
      title,
      author,
      category,
      summary: summary || "",
      publishedYear: publishedYear ? parseInt(publishedYear) : undefined,
      isbn: isbn || "",
      updatedAt: new Date(),
    };

    const result = await books.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Book updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update book error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE - Delete a book (Admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check authentication and admin role
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;

    // Check if user is admin or owner
    if (!decoded.isAdmin && !decoded.isOwner) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "LibraryManagement";
    const db = client.db(dbName);
    const books = db.collection("books");

    const result = await books.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete book error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
