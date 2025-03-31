import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;