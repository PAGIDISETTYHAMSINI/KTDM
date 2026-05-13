# Manam - Hyperlocal Miryalaguda Platform

Manam is a modern, full-stack hyperlocal platform designed to digitally empower the region of Miryalaguda, Telangana. It combines verified regional news with a "Mana Uru" (Our City) explorer module.

## 🌟 Key Features
- **Verified Hyperlocal News**: Categorized news feed with a focus on local events, politics, and emergencies.
- **Mana Uru Explorer**: Discover restaurants, hospitals, temples, and more in Miryalaguda.
- **Fake News Detection**: AI-powered verification system to identify suspicious content.
- **Multi-language Support**: English and Telugu support for better accessibility.
- **Community Driven**: Authorized contributors can submit news directly from the platform.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB
- **AI Service**: Python (FastAPI), NLP Heuristics
- **Authentication**: JWT with Role-Based Access Control

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or via Atlas)
- Python (v3.8+)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd manam
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with:
   # PORT=5000
   # MONGO_URI=mongodb://localhost:27017/manam
   # JWT_SECRET=your_secret_key
   npm run start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **AI Service Setup**
   ```bash
   cd ai-service
   python -m venv venv
   source venv/bin/activate # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   python main.py
   ```

## 👥 User Roles
- **Admin**: Content moderation, user management, and analytics.
- **Reporter**: Submit news and multimedia content.
- **Reader**: Browse news and explore the city.

## 📜 Future Roadmap
- Booking system for hospitals and hotels.
- Local business promotions.
- AI Chatbot for city-specific queries.
