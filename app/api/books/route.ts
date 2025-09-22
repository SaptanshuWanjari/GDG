import clientPromise from "@/app/db/mongo";
import { Book } from "@/app/types/book";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// GET - Fetch all books
export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "LibraryManagement";
    const db = client.db(dbName);
    const books = db.collection<Book>("books");

    const allBooks = await books.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(
      { success: true, books: allBooks },
      { status: 200 }
    );
  } catch (err) {
    console.error("Get books error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST - Add a new book (Admin only)
export async function POST(request: Request) {
  try {
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

    interface JWTPayload {
      userId: string;
      email: string;
      name: string;
      isAdmin: boolean;
      isOwner: boolean;
      iat?: number;
      exp?: number;
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;

    // Check if user is admin or owner
    if (!decoded.isAdmin && !decoded.isOwner) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
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
    const books = db.collection<Book>("books");

    const newBook: Book = {
      title,
      author,
      category,
      summary: summary || "",
      publishedYear: publishedYear ? parseInt(publishedYear) : undefined,
      isbn: isbn || "",
      borrowCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await books.insertOne(newBook);

    return NextResponse.json(
      { success: true, bookId: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add book error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
