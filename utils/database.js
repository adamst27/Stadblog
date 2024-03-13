import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MANGODB_URI, {
      dbName: "share_idea",
      serverSelectionTimeoutMS: 30000, // Set the timeout to 30 seconds (adjust as needed)
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
