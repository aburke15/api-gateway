import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'authenticated'
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'logged in'
    });
};

const token = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'refresh token: blae23323423'
    });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
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

        return res.status(200).json({
            persistedUser
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
