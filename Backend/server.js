import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import helmet from "helmet";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT || 3000;

// Register middleware
app.use(helmet());

// Create server
const httpServer = http.createServer(app);

// Initialize socket
initSocket(httpServer);

// Connect DB
connectDB().catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
});

// Start server
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});