import Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  publishedYear: Joi.number().required(),  // faqat raqam
  imageUrl: Joi.string().optional(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),  // faqat raqam
  category: Joi.string().required(),
}).required();


export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  publishedYear: Joi.number(),
  imageUrl: Joi.string(),
  description: Joi.string(),
  quantity: Joi.number(),
  category: Joi.string(),
}).required();
