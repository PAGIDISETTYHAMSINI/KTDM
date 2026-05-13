from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import os

app = FastAPI()

class NewsItem(BaseModel):
    text: str

# Simple Mock NLP Logic for Demonstration
# In a real scenario, we would load a trained model:
# model = pickle.load(open('fake_news_model.pkl', 'rb'))
# vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

@app.post("/verify")
async def verify_news(item: NewsItem):
    # This is a placeholder for real NLP logic
    # We could use simple keywords or a real ML model if available
    text = item.text.lower()
    
    # Simple heuristic for demo
    fake_keywords = ['fake', 'scam', 'unverified', 'rumor']
    is_suspicious = any(keyword in text for keyword in fake_keywords)
    
    confidence = 0.95 if not is_suspicious else 0.45
    
    return {
        "is_fake": is_suspicious,
        "confidence": confidence,
        "recommendation": "High" if confidence > 0.8 else "Needs Manual Verification"
    }

@app.get("/health")
def health_check():
    return {"status": "AI Service is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
