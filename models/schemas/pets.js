const Joi = require('joi');

const createSchema = Joi.object().keys({
  specie: Joi.string(),
  gender: Joi.string()
    .required()
    .valid('Male','Female'),
  url: Joi.string()
    .required()
    .regex(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[#?]?.*$/gm),
  description: Joi.string(),
  photo: Joistring()
    .required()
    .regex(/(https?:\/\/.*\.(?:png|jpg|jpeg))/gm),
  name: Joi.string()
    .required() 
    .min(3),
});

module.exports = {createSchema};