import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { registerValidation, loginValidation } from '../controllers/validation';
const bcrypt = require('bcryptjs');

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (await checkIfEmailExists(req.body.email)) {
        return res.status(400).send({
            error: 'Email already exists.'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
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
        return res.status(400).send({
            error: err.message
        });
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!(await checkIfEmailExists(req.body.email))) {
        return res.status(400).send({
            error: 'Email was not found.'
        });
    }

    const user = await User.findOne({ email: req.body.email });
    const matchingPassword = await bcrypt.compare(req.body.password, user.password);

    if (!matchingPassword) {
        return res.status(400).send({
            error: 'Password was not found.'
        });
    }

    return res.status(200).send({
        success: 'Logged in.'
    });
};

const checkIfEmailExists = async (email: string): Promise<Boolean> => {
    return await User.findOne({ email: email });
};

export default {
    register,
    login
};
