import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "k8-operational-intel-poc",
    timestamp: new Date().toISOString()
  });
});

export default router;
