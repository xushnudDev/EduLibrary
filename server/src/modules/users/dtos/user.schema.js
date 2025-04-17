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