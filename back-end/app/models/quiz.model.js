const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  name: Joi.string().required(),
  theme: Joi.string().required(),
  creationDate: Joi.string(),
  //questions: Joi.array(),//sert à quoi au juste?
  imageId: Joi.string(),
  random: Joi.boolean()
})
