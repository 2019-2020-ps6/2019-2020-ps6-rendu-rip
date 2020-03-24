const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouteur = require('./users')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouteur)

module.exports = router
