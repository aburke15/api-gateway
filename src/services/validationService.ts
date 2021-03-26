class ValidationService {
    private readonly joi;

    constructor(opts: any) {
        this.joi = opts.Joi;
    }

    public registerValidation = (data: any) => {
        const schema = {
            firstName: this.joi.string().max(50),
            lastName: this.joi.string().max(50),
            username: this.joi.string().min(4).max(50).required(),
            password: this.joi.string().min(6).max(100).required(),
            email: this.joi.string().min(6).email().required(),
            phone: this.joi.string().min(10).max(11)
        };

        return this.joi.validate(data, schema);
    };

    public loginValidation = (data: any) => {
        const schema = {
            email: this.joi.string().min(6).email().required(),
            password: this.joi.string().min(6).max(100).required()
        };

        return this.joi.validate(data, schema);
    };
}

export = ValidationService;
