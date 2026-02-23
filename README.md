# k8-operational-intel-poc

Operational Intelligence proof-of-concept: Python ETL + MERN API + WordPress embed architecture
for multi-tenant tradie KPI dashboards.

## Architecture (POC)
Python ETL -> MongoDB -> Node/Express API -> (WordPress Shortcode / future Vite UI)

## Services
- api: Express API with /health endpoint
- python_etl: simple ETL runner (POC)

## Environment Variables (later)
- MONGO_URI
- JWT_SECRET
- CORS_ORIGIN
