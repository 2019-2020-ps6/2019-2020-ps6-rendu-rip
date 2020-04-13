const { Router } = require('express')
const { DefaultImage, QuizImage, QuestionImage, AnswerImage, UserImage } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

getImageStruct = (type) => {
  switch(type) {
    case "quiz": return QuizImage
    case "question": return QuestionImage
    case "answer": return AnswerImage
    case "user": return UserImage
    default: return DefaultImage
  }
}

//:::::::::::get all images
router.get('/:type', (req, res) => {
  let imageStruct = getImageStruct(req.params.type)
  try {
    const img = imageStruct.get()
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::get one image
router.get('/:type/:id', (req, res) => {
  let imageStruct = getImageStruct(req.params.type)
  try {
    const img = imageStruct.getById(req.params.id)
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::create one image
router.post('/:type', (req, res) => {
  let imageStruct = getImageStruct(req.params.type)
  //if(imageStruct == DefaultImage) res.status(404).end()
  try {
    const img = imageStruct.create({...req.body})
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::modify one image
router.put('/:type/:id', (req, res) => {
  let imageStruct = getImageStruct(req.params.type)
  //if(imageStruct == DefaultImage) res.status(404).end()
  try {
    const img = imageStruct.update(req.params.id, req.body)
    res.status(200).json(img)//ou 201??
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::delete one image
router.delete('/:type/:id', (req, res) => {
  let imageStruct = getImageStruct(req.params.type)
  if(imageStruct == DefaultImage) res.status(404).end()
  try {
    const img = imageStruct.delete(req.params.id)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router