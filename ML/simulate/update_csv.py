import time
import csv
from datetime import datetime

rows = [
    ("SHP002", "Mumbai", "Delayed", 20),
    ("SHP001", "Jaipur", "In Transit", 0),
    ("SHP003", "Kolkata", "Delivered", 0)
]

index = 0

while True:
    shipment, loc, status, delay = rows[index]

    with open("./data/logistics_live.csv", "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.now().strftime("%H:%M"),
            shipment,
            loc,
            status,
            delay
        ])

    index = (index + 1) % len(rows)  # 🔁 loop forever
    time.sleep(10)