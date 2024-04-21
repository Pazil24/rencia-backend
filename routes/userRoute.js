import express from 'express';
import { registerUser, userLogin, currentUser } from '../controllers/userController.js';
import tokenValidator from '../middleware/tokenValidatorHandler.js';

const router = express.Router();

router.post('/register', registerUser)

router.post('/login', userLogin)

router.get('/current', tokenValidator, currentUser)

export default router;