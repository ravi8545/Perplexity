import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import morgan from 'morgan';
import cors from 'cors';
import chatRouter from './routes/chat.routes.js';

const app = express();

//middlewares
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
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
