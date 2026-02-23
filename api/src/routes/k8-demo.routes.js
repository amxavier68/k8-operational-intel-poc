import { Router } from "express";
import k8KpiSnapshot from "../models/k8-kpi-snapshot.model.js";

const router = Router();

router.get("/kpi", async (req, res, next) => {
  try {
    const demoId = "demo-tradie-001";
    const snapshot = await k8KpiSnapshot.findOne({ business_id: demoId }).lean();

    if (!snapshot) {
      return res.status(404).json({ ok: false, error: "k8-demo-snapshot-not-found" });
    }

    // return a safe subset (no internal ids/timestamps if you prefer)
    return res.json({
      ok: true,
      data: {
        business_id: snapshot.business_id,
        range_days: snapshot.range_days,
        as_of: snapshot.as_of,
        kpis: snapshot.kpis
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
