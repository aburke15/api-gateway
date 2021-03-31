import { NextFunction, Request, Response } from 'express';

class AuthController {
    private readonly userService;
    private readonly authService;
    private readonly validationService;
    private readonly User;

    private refreshTokens: any = [];

    constructor(opts: any) {
        this.userService = opts.userService;
        this.authService = opts.authService;
        this.validationService = opts.validationService;
        this.User = opts.User;
    }

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
        const refreshToken = this.authService.refreshToken(user);
        this.refreshTokens.push(refreshToken);

        return res.status(200).send({ token: token, refreshToken: refreshToken });
    };

    public token = (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.body.token;
        if (refreshToken == null) return res.sendStatus(401);
        if (!this.refreshTokens.includes(refreshToken)) return res.sendStatus(403);

        const token = this.authService.verify();
    };

    private mapUser = (req: any, hashedPassword: String): any => {
        return new this.User({
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
