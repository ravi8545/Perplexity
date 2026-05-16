import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//health check route
app.get('/', (req, res) => {
	res.json({ message: 'Server is running' });
});

// routes

app.use('/api/auth', authRouter);


export default app;
