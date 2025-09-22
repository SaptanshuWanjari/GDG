import { connectMongoDB } from "@/app/db/mongo";

type SampleBook = {
  title: string;
  author: string;
  category: string;
  coverUrl?: string;
  summary?: string;
  publishedYear?: number;
  isbn?: string;
};

export async function addSampleBooks(options?: { skipIfExists?: boolean }) {
  const { db } = await connectMongoDB();
  try {
    const sampleBooks: SampleBook[] = [
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
        category: "Programming",
        publishedYear: 1999,
        isbn: "978-0201616224",
        summary: "A pragmatic approach to software development.",
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Programming",
        publishedYear: 2008,
        isbn: "978-0132350884",
        summary: "A handbook of agile software craftsmanship.",
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        category: "Programming",
        publishedYear: 2018,
        isbn: "978-1593279509",
        summary: "A modern introduction to programming.",
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        publishedYear: 1937,
        isbn: "978-0547928227",
        summary: "A fantasy novel and prelude to The Lord of the Rings.",
      },
      {
        title: "1984",
        author: "George Orwell",
        category: "Dystopian",
        publishedYear: 1949,
        isbn: "978-0451524935",
        summary:
          "A dystopian social science fiction novel and cautionary tale.",
      },
    ];

    // Optionally skip insertion if sample books appear to already exist
    if (options?.skipIfExists) {
      const existing = await db
        .collection("books")
        .findOne({ isbn: sampleBooks[0].isbn });
      if (existing) {
        return { insertedCount: 0, message: "Sample books already present" };
      }
    }

    const now = new Date();
    const docs = sampleBooks.map((b) => ({
      title: b.title,
      author: b.author,
      category: b.category,
      coverUrl: b.coverUrl ?? "/book.jpg",
      summary: b.summary ?? "",
      publishedYear: b.publishedYear ?? null,
      isbn: b.isbn ?? null,
      borrowCount: 0,
      createdAt: now,
      updatedAt: now,
    }));

    const result = await db.collection("books").insertMany(docs);
    return {
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds,
    };
  } finally {
    // don't close shared client (connectMongoDB manages client lifetime)
  }
}

export default addSampleBooks;
