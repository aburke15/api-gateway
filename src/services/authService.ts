import { Request, Response, NextFunction } from 'express';

class AuthService {
    private readonly bcrypt;
    private readonly jwt;

    constructor(opts: any) {
        this.bcrypt = opts.bcrypt;
        this.jwt = opts.jwt;
    }

    public getHashedPassword = async (password: string): Promise<string> => {
        const saltRounds = 10;
        const salt = await this.bcrypt.genSalt(saltRounds);

        return await this.bcrypt.hash(password, salt);
    };

    public bcryptCompare = async (password: string, user: any): Promise<boolean> => {
        return await this.bcrypt.compare(password, user.password);
    };

    public generateToken = (user: any) => {
        return this.jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    };

    public verifyToken = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['auth-token'];
        if (!token) res.status(401).send({ error: 'Unauthorized' });

        try {
            req.params.user = this.jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            next();
        } catch (err) {
            res.status(500).send({ error: 'Failed to authenticate' });
        }
    };
}

export = AuthService;
