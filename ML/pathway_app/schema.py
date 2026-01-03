import pathway as pw

class LogisticsSchema(pw.Schema):
    timestamp: str
    shipment_id: str
    location: str
    status: str
    delay_minutes: int