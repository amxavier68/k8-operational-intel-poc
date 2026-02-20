import mongoose from "mongoose";

export async function k8ConnectDB(uri) {
  if (!uri) {
    throw new Error("k8-db: MONGO_URI is not defined");
  }

  await mongoose.connect(uri);
  console.log("k8-db: MongoDB connected");
}
