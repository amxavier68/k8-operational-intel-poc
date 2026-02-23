import os
import certifi
from datetime import datetime, timedelta, timezone
from pymongo import MongoClient

def k8_main():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise SystemExit("k8-etl: MONGO_URI missing")

    client = MongoClient(
        mongo_uri,
        serverSelectionTimeoutMS=5000,
        tlsCAFile=certifi.where()
    )

    db = client.get_default_database()

    now = datetime.now(timezone.utc)
    start = now - timedelta(days=30)

    # --- POC dataset ---
    invoices = [
        {"date": now - timedelta(days=2), "amount": 3200, "cost": 1200},
        {"date": now - timedelta(days=5), "amount": 1800, "cost": 650},
        {"date": now - timedelta(days=11), "amount": 5400, "cost": 2600},
        {"date": now - timedelta(days=18), "amount": 2400, "cost": 900},
        {"date": now - timedelta(days=29), "amount": 900,  "cost": 300},
    ]

    ads = {"spend": 850, "leads": 34, "booked_jobs": 12}

    revenue = sum(i["amount"] for i in invoices if i["date"] >= start)
    costs = sum(i["cost"] for i in invoices if i["date"] >= start)
    gross_margin = revenue - costs
    gm_pct = (gross_margin / revenue * 100) if revenue else 0.0

    roas = (revenue / ads["spend"]) if ads["spend"] else 0.0
    cpl = (ads["spend"] / ads["leads"]) if ads["leads"] else 0.0

    business_id = "demo-tradie-001"

    doc = {
        "business_id": business_id,
        "range_days": 30,
        "as_of": now,
        "kpis": {
            "revenue": round(revenue, 2),
            "costs": round(costs, 2),
            "gross_margin": round(gross_margin, 2),
            "gross_margin_pct": round(gm_pct, 2),
            "ad_spend": round(ads["spend"], 2),
            "leads": ads["leads"],
            "booked_jobs": ads["booked_jobs"],
            "roas": round(roas, 2),
            "cpl": round(cpl, 2),
        }
    }

    col = db["k8_kpi_snapshots"]
    col.update_one(
        {"business_id": business_id},
        {"$set": doc},
        upsert=True
    )

    print("k8-etl: wrote snapshot for", business_id)
    client.close()

if __name__ == "__main__":
    k8_main()
