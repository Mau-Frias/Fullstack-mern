import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';


const app = express();

app.use(cors({
    origin: "*" ,
    // origin: (origin, callback) => {
    //     const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3000'];
    //     if (!origin || allowedOrigins.includes(origin)) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;