import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

export = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['auth-token'];
    if (!token) res.status(401).send({ error: 'Unauthorized' });

    try {
        req.params.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (err) {
        res.status(500).send({ error: 'Failed to authenticate' });
    }
};
