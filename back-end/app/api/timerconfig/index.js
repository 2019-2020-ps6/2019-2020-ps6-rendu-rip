const { Router } = require('express')
const { TimerConfig } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
      const config = TimerConfig.getById(0);
      res.status(200).json(config)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.put('/', (req, res) => {
  try {
    const config = TimerConfig.update(0, req.body);
    res.status(200).json(config)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
    try {
      const config = TimerConfig.create({ ...req.body })
      res.status(201).json(config)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.delete('/', (req, res) => {
    try {
      TimerConfig.delete(0)
      res.status(204).end()
    } catch (err) {
      manageAllErrors(res, err)
    }
})

module.exports = router