import { Request, Response, NextFunction } from 'express';

interface Post {
    title: string;
    body: string;
}

export class PostController {
    userService;
    posts: Post[] = [
        { title: 'hello', body: 'world' },
        { title: 'post1', body: 'this is post one' },
        { title: 'post2', body: 'hell, this is post two' },
        { title: 'post3', body: 'what up, this is post three' },
        { title: 'post4', body: 'yo yo, this is post four' }
    ];

    constructor(opts: any) {
        this.userService = opts.userService;
    }

    async getPosts(req: Request, res: Response, next: NextFunction) {
        const user = await this.userService.getSingleUserById(req.params.user);
        return res.status(200).send(user);
    }
}
