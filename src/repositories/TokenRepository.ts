interface GenericRepository {
    findOne(prop: string, value: any): any;
}

export class TokenRepository {
    refreshToken: any;

    constructor(opts: any) {
        this.refreshToken = opts.RefreshToken;
    }

    async getByProperty(prop: string, value: any): Promise<any> {
        return await this.refreshToken.findOne({ prop, value });
    }
}
