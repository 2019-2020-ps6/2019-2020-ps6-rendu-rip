const Joi = require('joi')
const BaseModel = require('./base-model.js')

const schema = {
  url: Joi.string(),
  name: Joi.string(),
  type: Joi.string()
}

//inherit from BaseModel
class ImageBaseModel extends BaseModel {
  constructor(name) {
    if(!name) throw new Error('You must provide a name in constructor of ImageBaseModel')
    super(name, schema)
  }
}

module.exports = ImageBaseModel