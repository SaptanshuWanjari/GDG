import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/db/mongo";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Borrow ID is required" }, { status: 400 });
    }

    const { db } = await connectMongoDB();

    // Find the borrowed book record
    const borrowedBook = await db.collection("borrowed_books").findOne({
      _id: new ObjectId(id)
    });

    if (!borrowedBook) {
      return NextResponse.json({ error: "Borrowed book record not found" }, { status: 404 });
    }

    if (borrowedBook.status === "returned") {
      return NextResponse.json({ error: "Book is already returned" }, { status: 400 });
    }

    // Update the borrowed book record to mark as returned
    const result = await db.collection("borrowed_books").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "returned",
          returnDate: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update borrowed book record" }, { status: 500 });
    }

    return NextResponse.json({
      message: "Book marked as returned successfully",
      returnDate: new Date(),
    }, { status: 200 });

  } catch (error) {
    console.error("Error returning book:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}