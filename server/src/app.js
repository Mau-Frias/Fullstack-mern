import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

console.log('Initializing Express app'); // Debug log

const app = express();

console.log('Setting up middleware'); // Debug log
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
console.log('CORS middleware configured'); // Debug log

app.use(express.json());
console.log('JSON body parser middleware configured'); // Debug log

app.use(morgan('dev'));
console.log('Morgan logging middleware configured'); // Debug log

app.use(cookieParser());
console.log('Cookie parser middleware configured'); // Debug log

console.log('Setting up routes'); // Debug log
app.use('/api/users', userRoutes);
console.log('User routes configured'); // Debug log

app.use('/api/auth', authRoutes);
console.log('Auth routes configured'); // Debug log

console.log('Express app initialized'); // Debug log

export default app;