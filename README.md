# 🚀 Perplexity Clone - AI-Powered Search & Chat Application

![Live Demo](https://img.shields.io/badge/demo-online-green.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Node](https://img.shields.io/badge/Node.js-Express-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen.svg)
![AI Models](https://img.shields.io/badge/AI-Gemini%20%7C%20Mistral-blueviolet.svg)

An intelligent, AI-driven search and conversational platform built to mimic the core functionalities of Perplexity AI. The application leverages large language models (LLMs) to synthesize information from the web, providing accurate, real-time answers along with conversational abilities.

**🔗 Live Demo:** [https://perplexity-lake.vercel.app/](https://perplexity-lake.vercel.app/)

---

## 🌟 Key Features

- **🤖 Advanced AI Chat:** Powered by Gemini and Mistral AI models to generate highly contextual, accurate, and human-like responses.
- **🔍 Web Search Integration:** Uses Tavily API to fetch real-time data from the web, grounding AI responses in up-to-date information.
- **💬 Real-Time Communication:** Instant messaging and typing indicators using `Socket.io` for a seamless conversational experience.
- **🔐 Secure Authentication:** Robust user authentication built with JWT (JSON Web Tokens) and bcrypt for password hashing.
- **🗂 Chat History Management:** Save and retrieve previous chat sessions, structured elegantly in a MongoDB database.
- **⚡ Fast & Responsive UI:** Modern and sleek user interface built with React 19, Tailwind CSS v4, and optimized by Vite.
- **🧠 State Management:** Predictable state management using Redux Toolkit.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (v19) + Vite
- **Styling:** Tailwind CSS (v4)
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Real-time:** Socket.io-client
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JWT, bcryptjs
- **AI & LLM Orchestration:** Langchain, Google GenAI (@langchain/google-genai), Mistral AI (@langchain/mistralai)
- **Search API:** Tavily Core
- **Real-time:** Socket.io
- **Emails:** Nodemailer & Resend

---

## 🏗️ System Architecture

The application follows a client-server architecture. The frontend (React) communicates with the backend (Express) via RESTful APIs for authentication and data persistence, and via WebSockets for real-time chat interactions. The backend acts as an orchestrator, connecting to MongoDB for storage and calling external APIs (Gemini, Mistral, Tavily) through Langchain to process user queries.

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Perplexity
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and add the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here

# AI & Search Keys
GEMINI_API_KEY=your_gemini_api_key_here
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key_here

# (Optional) Email Services
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here
GOOGLE_USER=your_google_user_email_here
```

Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

---

## 📂 Project Structure

```text
Perplexity/
├── Backend/                 # Express.js Server
│   ├── src/
│   │   ├── config/          # Database and environment configurations
│   │   ├── controllers/     # Request handlers (Auth, Chat)
│   │   ├── middleware/      # Custom middlewares (Auth, Error handling)
│   │   ├── models/          # Mongoose schemas (User, Chat, Message)
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic and AI service integrations
│   │   ├── sockets/         # Socket.io event handlers
│   │   └── validators/      # Input validation logic (Zod/Express-validator)
│   ├── app.js               # Express app configuration
│   └── server.js            # Entry point for the backend
│
└── Frontend/                # React Application (Vite)
    ├── src/
    │   ├── app/             # Main App component, Store, Routes, and Global CSS
    │   ├── assets/          # Static assets (images, icons)
    │   └── features/        # Feature-based modules (Auth, Chat)
    ├── index.html           # HTML template
    └── vite.config.js       # Vite configuration
```

---

## 🔌 API Endpoints (Overview)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and issue JWT
- `POST /api/auth/logout` - Logout user

### Chat (Protected)
- `GET /api/chats` - Retrieve all user chat sessions
- `POST /api/chats` - Create a new chat session
- `GET /api/chats/:id/messages` - Get messages for a specific chat
- *(WebSocket events handle real-time message sending and AI streaming)*

---

## 💡 Future Enhancements
- Incorporate more specialized LLMs for different topics.
- Implement robust vector databases (e.g., Pinecone or Weaviate) for RAG (Retrieval-Augmented Generation).
- Enhance UI accessibility and add dark mode support.
- File attachment support for multimodal AI queries.

---

## 📜 License
This project is licensed under the ISC License.
