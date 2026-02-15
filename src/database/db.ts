import { DB_URI } from "../config/env";
import mongoose from "mongoose";

if (!DB_URI) {
  throw new Error("Please define Mongodb Uri");
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI!);

    console.log("connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);

    process.exit(1);
  }
};
