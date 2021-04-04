import { Request, Response, NextFunction } from 'express';

export class AuthService {
    bcrypt;
    jwt;

    constructor(opts: any) {
        this.bcrypt = opts.bcrypt;
        this.jwt = opts.jwt;
    }

    async getHashedPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await this.bcrypt.genSalt(saltRounds);

        return await this.bcrypt.hash(password, salt);
    }

    async bcryptCompare(password: string, user: any): Promise<boolean> {
        return await this.bcrypt.compare(password, user.password);
    }

    generateToken(user: any) {
        return this.jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
    }

    refreshToken(user: any) {
        return this.jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    }

    headerContainsToken(token: string): boolean {
        if (!token) return false;
        return true;
    }

    verifyToken() {
        // const token = req.headers['auth-token'];
        // if (!token) res.status(401).send({ error: 'Unauthorized' });
        // try {
        //     const decode = this.jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //     req.params.user = decode;
        //     next();
        // } catch (err) {
        //     console.log(err);
        //     res.status(500).send({ error: 'Failed to authenticate' });
        // }
    }

    getJwt(): any {
        return this.jwt;
    }
}
