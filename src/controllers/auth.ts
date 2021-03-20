import { NextFunction, Request, Response } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'authenticated'
    });
};

export default { authenticate };
