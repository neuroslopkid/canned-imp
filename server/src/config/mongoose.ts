import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? "");
    console.log(`Successfully connected to DB: ${process.env.MONGO_DB_NAME}`);
  } catch (error) {
    console.error("Failed to connect to DB: ", error);
  }
}
