const { Router } = require('express')

const { Answer, Quiz, Question } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const AnswersRouter = require('./answers')
const { filterQuestionsFromQuizz, getQuestionFromQuiz, buildQuestion, buildQuestions } = require('./manager')
const { deleteAnswerFromQuestion} = require('./answers/manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    const questions = filterQuestionsFromQuizz(req.params.quizId)
    const question2 = buildQuestions(questions);
    res.status(200).json(question2)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = buildQuestion(req.params.questionId);
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const question = Question.create({...req.body})
    // Check if quizId exists, if not it will throw a NotFoundError
    //Quiz.getById(req.params.quizId)
    
    /*const quizId = parseInt(req.params.quizId, 10)
    let question = Question.create({ label: req.body.label, quizId })*/

    // If answers have been provided in the request, we create the answer and update the response to send.
    /*if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) => Answer.create({ ...answer, questionId: question.id }))
      question = {...question, answers}
    }*/
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    //const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    //let updatedQuestion = Question.update(req.params.questionId, { label: req.body.label, quizId: question.quizId })
    const question = Question.update(req.params.questionId, req.body)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url. 
    getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    deleteAnswerFromQuestion(req.params.questionId);
    Question.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/answers', AnswersRouter)

module.exports = router