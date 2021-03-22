const Joi = require('@hapi/joi');

export const registerValidation = (data: object) => {
    const schema = {
        firstName: Joi.string().max(50),
        lastName: Joi.string().max(50),
        username: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).email().required(),
        phone: Joi.string().min(10).max(11)
    };

    return Joi.validate(data, schema);
};
