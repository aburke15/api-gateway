interface GenericRepository {
    getByProperty(prop: string, value: any): Promise<any>;
}

export class TokenRepository implements GenericRepository {
    private readonly refreshToken;

    constructor(opts: any) {
        this.refreshToken = opts.RefreshToken;
    }

    public getByProperty = async (prop: string, value: any): Promise<string> => {
        return await this.refreshToken.findOne({ prop, value });
    };
}
