import { Request, Response, NextFunction } from 'express';

interface Post {
    title: string;
    body: string;
}

export class PostController {
    jwt;
    posts: Post[] = [
        { title: 'hello', body: 'world' },
        { title: 'post1', body: 'this is post one' },
        { title: 'post2', body: 'hell, this is post two' },
        { title: 'post3', body: 'what up, this is post three' },
        { title: 'post4', body: 'yo yo, this is post four' }
    ];

    constructor(opts: any) {
        this.jwt = opts.jwt;
    }

    getPosts(req: Request, res: Response, next: NextFunction) {
        //TODO: extract this out
        const token = req.headers['auth-token'];
        if (!token) return res.status(401).send({ error: 'Unauthorized' });

        try {
            const decode = this.jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.params.user = decode;
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: 'Failed to authenticate' });
        }

        return res.status(200).send(this.posts);
    }
}
