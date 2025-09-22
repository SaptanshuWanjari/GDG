import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("LibraryManagement");

    const [users, admins, owners, books] = await Promise.all([
      db.collection("users").find({}).toArray(),
      db.collection("admins").find({}).toArray(),
      db.collection("owners").find({}).toArray(),
      db.collection("books").find({}).toArray(),
    ]);

    const stats = {
      totalUsers: users.length + admins.length + owners.length, // Total across all collections
      totalAdmins: admins.length,
      totalBooks: books.length,
      totalBorrows: 0, // Placeholder for future borrow tracking
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
