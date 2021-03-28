import express from 'express';
import container from '../container';

const router = express.Router();
const healthController = container.resolve('healthController');

router.get('/', healthController.healthCheck);

export = router;
