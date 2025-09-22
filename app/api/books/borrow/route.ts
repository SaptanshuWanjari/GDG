import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/db/mongo";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bookId,
      bookTitle,
      bookAuthor,
      userName,
      userEmail,
      borrowDate,
      dueDate,
    } = body;
    // Validate required fields (email may be omitted from client for authenticated users)
    if (
      !bookId ||
      !bookTitle ||
      !bookAuthor ||
      !userName ||
      !borrowDate ||
      !dueDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Determine userEmail: prefer body, otherwise attempt to get it from server session
    let finalUserEmail = userEmail;
    if (!finalUserEmail) {
      const session = (await getServerSession(authOptions)) as Session | null;
      if (!session || !session.user || !session.user.email) {
        return NextResponse.json(
          { error: "Authentication required to borrow a book" },
          { status: 401 }
        );
      }
      finalUserEmail = session.user.email as string;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalUserEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // connect to DB (gracefully handle connectivity issues)
    let db;
    try {
      const conn = await connectMongoDB();
      db = conn.db;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("DB connection error:", msg);
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 503 }
      );
    }

    // Check if the book exists (try ObjectId if appropriate)
    let book;
    try {
      // try as ObjectId first
      try {
        book = await db
          .collection("books")
          .findOne({ _id: new ObjectId(bookId) });
      } catch {
        // fallback to string id
        book = await db.collection("books").findOne({ _id: bookId });
      }
    } catch (err) {
      console.error("Error querying book:", err);
      return NextResponse.json(
        { error: "Error querying book" },
        { status: 500 }
      );
    }
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Create borrowed book record
    const borrowedBook = {
      bookId,
      bookTitle,
      bookAuthor,
      userName: userName.trim(),
      userEmail: finalUserEmail.toLowerCase().trim(),
      borrowDate: new Date(borrowDate),
      dueDate: new Date(dueDate),
      status: "borrowed",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the borrowed book record
    const result = await db
      .collection("borrowed_books")
      .insertOne(borrowedBook);

    // Update the book's borrow count
    try {
      // try ObjectId update first
      try {
        await db
          .collection("books")
          .updateOne(
            { _id: new ObjectId(bookId) },
            { $inc: { borrowCount: 1 }, $set: { updatedAt: new Date() } }
          );
      } catch {
        await db
          .collection("books")
          .updateOne(
            { _id: bookId },
            { $inc: { borrowCount: 1 }, $set: { updatedAt: new Date() } }
          );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Error updating book borrow count:", msg);
    }

    return NextResponse.json(
      {
        message: "Book borrowed successfully",
        borrowId: result.insertedId,
        dueDate: borrowedBook.dueDate,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error borrowing book:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch borrowed books (for admin dashboard)
export async function GET() {
  try {
    const { db } = await connectMongoDB();

    // Fetch all borrowed books with sorting by borrow date (newest first)
    const borrowedBooks = await db
      .collection("borrowed_books")
      .find({})
      .sort({ borrowDate: -1 })
      .toArray();

    // Update overdue status
    const now = new Date();
    const updates = [];

    for (const borrowedBook of borrowedBooks) {
      if (
        borrowedBook.status === "borrowed" &&
        new Date(borrowedBook.dueDate) < now
      ) {
        updates.push({
          updateOne: {
            filter: { _id: borrowedBook._id },
            update: { $set: { status: "overdue", updatedAt: now } },
          },
        });
        // Update the status in our result set too
        borrowedBook.status = "overdue";
      }
    }

    if (updates.length > 0) {
      await db.collection("borrowed_books").bulkWrite(updates);
    }

    return NextResponse.json({ borrowedBooks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
