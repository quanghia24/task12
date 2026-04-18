import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client: MongoClient | null = null;
let db: Db | null = null;

const DB_NAME = process.env.MONGODB_NAME || "";

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(DB_NAME);

  console.log(`Connected to MongoDB database: "${DB_NAME}"`);
  return db;
}

export async function closeDatabaseConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("MongoDB connection closed.");
  }
}
