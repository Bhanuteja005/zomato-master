import joi from 'joi';

const ValidateRestaurantCity = (restaurantObj) => {
    const schema = joi.object({
        city: joi.string().required(),
    });

    return schema.validateAsync(restaurantObj);
};
const ValidateRestaurantSearchString = (restaurantObj) => {
    const schema = joi.object({
        searchstring: joi.string().required(),
    });
    return schema.validateAsync(restaurantObj);
};
export { ValidateRestaurantCity, ValidateRestaurantSearchString };

