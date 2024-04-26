import joi from 'joi';

const ValidateSignup = (userData) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        address: joi.array().items(joi.object({ detail: joi.string(), for: joi.string() })),
        phoneNumber: joi.array().items(joi.number())
    });

    return schema.validate(userData);
};

const ValidateSignin = (userData) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    return schema.validate(userData);
}

export { ValidateSignin, ValidateSignup };
