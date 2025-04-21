import Joi from "joi";

export const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
  phoneNumber: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').optional(),
  age: Joi.number().integer().min(7).optional(),
});
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(16).required(),
}).required();

export const deleteUserSchema = Joi.object({
    id: Joi.string().required(),
});

export const addUserReviewSchema = Joi.object({
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required(),
});
