const {Router} = require('express')
const {Question} = require('../../../models')
const {Answer} = require('../../../models')

const router = new Router({mergeParams: true})
const AnswerRouteur = require('./answers')

router.get('/:questionId', (req, res) => {
  try {
    res.status(200).json({...Question.getById(req.params.questionId),answers: Answer.get().filter(answer => answer.questionId == parseInt(req.params.questionId))})
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', (req, res) => {
    try {
      res.status(200).json(Question.get().map(question => ({...question,answers:Answer.get().filter(answer => answer.questionId==parseInt(question.id))})))
    } catch (err) {
      res.status(500).json(err)
    }
  })


  router.post('/', (req, res) => {
    try {
      const question = Question.create({ ...req.body, quizId : req.params.quizId, answers:[]})
      res.status(201).json(question)
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json(err.extra)
      } else {
        res.status(500).json(err)
      }
    }
  })
  
  router.put('/:questionId', (req, res) => {
    try {
      res.status(200).json(Question.update(req.params.questionId,req.body))
    } catch (err) {
      res.status(500).json(err)
    }
  })

  router.delete('/:questionId', (req, res) => {
    try {
      res.status(200).json(Question.delete(req.params.questionId))
    } catch (err) {
      res.status(500).json(err)
    }
  })


router.use('/:questionId/answers',AnswerRouteur);
module.exports = router

