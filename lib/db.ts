import mongoose from 'mongoose';

// Ensure DB_URL is defined in your .env.local file. If not, stop and alert.
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
  throw new Error('Please define the DB_URL environment variable inside .env.local');
}

/**
 * This 'cached' variable stores our database connection.
 * It's crucial for Next.js development to reuse the connection
 * across hot reloads, preventing errors and managing resources efficiently.
 */
let cached = global as typeof global & {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

// Initialize the cached object if it doesn't exist yet.
if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

/**
 * Function to connect to MongoDB.
 * It uses a cached connection if available, otherwise establishes a new one.
 */
async function connectDB() {
  // If a connection already exists, return it immediately.
  if (cached.mongoose.conn) {
    console.log("Using cached database connection.");
    return cached.mongoose.conn;
  }

  // If no connection promise is in progress, start a new connection.
  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false, // Recommended for serverless environments (like Vercel)
    };

    // Connect to MongoDB and store the connection promise.
    cached.mongoose.promise = mongoose.connect(DB_URL!, opts)
      .then((mongooseInstance) => {
        console.log("Successfully connected to database!");
        return mongooseInstance;
      })
      .catch((err: any) => {
        console.error("Unable to connect with database: " + err.message);
        throw err; // Re-throw the error so calling API routes can handle it.
      });
  }

  // Await the connection promise and store the resolved connection.
  cached.mongoose.conn = await cached.mongoose.promise;
  return cached.mongoose.conn;
}

// Export the connection function so your API routes can use it.
export default connectDB;