import express from 'express';
import container from '../container';
import AuthController from '../controllers/authController';

const router = express.Router();

const userService = container.resolve('userService');
const authService = container.resolve('authService');
const validationService = container.resolve('validationService');

const authController = new AuthController({ userService, authService, validationService });

router.post('/register', authController.register);
router.post('/login', authController.login);

export = router;
