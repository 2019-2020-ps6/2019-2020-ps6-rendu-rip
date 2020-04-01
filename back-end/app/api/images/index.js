const { Router } = require('express')

const { DefaultImage,  QuizImage, QuestionImage, 
  AnswerImage, UserImage} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

//------------------default images------------------//
//:::::::::::get all default images
router.get('/', (req, res) => {
  try {
    const dflt_img = DefaultImage.get();
    res.status(200).json(dflt_img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::get one default image - id = idImg
router.get('/:idImg', (req, res) => {
  try {
    const dflt_img = DefaultImage.getById(req.params.idImg);
    res.status(200).json(dflt_img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//------------------quiz images------------------//
//:::::::::::get all quiz images
router.get('/quiz', (req, res) => {
  try {
    const imgs = QuizImage.get();
      res.status(200).json(imgs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::get one quiz image - id = imgId
router.get('/quiz/:imgId', (req, res) => {
  try {
    const img = QuizImage.getById(req.params.imgId);
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
	}
})

//:::::::::::create a new quiz image
router.post('/quiz', (req, res) => {
  try {
    const img = QuizImage.create({...req.body});
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::modify one quiz image - id = imgId
router.put('/quiz/:imgId', (req, res) => {
  try {
    res.status(201).json(QuizImage.update(req.params.imgId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::delete one quiz image - id = imgId
router.delete('/quiz/:imgId', (req, res) => {
  try {
    QuizImage.delete(req.params.imgId)
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//------------------question images------------------//
//:::::::::::get all question images
router.get('/question', (req, res) => {
  try {
    const imgs = QuizImage.get();
      res.status(200).json(imgs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::get one question image - id = idImg
router.get('/question/:imgId', (req, res) => {
  try {
    const img = QuizImage.getById(req.params.imgId);
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
	}
})

//:::::::::::create a new question image
router.post('/question', (req, res) => {
  try {
    const img = QuestionImage.create({...req.body});
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::modify one question image - id = imgId
router.put('/question/:imgId', (req, res) => {
  try {
    res.status(201).json(QuestionImage.update(req.params.imgId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::delete one question image - id = imgId
router.delete('/question/:imgId', (req, res) => {
  try {
    QuestionImage.delete(req.params.imgId)
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//------------------answer images------------------//
//:::::::::::get all answer images
router.get('/answer', (req, res) => {
  try {
    const imgs = QuizImage.get();
      res.status(200).json(imgs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::get one answer image - id = imgId
router.get('/answer/:id', (req, res) => {
  try {
    const img = QuizImage.getById(req.params.imgId);
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
	}
})

//:::::::::::create a new answer image
router.post('/answer', (req, res) => {
  try {
    const img = AnswerImage.create({...req.body});
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::modify one answer image - id = imgId
router.put('/answer/:imgId', (req, res) => {
  try {
    res.status(201).json(AnswerImage.update(req.params.imgId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::delete one answer image - id = imgId
router.delete('/answer/:imgId', (req, res) => {
  try {
    AnswerImage.delete(req.params.imgId)
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err)
  }
})


//------------------user images------------------//
//:::::::::::get all user images
router.get('/user', (req, res) => {
  try {
    const imgs = QuizImage.get();
      res.status(200).json(imgs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::get one user image - id = imgId
router.get('/user/:imgId', (req, res) => {
  try {
    const img = QuizImage.getById(req.params.imgId);
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
	}
})

//:::::::::::create a new user image
router.post('/user', (req, res) => {
  try {
    const img = UserImage.create({...req.body});
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::modify one user image - id = imgId
router.put('/user/:imgId', (req, res) => {
  try {
    res.status(201).json(UserImage.update(req.params.imgId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//:::::::::::delete one user image - id = imgId
router.delete('/user/:imgId', (req, res) => {
  try {
    UserImage.delete(req.params.imgId)
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router