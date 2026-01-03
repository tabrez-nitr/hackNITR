import pathway as pw
from schema import LogisticsSchema

# Live CSV ingestion
logistics_table = pw.io.csv.read(
    "./data/logistics_live.csv",
    schema=LogisticsSchema,
    mode="streaming"   # 🔥 this makes it LIVE
)

# Transform data (simple & readable)
logistics_text = logistics_table.select(
    text=pw.apply(
        lambda t, s, l, d:
        f"Shipment {s} is at {l}, status: {t}, delay: {d} minutes",
        logistics_table.status,
        logistics_table.shipment_id,
        logistics_table.location,
        logistics_table.delay_minutes
    )
)

# Store as live documents
pw.io.jsonlines.write(
    logistics_text,
    "./data/live_docs.jsonl"
)

pw.run()