import express from 'express';
import controller from '../controllers/auth';

const router = express.Router();

router.get('/', controller.authenticate);
router.get('/login', controller.login);
router.get('/token', controller.token);

export = router;
