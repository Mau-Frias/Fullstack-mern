import Router from 'express';

import { loginUser, registerUser, logoutUser } from '../controllers/auth.controllers.js';

const router = Router();

// Define routes for user authentication
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

export default router;
