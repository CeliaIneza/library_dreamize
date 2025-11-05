const Joi = require('joi');

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().optional(),
  publishedDate: Joi.date().optional(),
  copiesAvailable: Joi.number().integer().min(0).optional(),
  description: Joi.string().optional()
});

const updateBookSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  isbn: Joi.string().optional(),
  publishedDate: Joi.date().optional(),
  copiesAvailable: Joi.number().integer().min(0).optional(),
  description: Joi.string().optional()
});

module.exports = { createBookSchema, updateBookSchema };
