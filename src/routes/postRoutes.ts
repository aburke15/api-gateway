import express from 'express';
import UserService from '../services/userService';
import AuthService from '../services/authService';

const userService = new UserService();
const authService = new AuthService();

const router = express.Router();

router.get('/', authService.verifyToken, async (req, res, next) => {
    const user = await userService.getSingleUserById(req.params.user);
    res.status(200).send(user);
});

export = router;
