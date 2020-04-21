const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const Answer = require('./answer.model.js')

module.exports = new BaseModel('Attempt', {
  userId: Joi.number().required(),
  quizId: Joi.number().required(),
  date: Joi.string(),
  timeOuts: Joi.number().required(),
  wrongAnswers: Joi.array() // .items(Joi.object(Answer))
})