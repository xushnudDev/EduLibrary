import Joi from "joi";

export const createCategorySchema = Joi.object({
    name: Joi.string().required(),
    books: Joi.array().items(Joi.string()),
}).required();

export const updateCategorySchema = Joi.object({
    name: Joi.string(),
    books: Joi.string(),
}).required();


