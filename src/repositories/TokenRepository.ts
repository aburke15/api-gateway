export class TokenRepository {
    private readonly refreshToken;
    private readonly logger;

    constructor(opts: any) {
        this.refreshToken = opts.RefreshToken;
        this.logger = opts.logger;
    }

    public getByTokenValue = async (token: string): Promise<string> => {
        try {
            const existingToken = this.refreshToken.findOne({ refreshToken: token });

            return existingToken;
        } catch (err) {
            return '';
        }
    };
}
