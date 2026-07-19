# 🚀 Perplexity Clone - AI-Powered Search & Chat Application

![Live Demo](https://img.shields.io/badge/demo-online-green.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Node](https://img.shields.io/badge/Node.js-Express-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen.svg)
![AI Models](https://img.shields.io/badge/AI-Gemini%20%7C%20Mistral-blueviolet.svg)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector%20DB-purple.svg)
![RAG](https://img.shields.io/badge/RAG-PDF%20Support-orange.svg)
![Redis](https://img.shields.io/badge/Redis-Token%20Blacklist-red.svg)
![Google](https://img.shields.io/badge/Google-Sign%20In-4285F4.svg)

An intelligent, AI-driven search and conversational platform built to mimic the core functionalities of Perplexity AI. The application leverages large language models (LLMs) to synthesize information from the web, providing accurate, real-time answers along with conversational abilities.

**🔗 Live Demo:** [https://perplexity-lake.vercel.app/](https://perplexity-lake.vercel.app/)

---

## 🌟 Key Features

- **🤖 Advanced AI Chat:** Powered by Gemini and Mistral AI models to generate highly contextual, accurate, and human-like responses.
- **🔍 Web Search Integration:** Uses Tavily API to fetch real-time data from the web, grounding AI responses in up-to-date information.
- **📄 PDF RAG (Retrieval-Augmented Generation):** Upload a PDF in the chat, and the AI will read, understand, and answer your questions based on the document's content. PDFs are stored on ImageKit, chunked, embedded via Mistral, and indexed in Pinecone for lightning-fast semantic search.
- **💬 Real-Time Communication:** Instant messaging and typing indicators using `Socket.io` for a seamless conversational experience.
- **🔐 Secure Authentication:** Robust user authentication built with JWT (JSON Web Tokens) and bcrypt for password hashing.
- **🔑 Sign in with Google:** One-click Google OAuth login using Google Identity Services. New users are auto-registered; returning users are logged into their existing account seamlessly.
- **🛡️ Token Blacklisting:** Secure logout with Redis-based JWT token blacklisting. Revoked tokens are immediately invalidated, preventing unauthorized reuse.
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
- **Vector Database:** Pinecone (for PDF RAG embeddings)
- **File Storage:** ImageKit (for PDF uploads)
- **Authentication:** JWT, bcryptjs, Google Auth Library (Google Sign-In)
- **Token Blacklisting:** Redis (ioredis) — revokes JWTs on logout
- **AI & LLM Orchestration:** Langchain, Google GenAI (@langchain/google-genai), Mistral AI (@langchain/mistralai)
- **PDF Processing:** pdf-parse, @langchain/textsplitters, Mistral Embeddings
- **Search API:** Tavily Core
- **File Upload:** Multer (multipart form handling)
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

# PDF RAG - Pinecone (Vector Database)
PINECONE_API_KEY=your_pinecone_api_key_here

# PDF RAG - ImageKit (File Storage)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint_here

# Google OAuth (Sign in with Google + Email Services)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here
GOOGLE_USER=your_google_user_email_here

# Token Blacklisting - Redis
REDIS_HOST=your_redis_host_here
REDIS_PORT=your_redis_port_here
REDIS_PASSWORD=your_redis_password_here

BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

> **Note:** For the PDF RAG feature, you also need to create a Pinecone index named `rag` with **1024 dimensions** and **cosine** metric.

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
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
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
│   │   ├── config/          # Database, Pinecone, ImageKit configurations
│   │   │   ├── database.js
│   │   │   ├── cache.js
│   │   │   ├── pinecone.js  # Pinecone vector DB client
│   │   │   └── imagekit.js  # ImageKit file upload client
│   │   ├── controllers/     # Request handlers (Auth, Chat + PDF)
│   │   ├── middleware/      # Custom middlewares (Auth, Error handling)
│   │   ├── models/          # Mongoose schemas (User, Chat, Message)
│   │   ├── routes/          # API route definitions (with Multer for PDF)
│   │   ├── services/        # Business logic and AI service integrations
│   │   │   ├── ai.service.js       # Gemini/Mistral AI + PDF context injection
│   │   │   ├── pdf.service.js      # PDF parse, chunk, embed & Pinecone RAG
│   │   │   └── internet.service.js # Tavily web search
│   │   ├── sockets/         # Socket.io event handlers
│   │   └── validators/      # Input validation logic
│   ├── app.js               # Express app configuration
│   └── server.js            # Entry point for the backend
│
└── Frontend/                # React Application (Vite)
    ├── src/
    │   ├── app/             # Main App component, Store, Routes, and Global CSS
    │   ├── assets/          # Static assets (images, icons)
    │   └── features/        # Feature-based modules
    │       ├── auth/        # Authentication (Login, Register, Forgot/Reset)
    │       └── chat/        # Chat feature with PDF attachment support
    │           ├── components/   # MarkdownRenderer, Views
    │           ├── hooks/        # useChat (PDF upload handling)
    │           ├── pages/        # Dashboards (PDF chip, badge UI)
    │           ├── service/      # API calls (FormData for PDF) & Socket
    │           └── chat.slice.js # Redux state (PDF uploading state)
    ├── index.html           # HTML template
    └── vite.config.js       # Vite configuration
```

---

## 🔌 API Endpoints (Overview)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and issue JWT
- `POST /api/auth/google` - Sign in with Google (verify ID token, create/login user)
- `POST /api/auth/logout` - Logout user (blacklists JWT in Redis)
- `GET /api/auth/get-me` - Get current authenticated user
- `GET /api/auth/verify-email` - Verify email via token link
- `POST /api/auth/resend-verification` - Resend email verification
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password` - Reset password with token

### Chat (Protected)
- `GET /api/chats` - Retrieve all user chat sessions
- `POST /api/chats/message` - Send a message (supports PDF attachment via `multipart/form-data`)
- `GET /api/chats/:id/messages` - Get messages for a specific chat
- `DELETE /api/chats/delete/:id` - Delete a chat session
- *(WebSocket events handle real-time message sending and AI streaming)*

### PDF RAG Flow
1. User attaches a PDF in the chat input and sends a message
2. Backend uploads the PDF to **ImageKit** for cloud storage
3. PDF text is extracted using `pdf-parse`, split into chunks via `RecursiveCharacterTextSplitter`
4. Each chunk is embedded using **Mistral Embeddings** (1024 dimensions)
5. Vectors are stored in **Pinecone** under a namespace scoped to the chat ID
6. On subsequent messages, the user's query is embedded and searched against Pinecone
7. Top-3 relevant PDF chunks are injected into the AI system prompt as context
8. AI responds with answers grounded in the PDF content

### Token Blacklisting Flow
1. User calls `POST /api/auth/logout`
2. The current JWT is stored in **Redis** with a TTL matching the token's remaining lifetime (7 days max)
3. On every authenticated request, the middleware checks Redis — if the token is blacklisted, access is denied
4. This ensures that even valid, unexpired tokens are immediately revoked after logout

### Google Sign-In Flow
1. User clicks "Sign in with Google" on the Login or Register page
2. Google Identity Services (GSI) popup opens for account selection
3. Google returns an **ID token** (JWT signed by Google)
4. Frontend sends the ID token to `POST /api/auth/google`
5. Backend verifies the token using `google-auth-library`
6. If no user exists with that email → a new account is created (auto-verified, no password needed)
7. If a user already exists → they are logged in (Google account is linked if not already)
8. A JWT cookie is set and the user is redirected to the dashboard

---

## 💡 Future Enhancements
- Incorporate more specialized LLMs for different topics.
- Support multiple PDF uploads per chat session.
- Add image and document preview within the chat interface.
- Implement streaming AI responses for real-time typing effect.
- Enhance UI accessibility and add more theme options.

---

## 📜 License
This project is licensed under the ISC License.
