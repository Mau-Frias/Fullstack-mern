import Router from 'express';

import { loginUser, registerUser } from '../controllers/auth.controllers.js';

const router = Router();

// Define routes for user authentication
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
