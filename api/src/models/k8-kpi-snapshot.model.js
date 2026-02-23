import mongoose from "mongoose";

const k8KpiSnapshotSchema = new mongoose.Schema(
  {
    business_id: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    range_days: {
      type: Number,
      default: 30
    },
    as_of: {
      type: Date,
      required: true
    },
    kpis: {
      revenue: Number,
      costs: Number,
      gross_margin: Number,
      gross_margin_pct: Number,
      ad_spend: Number,
      leads: Number,
      booked_jobs: Number,
      roas: Number,
      cpl: Number
    }
  },
  {
    collection: "k8_kpi_snapshots",
    timestamps: true
  }
);

export default mongoose.model("k8_kpi_snapshot", k8KpiSnapshotSchema);
