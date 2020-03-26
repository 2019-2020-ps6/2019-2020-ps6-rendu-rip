const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  name: Joi.string().required(),
  creationDate: Joi.string(),
  questions: Joi.array(),//à changer, ah bon?
  imageId: Joi.number()
})
