const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  name: Joi.string().required(),
  creationDate: Joi.string(),
  //questions: Joi.array(),//sert à quoi au juste?
  image: Joi.string()
})
