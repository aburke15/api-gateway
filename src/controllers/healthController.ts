import { NextFunction, Request, Response } from 'express';

class HealthController {
    public healthCheck = (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).send({
            success: 'healthy'
        });
    };
}

export = HealthController;
