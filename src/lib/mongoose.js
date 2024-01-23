import mongoose from "mongoose";
import "dotenv/config";

export function mongooseConnect() {
  const uri = process.env.MONGODB_URI;
  if (mongoose?.connection?.readyState === 1) {
    return mongoose?.connection?.asPromise();
  } else {
    try {
      if (!uri) {
        throw new Error("MONGODB_URI is not defined");
      }
      console.log("Connecting to MongoDB...")
      return mongoose?.connect(uri);
    } catch (error) {
      console.log(error);
    }
  }
}
