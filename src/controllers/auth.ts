import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { registerValidation } from '../controllers/validation';

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        const persistedUser = await user.save();
        return res.status(200).send({
            success: {
                username: persistedUser.username,
                email: persistedUser.email
            }
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

export default {
    register
};
