import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  publishedYear: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
}).required();

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  year: Joi.number(),
  description: Joi.string(),
}).required();