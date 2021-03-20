import { NextFunction, Request, Response } from 'express';

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

export default {
    authenticate,
    login,
    token
};
