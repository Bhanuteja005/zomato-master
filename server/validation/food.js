import joi from 'joi';

const ValidateRestaurantId = (userData) => {
    const schema = joi.object({
        _id: joi.string().required(),
    });

    return schema.validateAsync(userData);
};
const ValidateCategory = (userData) => {
    const schema = joi.object({
        category: joi.string().required(),
    });

    return schema.validateAsync(userData);
};
export { ValidateCategory, ValidateRestaurantId };

