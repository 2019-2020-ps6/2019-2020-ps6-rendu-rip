const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const Answer = require('./answer.model.js')
const Question = require('./question.model.js')
const Quiz = require('./quiz.model.js')

module.exports = new BaseModel('Attempt', {
  playerId: Joi.number().required(),
  quiz: Quiz.schema,
  date: Joi.string(),
  timeOuts: Joi.number().required(),
  wrongAnswers: Joi.array().items(Answer.schema)
  //quiz to keep some data
  //array of Question-S           --> questions[]
  //array of wrong Answer-S given --> wrongAnswers[]
})