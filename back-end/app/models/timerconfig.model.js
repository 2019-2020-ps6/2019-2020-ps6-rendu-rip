const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('TimerConfig', {
  timerToAnswer: Joi.number(),
  timerComparison: Joi.number(),
  timerRightAnswer: Joi.number()
})
