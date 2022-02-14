const Joi = require('joi');

const createSchema = Joi.object().keys({
  specie: Joi.string(),
  gender: Joi.string()
    .valid('M','F')
    .required(),
  url: Joi.string()
    .required()
    .regex(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
  description: Joi.string(),
  photo: Joistring()
    .required()
    .regex(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.JPG$/),
  name: Joi.string()
    .min(3)
    .required() 
});

module.exports = {createSchema};