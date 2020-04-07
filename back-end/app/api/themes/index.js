const { Router } = require('express')
const { Theme } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const router = new Router()

router.get('/', (req, res) => {
    try {
      const themes = Theme.get();
      res.status(200).json(themes)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.get('/:themeId', (req, res) => {
    try {
      const theme = Theme.getById(req.params.themeId)
      res.status(200).json(theme)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
      const theme = Theme.create({ ...req.body })
      console.log('le theme est: '+ theme);
      res.status(201).json(theme)
    } catch (err) {
      manageAllErrors(res, err)
    }
})

router.delete('/:themeId', (req, res) => {
    try {
      Theme.delete(req.params.themeId)
      res.status(204).end()
    } catch (err) {
      manageAllErrors(res, err)
    }
})


module.exports = router