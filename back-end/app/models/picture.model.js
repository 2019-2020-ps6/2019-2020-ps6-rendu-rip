const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Picture', {
  base64: Joi.string(),//.required(),
  url: Joi.string(),
  path: Joi.stringr()
})
