import mongoose from "mongoose";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
