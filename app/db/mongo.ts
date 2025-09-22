import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "your-mongodb-connection-string";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Helper function to get connected database
export async function connectMongoDB() {
  const client = await clientPromise;
  const db = client.db("LibraryManagement");
  return { client, db };
}

export default clientPromise;
