const { Router } = require('express')
const { Player } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const AttemptRouter = require('./attempts')
const { deleteAttemptsFromPlayer } = require('./attempts/manager')
const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Player.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:playerId', (req, res) => {
  try {
    res.status(200).json(Player.getById(req.params.playerId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const player = Player.create({ ...req.body })
    res.status(201).json(player)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:playerId', (req, res) => {
  try {
    res.status(200).json(Player.update(req.params.playerId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:playerId', (req, res) => {
  try {
    deleteAttemptsFromPlayer(req.params.playerId)
    Player.delete(req.params.playerId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:playerId/attempts', AttemptRouter)

module.exports = router