import dotenv from "dotenv";
dotenv.config();

console.log("k8-env:", Boolean(process.env.MONGO_URI), process.env.MONGO_URI?.slice(0, 25));

import express from "express";
import cors from "cors";

import { k8ConnectDB } from "./config/k8-db.js";
import { k8ErrorHandler } from "./middleware/k8-errorHandler.js";
import k8HealthRoutes from "./routes/k8-health.routes.js";
import k8KpiRoutes from "./routes/k8-kpi.routes.js";
import k8DemoRoutes from "./routes/k8-demo.routes.js";

const app = express();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

// --- Middleware ---
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*"
  })
);

// --- Routes ---
app.use("/k8-health", k8HealthRoutes);
app.use("/k8-kpi", k8KpiRoutes);
app.use("/k8-demo", k8DemoRoutes);

// --- Error Handler ---
app.use(k8ErrorHandler);

// --- Start Server ---
async function k8Start() {
  try {
    if (MONGO_URI) {
      await k8ConnectDB(MONGO_URI);
    } else {
      console.warn("k8-warning: MONGO_URI not set — running without DB");
    }

    app.listen(PORT, () => {
      console.log(`k8-api running on port ${PORT}`);
    });
  } catch (err) {
    console.error("k8-startup-error:", err);
    process.exit(1);
  }
}

k8Start();
