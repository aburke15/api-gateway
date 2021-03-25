import express from 'express';
import verify from '../services/verificationService';
import UserService from '../services/userService';

const userService = new UserService();

const router = express.Router();

router.get('/', verify, async (req, res, next) => {
    const user = await userService.getSingleUserById(req.params.user);
    res.status(200).send(user);
});

export = router;
