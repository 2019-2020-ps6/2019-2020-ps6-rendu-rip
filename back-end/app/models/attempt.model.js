const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const Answer = require('./answer.model.js')
const Question = require('./question.model.js')
const Quiz = require('./quiz.model.js')

module.exports = new BaseModel('Attempt', {
  playerId: Joi.number().required(),
  quizId: Joi.number().required(),
  date: Joi.string(),
  timeOuts: Joi.number().required(),
  quiz: Joi.object(Quiz),
  questions: Joi.array().items(Joi.object(Question)),
  wrongAnswers: Joi.array().items(Joi.object(Answer)) // .items(Joi.object(Answer))
  //quiz to keep some data
  //array of Question-S           --> questions[]
  //array of wrong Answer-S given --> wrongAnswers[]
})