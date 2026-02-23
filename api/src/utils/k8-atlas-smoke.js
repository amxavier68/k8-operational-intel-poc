import "dotenv/config";
import mongoose from "mongoose";

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("k8-atlas-smoke: MONGO_URI missing");

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log("k8-atlas-smoke: connected");

  // List collections in the current DB to prove access
  const db = mongoose.connection.db;
  const cols = await db.listCollections().toArray();
  console.log("k8-atlas-smoke: collections:", cols.map(c => c.name));

  await mongoose.disconnect();
  console.log("k8-atlas-smoke: disconnected");
}

run().catch((e) => {
  console.error("k8-atlas-smoke: failed:", e.message);
  process.exit(1);
});
