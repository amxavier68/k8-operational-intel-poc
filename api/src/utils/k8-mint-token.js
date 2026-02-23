import "dotenv/config";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error("k8-mint-token: JWT_SECRET missing");
  process.exit(1);
}

// minimal claims for POC
const token = jwt.sign(
  { sub: "k8-wp", scope: ["k8:kpi:read"] },
  secret,
  { expiresIn: "30d" }
);

console.log(token);
