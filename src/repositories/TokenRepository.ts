export class TokenRepository {
    private readonly refreshToken;

    constructor(opts: any) {
        this.refreshToken = opts.RefreshToken;
    }

    public getByTokenValue = async (token: string): Promise<string> => {
        try {
            return await this.refreshToken.findOne({ refreshToken: token });
        } catch (error) {
            return '';
        }
    };
}
