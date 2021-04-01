interface GenericRepository {
    findOne(prop: string, value: any): any;
}

class TokenRepository {
    private readonly refreshToken;

    constructor(opts: any) {
        this.refreshToken = opts.RefreshToken;
    }

    public findOne = async (prop: string, value: any): Promise<any> => {
        const refreshToken = (this.refreshToken[prop] = value);
        return await this.refreshToken.findOne(refreshToken);
    };
}

export = TokenRepository;
