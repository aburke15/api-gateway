import { NextFunction, Request, Response } from 'express';
import ValidationService from '../services/validationService';
import UserService from '../services/userService';
import AuthService from '../services/authService';
import User from '../models/User';

class AuthController {
    private userService = new UserService();
    private authService = new AuthService();
    private validationService = new ValidationService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.validationService.registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const userExists = await this.userService.getSingleUser(req.body.email);
        if (userExists) {
            return res.status(400).send({
                error: 'User already exists with that email.'
            });
        }

        const hashedPassword = await this.authService.getHashedPassword(req.body.password);
        const user = this.mapUser(req, hashedPassword);

        try {
            await user.save();
            return res.status(200).send({
                success: {
                    username: user.username,
                    email: user.email
                }
            });
        } catch (err) {
            return res.status(400).send({
                error: err.message
            });
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.validationService.loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await this.userService.getSingleUser(req.body.email);
        if (!user) {
            return res.status(400).send({
                error: 'User was not found with that email.'
            });
        }

        const isMatchingPassword = await this.authService.bcryptCompare(req.body.password, user);
        if (!isMatchingPassword) {
            return res.status(400).send({
                error: 'Password was not found or does not match.'
            });
        }

        const token = this.authService.generateToken(user);
        return res.header('auth-token', token).send(token);
    };

    private mapUser = (req: any, hashedPassword: String): any => {
        return new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone
        });
    };
}

export = AuthController;