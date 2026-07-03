import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import morgan from 'morgan';
import cors from 'cors';
import chatRouter from './routes/chat.routes.js';

const app = express();

//middlewares
app.use(cors({
	origin: 'http://localhost:5173', // Update this to match your frontend URL
	credentials: true, // Allow cookies to be sent
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//health check route
app.get('/', (req, res) => {
	res.json({ message: 'Server is running' });
});

// routes

app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);


export default app;
