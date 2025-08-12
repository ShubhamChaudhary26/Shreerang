import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  throw new Error("Please define the DB_URL in .env.local");
}

let cached = global as typeof global & {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.mongoose.conn) return cached.mongoose.conn;

  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose
      .connect(DB_URL, { bufferCommands: false })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.mongoose.conn = await cached.mongoose.promise;
  return cached.mongoose.conn;
}
