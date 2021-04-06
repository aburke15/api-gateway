export class UserService {
    private readonly User;

    constructor(opts: any) {
        this.User = opts.User;
    }

    public getSingleUser = async (email: string): Promise<any> => {
        return await this.User.findOne({ email: email });
    };

    public getSingleUserById = async (id: string): Promise<any> => {
        return await this.User.findOne({ _id: id });
    };
}
