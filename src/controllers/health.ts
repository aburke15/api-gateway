import { NextFunction, Request, Response } from 'express';

const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'healthy'
    });
};

export default { healthCheck };
