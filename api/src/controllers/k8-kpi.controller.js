import k8KpiSnapshot from "../models/k8-kpi-snapshot.model.js";

export async function k8GetKpiSnapshot(req, res, next) {
  try {
    const { businessId } = req.params;

    if (!businessId) {
      return res.status(400).json({
        ok: false,
        error: "k8-missing-business-id"
      });
    }

    const snapshot = await k8KpiSnapshot
      .findOne({ business_id: businessId })
      .lean();

    if (!snapshot) {
      return res.status(404).json({
        ok: false,
        error: "k8-snapshot-not-found"
      });
    }

    return res.json({
      ok: true,
      data: snapshot
    });

  } catch (err) {
    next(err);
  }
}
