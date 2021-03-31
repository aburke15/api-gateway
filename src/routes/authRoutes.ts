import express from 'express';
import container from '../container';

const router = express.Router();
const authController = container.resolve('authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/token', authController.token);

export = router;
