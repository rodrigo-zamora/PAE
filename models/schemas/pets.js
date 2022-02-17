const Joi = require('joi');

const updateSchema = Joi.object().keys({
  specie: Joi.string(),
  gender: Joi.string()
    .valid('Male','Female'),
  url: Joi.string()
    .regex(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[#?]?.*$/m),
  description: Joi.string(),
  photo: Joi.string()
    .regex(/^https?:\/\/.*$/m),
  name: Joi.string()
    .min(3)
});
  
const createSchema = updateSchema.concat(Joi.object({
  gender: Joi.required(),
  url: Joi.required(),
  photo: Joi.required(),
  name: Joi.required() 
}))

module.exports = {updateSchema, createSchema};