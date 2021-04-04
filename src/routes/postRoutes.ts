import express from 'express';
import container from '../container';

const router = express.Router();
const postController = container.resolve('postController');

router.get('/', postController.getPosts);

export = router;
