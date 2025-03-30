import Router from 'express';
import * as userControllers from '../controllers/user.controllers.js';

const router = Router();




router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getUserById);
router.post('/', userControllers.createUser);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

router.post('/login', userControllers.loginUser);
router.post('/register', userControllers.createUser);

export default router;