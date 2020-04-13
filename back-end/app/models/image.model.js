const Joi = require('joi')
/*const BaseModel = require('../utils/base-model.js')

const general_schema = {
  url: Joi.string(),
  name: Joi.string(),
  type: Joi.string()
}

module.exports = {
  DefaultImage: new BaseModel('DefaultImage', general_schema),
  QuizImage: new BaseModel('QuizImage', general_schema),
  QuestionImage: new BaseModel('QuestionImage', general_schema),
  AnswerImage: new BaseModel('AnswerImage', general_schema),
  UserImage: new BaseModel('UserImage', general_schema)
}*/
const ImageBaseModel = require('../utils/image-base-model.js')

module.exports = {
  DefaultImage: new ImageBaseModel('DefaultImage'),
  QuizImage: new ImageBaseModel('QuizImage'),
  QuestionImage: new ImageBaseModel('QuestionImage'),
  AnswerImage: new ImageBaseModel('AnswerImage'),
  UserImage: new ImageBaseModel('UserImage')
}