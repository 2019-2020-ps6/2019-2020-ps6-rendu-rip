const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Player', {
  name: Joi.string().required(),
  imageId: Joi.number()
})