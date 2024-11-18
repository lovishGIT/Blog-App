import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/logout', verifyToken, authController.logout);

export default router;
