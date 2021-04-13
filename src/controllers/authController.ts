import { NextFunction, Request, Response } from 'express';

export class AuthController {
    private readonly userService;
    private readonly authService;
    private readonly validationService;
    private readonly User;
    private readonly RefreshToken;
    private readonly tokenRepository;

    constructor(opts: any) {
        this.userService = opts.userService;
        this.authService = opts.authService;
        this.validationService = opts.validationService;
        this.User = opts.User;
        this.RefreshToken = opts.RefreshToken;
        this.tokenRepository = opts.tokenRepository;
    }

    public register = async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.validationService.registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingUser = await this.userService.getSingleUser(req.body.email);

        if (existingUser) {
            return res.status(400).send({
                error: 'User already exists with that email.'
            });
        }

        const hashedPassword = await this.authService.getHashedPassword(req.body.password);
        const user = this.mapUser(req, hashedPassword);

        try {
            await user.save();
            return res.status(200).send({
                message: 'created',
                success: {
                    username: user.username,
                    email: user.email
                }
            });
        } catch (err) {
            return res.status(400).send(err);
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
        const refreshToken = this.authService.refreshToken(user);

        try {
            const persistedRefreshToken = this.mapRefreshToken(refreshToken);
            await persistedRefreshToken.save();

            return res.status(200).send({ token: token, refreshToken: refreshToken });
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    };

    public token = async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.body.token;
        if (refreshToken == null) return res.sendStatus(401);

        const persistedRefreshToken = await this.tokenRepository.getByTokenValue(refreshToken);
        if (!persistedRefreshToken) return res.sendStatus(403);

        const jwt = this.authService.getJwt();
        jwt.verify(persistedRefreshToken.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
            if (err) return res.sendStatus(401);
            const token = this.authService.generateToken(user);
            return res.status(200).send({ token: token });
        });
    };

    private mapUser = (req: any, hashedPassword: string): any => {
        return new this.User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone
        });
    };

    private mapRefreshToken = (token: string): any => {
        return new this.RefreshToken({
            refreshToken: token
        });
    };
}
