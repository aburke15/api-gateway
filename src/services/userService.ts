import User from '../models/User';

class UserService {
    public getSingleUser = async (email: string): Promise<any> => {
        return await User.findOne({ email: email });
    };
}

export = UserService;
