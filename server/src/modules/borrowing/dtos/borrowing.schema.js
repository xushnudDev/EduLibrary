import Joi from "joi";

export const borrowSchema = Joi.object({
    bookId: Joi.string().required(),
    userId: Joi.string().required(),
    borrowDate: Joi.string().required(),
    returnDate: Joi.string().required(),
});

export const returnSchema = Joi.object({
    bookId: Joi.string().required(),
    userId: Joi.string().required(),
    borrowDate: Joi.string().required(),
    returnDate: Joi.string().required(),
});