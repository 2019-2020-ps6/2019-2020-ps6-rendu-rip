const { Router } = require('express')
const { Attempt } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')

const { filterAttemptsFromUsers, getAttemptFromUser } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    console.log(req.params.userId)
    const userAttempts = filterAttemptsFromUsers(req.params.userId)
    console.log(userAttempts)
    res.status(200).json(userAttempts)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:attemptId', (req, res) => {
  try {
    const specificAttempt = getAttemptFromUser(req.params.userId,req.params.attemptId)
    res.status(200).json(specificAttempt)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const attempt = Attempt.create({ ...req.body })
    console.log(attempt)
    res.status(201).json(attempt)
  } catch (err) {
    // console.log(...req.body.userId)
    manageAllErrors(res, err)
  }
})

router.put('/:attemptId', (req, res) => {
  try {
    res.status(200).json(Attempt.update(req.params.attemptId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:attemptId', (req, res) => {
  try {
    Attempt.delete(req.params.attemptId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router