#!/usr/bin/env node
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: ".env.local" });

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Please set MONGODB_URI in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("LibraryManagement");

    const sampleBooks = [
    //   {
    //     title: "The Pragmatic Programmer",
    //     author: "Andrew Hunt & David Thomas",
    //     category: "Programming",
    //     publishedYear: 1999,
    //     isbn: "978-0201616224",
    //     summary: "A pragmatic approach to software development.",
    //   },
    //   {
    //     title: "Clean Code",
    //     author: "Robert C. Martin",
    //     category: "Programming",
    //     publishedYear: 2008,
    //     isbn: "978-0132350884",
    //     summary: "A handbook of agile software craftsmanship.",
    //   },
    //   {
    //     title: "Eloquent JavaScript",
    //     author: "Marijn Haverbeke",
    //     category: "Programming",
    //     publishedYear: 2018,
    //     isbn: "978-1593279509",
    //     summary: "A modern introduction to programming.",
    //   },
    //   {
    //     title: "The Hobbit",
    //     author: "J.R.R. Tolkien",
    //     category: "Fantasy",
    //     publishedYear: 1937,
    //     isbn: "978-0547928227",
    //     summary: "A fantasy novel and prelude to The Lord of the Rings.",
    //   },
    //   {
    //     title: "1984",
    //     author: "George Orwell",
    //     category: "Dystopian",
    //     publishedYear: 1949,
    //     isbn: "978-0451524935",
    //     summary:
    //       "A dystopian social science fiction novel and cautionary tale.",
    //   },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Classic",
        publishedYear: 1960,
        isbn: "978-0446310789",
        summary:
          "A novel about the serious issues of rape and racial inequality.",
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Classic",
        publishedYear: 1925,
        isbn: "978-0743273565",
        summary: "A novel about the American dream and societal excess.",   
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        category: "Classic",
        publishedYear: 1951,
        isbn: "978-0316769488",
        summary:
          "A novel about teenage rebellion and angst in post-war America.",
      },
      {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        publishedYear: 1954,
        isbn: "978-0618640157",
        summary: "An epic high-fantasy novel set in Middle-earth.",
      }
    ];

    // Skip if first sample already exists
    const existing = await db
      .collection("books")
      .findOne({ isbn: sampleBooks[0].isbn });
    if (existing) {
      console.log("Sample books already present, skipping insertion.");
      return;
    }

    const now = new Date();
    const docs = sampleBooks.map((b) => ({
      title: b.title,
      author: b.author,
      category: b.category,
      coverUrl: b.coverUrl || "/book.jpg",
      summary: b.summary || "",
      publishedYear: b.publishedYear || null,
      isbn: b.isbn || null,
      borrowCount: 0,
      createdAt: now,
      updatedAt: now,
    }));

    const result = await db.collection("books").insertMany(docs);
    console.log("Inserted", result.insertedCount, "sample books.");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
