import { Request, Response, NextFunction } from 'express';

export class PostController {
    private readonly userService;
    private readonly authService;

    constructor(opts: any) {
        this.userService = opts.userService;
        this.authService = opts.authService;
    }

    public getPosts = async (req: Request, res: Response, next: NextFunction) => {
        console.log('in getPosts method');
        let authenticated = this.authService.isAuthenticated(req, next);
        if (!authenticated) return res.sendStatus(401);

        const user = await this.userService.getSingleUserById(req.params.user);
        return res.status(200).send({ user: user });
    };
}
