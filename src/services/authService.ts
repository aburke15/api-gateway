export class AuthService {
    bcrypt;
    jwt;

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
        return this.jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    };

    public refreshToken = (user: any) => {
        return this.jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    };

    public headerContainsToken = (token: string): boolean => {
        return !(token === '' || token === undefined || token === null);
    };

    public isAuthenticated = (req: any, next: any): boolean => {
        let token = req.headers['auth-token'];
        if (!this.headerContainsToken(token)) return false;

        this.jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
            if (err) return false;
            req.params.user = decoded;
        });

        return true;
    };

    public getJwt = (): any => {
        return this.jwt;
    };
}
