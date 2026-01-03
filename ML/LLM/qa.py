import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def answer(question, docs):
    """
    question: user query
    docs: live logistics text from CSV
    """

    context = "\n".join(docs)

    prompt = f"""
You are a logistics assistant.
Answer ONLY using the live logistics data provided.

Live logistics data:
{context}

Question:
{question}

Give a clear and short answer.
"""

    response = client.chat.completions.create(
        model="gpt-4o",  # fast + cheap + perfect for hackathon
        messages=[
            {"role": "system", "content": "You answer using real-time logistics data only."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content