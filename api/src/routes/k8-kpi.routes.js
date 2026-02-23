import { Router } from "express";
import { k8GetKpiSnapshot } from "../controllers/k8-kpi.controller.js";
import { k8RequireJwt } from "../middleware/k8-require-jwt.js";

const router = Router();

router.get("/:businessId", k8RequireJwt, k8GetKpiSnapshot);

export default router;
