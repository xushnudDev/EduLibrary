import Joi from "joi";


export const addReviewSchema = Joi.object({
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required(),
});

export const updateReviewSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required(),
});