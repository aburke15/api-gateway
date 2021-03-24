class ValidationService {
    Joi = require('@hapi/joi');

    public registerValidation = (data: object) => {
        const schema = {
            firstName: this.Joi.string().max(50),
            lastName: this.Joi.string().max(50),
            username: this.Joi.string().min(4).max(50).required(),
            password: this.Joi.string().min(6).max(100).required(),
            email: this.Joi.string().min(6).email().required(),
            phone: this.Joi.string().min(10).max(11)
        };

        return this.Joi.validate(data, schema);
    };

    public loginValidation = (data: object) => {
        const schema = {
            email: this.Joi.string().min(6).email().required(),
            password: this.Joi.string().min(6).max(100).required()
        };

        return this.Joi.validate(data, schema);
    };
}

export = ValidationService;
