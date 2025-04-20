import Joi from "joi";

export const borrowSchema = Joi.object({
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
    borrowDate: Joi.string().required(),
    returnDate: Joi.string().required(),
});

export const returnSchema = Joi.object({
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
    borrowDate: Joi.string().required(),
    returnDate: Joi.string().required(),
});