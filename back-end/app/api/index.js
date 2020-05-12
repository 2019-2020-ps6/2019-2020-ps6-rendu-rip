const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const PlayerRouter = require('./players')
const ImageRouter = require('./images')
const ThemeRouter = require('./themes')
const TimerConfigRouter = require('./timerconfig')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/players', PlayerRouter)
router.use('/images', ImageRouter)
router.use('/themes', ThemeRouter)
router.use('/config', TimerConfigRouter)

module.exports = router
