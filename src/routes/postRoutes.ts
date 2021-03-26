import express from 'express';
import container from '../container';

const userService = container.resolve('userService');
const authService = container.resolve('authService');

const router = express.Router();

router.get('/', authService.verifyToken, async (req, res, next) => {
    const user = await userService.getSingleUserById(req.params.user);
    res.status(200).send(user);
});

export = router;
