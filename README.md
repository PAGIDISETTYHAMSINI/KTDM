# 🌿 KTDM Manam: Hyperlocal Digital Ecosystem

![Manam Banner](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen?style=for-the-badge&logo=render)](https://ktdmmanam-frontend.onrender.com)


**KTDM Manam** is a world-class, AI-powered hyperlocal tourism and city exploration ecosystem explicitly built for Kothagudem and the Bhadradri Kothagudem district (Telangana, India). It bridges the gap between verified local journalism, community-driven updates, and smart city exploration.

---

## 🌟 Key Features

### 🏙️ Smart City Exploration (Mana Uru)
- **Categorized Discovery:** Explore Restaurants, Hospitals, Hotels, Temples, Shopping, and Tourism hubs.
- **Interactive Maps:** Real-time location integration using Leaflet.
- **Dynamic Content:** Weather updates, emergency contacts, and featured heritage articles.

### 📰 Hyperlocal News Module
- **"News Near You":** Area-wise filtering (e.g., Paloncha, SCCL Colony, Vidyanagar).
- **Categorized Feeds:** Filter by Politics, Development, Education, Emergency, and more.
- **Trending Alerts:** Real-time flash alerts and trending stories.

### 👥 Role-Based Access Control (RBAC)
- **Admin Dashboard:** High-fidelity moderation interface with data analytics to approve/reject pending news submissions.
- **Reporter Studio:** Authorized contributor portal for submitting verified news with multimedia, urgency tagging, and location metadata.

### ⚡ Technical Highlights
- **Graceful Fallbacks:** The frontend intelligently falls back to rich mock data if the backend API is unavailable.
- **Premium UI/UX:** Built with Glassmorphism aesthetics, Framer Motion micro-animations, Tailwind CSS styling, and the Bootstrap 5 Grid for flawless mobile responsiveness.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS + Bootstrap 5 Grid System
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Networking:** Axios
- **Maps:** React Leaflet

### Backend
- **Framework:** Java Spring Boot
- **Database:** PostgreSQL (Neon DB)
- **Architecture:** RESTful APIs with MVC pattern
- **Deployment Build:** Docker / Maven

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17
- Maven
- PostgreSQL (or Neon DB account)

### 1. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 2. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Ensure you have your database URL set (e.g., in application.properties)
# spring.datasource.url=${DATABASE_URL}
# spring.datasource.username=${DB_USER}
# spring.datasource.password=${DB_PASS}

# Build the application
mvn clean install -DskipTests

# Run the Spring Boot app
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

---

## ☁️ Deployment Guides

### Frontend (Render - Static Site)
1. Connect your GitHub repository to Render.
2. Select **Static Site**.
3. **Build Command:** `npm run build`
4. **Publish Directory:** `dist`

### Backend (Render - Web Service)
1. Connect your GitHub repository to Render.
2. Select **Web Service**.
3. **Root Directory:** `backend`
4. **Environment:** `Docker` (Render will automatically detect the provided `Dockerfile`).
5. **Environment Variables:** Add your `DATABASE_URL` (JDBC formatted) and `JWT_SECRET`.

---

## 🤝 Contributing
We welcome contributions to expand the hyperlocal ecosystem! 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
This project is proprietary and built for the Bhadradri Kothagudem digital ecosystem.

*Built with ❤️ for Kothagudem.*
