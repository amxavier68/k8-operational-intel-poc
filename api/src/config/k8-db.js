import mongoose from "mongoose";

export async function k8ConnectDB(uri) {
  if (!uri) throw new Error("k8-db: MONGO_URI missing");

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });

  console.log("k8-db: MongoDB connected");
}
