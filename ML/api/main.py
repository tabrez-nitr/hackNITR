from fastapi import FastAPI
import json
from llm.qa import answer

app = FastAPI()

@app.post("/query")
def query(question: str):

    # Read LIVE updated data (Pathway output)
    with open("./data/live_docs.jsonl") as f:
        docs = [json.loads(line)["text"] for line in f]

    response = answer(question, docs)

    return {
        "question": question,
        "answer": response
    }