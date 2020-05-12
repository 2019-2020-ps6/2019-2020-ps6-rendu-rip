const Quiz = require('./quiz.model.js')
const Theme = require('./theme.model.js')
const Question = require('./question.model.js')
const Answer = require('./answer.model.js')
const Player = require('./player.model.js')
//const { DefaultImage, QuizImage, QuestionImage, AnswerImage, UserImage } = require('./image.model.js')
const { DefaultImage, Image, PlayerPhoto } = require('./image.model.js')
const Attempt = require('./attempt.model.js')
const TimerConfig = require('./timerconfig.model.js')

module.exports = {
  Quiz, Question, Answer, Player, Theme,
  DefaultImage, 
  Image, PlayerPhoto,
  //QuizImage, QuestionImage, AnswerImage, UserImage,
  Attempt,
  TimerConfig
}
