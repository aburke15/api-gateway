export class AuthService {
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

    public refreshToken = (user: any) => {
        return this.jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    };

    public containsToken = (token: string): boolean => {
        return !(token === '' || token === undefined || token === null);
    };

    public isAuthenticated = (req: any): boolean => {
        const token = req.headers['auth-token'];
        if (!this.containsToken(token)) return false;

        try {
            const decoded = this.jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.params.user = decoded;

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    public getJwt = (): any => {
        return this.jwt;
    };
}
