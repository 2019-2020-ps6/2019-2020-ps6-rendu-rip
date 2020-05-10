const Joi = require('joi')
const ImageBaseModel = require('../utils/image-base-model.js')

module.exports = {
  DefaultImage: new ImageBaseModel('DefaultImage'),
  Image: new ImageBaseModel('Image'),//better this way & easier to deal with img db
  PlayerPhoto: new ImageBaseModel('PlayerPhoto')
}