const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('quizImage', {
  url: Joi.string(),
  name: Joi.string(),
  type: Joi.string()
})
