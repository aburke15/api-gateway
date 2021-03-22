import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
const Joi = require('@hapi/joi');

const register = async (req: Request, res: Response, next: NextFunction) => {
    const schema = {
        firstName: Joi.string().max(50),
        lastName: Joi.string().max(50),
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).email().required(),
        phone: Joi.string().min(10).max(11)
    };

    const { error } = Joi.validate(req.body, schema);
    //console.log(error);
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
