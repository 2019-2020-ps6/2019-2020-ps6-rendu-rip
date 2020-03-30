const Quiz = require('./quiz.model.js')
const Question = require('./question.model.js')
const Answer = require('./answer.model.js')
const User = require('./user.model.js')
const { DefaultImage, QuizImage, 
  QuestionImage, AnswerImage, UserImage } = require('./image.model.js')

module.exports = {
  Quiz, Question, Answer, User, 
  DefaultImage, 
  QuizImage, QuestionImage, AnswerImage, UserImage
}
