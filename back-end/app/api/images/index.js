const { Router } = require('express')

const { DefaultImage,  QuizImage, QuestionImage, 
  AnswerImage, UserImage} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

//------------------default
router.get('/default', (req, res) => {
  try {
    const dflt_img = DefaultImage.get();
    res.status(200).json(dflt_img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/default/:id', (req, res) => {
  try {
    const dflt_img = DefaultImage.getById(req.params.id);
    res.status(200).json(dflt_img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//------------------quizzes
router.get('/quizzes', (req, res) => {
  try {
    const imgs = QuizImage.get();
      res.status(200).json(imgs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/quizzes/:id', (req, res) => {
  try {
    const img = QuizImage.getById(req.params.id);
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
	}
})

router.post('/quizzes', (req, res) => {
  try {
    const img = QuizImage.create({...req.body});
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/quizzes/:id', (req, res) => {
  try {
    res.status(201).json(QuizImage.update(req.params.id, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/quizzes/:id', (req, res) => {
  try {
    QuizImage.delete(req.params.id)
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//------------------questions
router.get('/questions', (req, res) => {
  try {
    const imgs = QuizImage.get();
      res.status(200).json(imgs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/questions/:id', (req, res) => {
  try {
    const img = QuizImage.getById(req.params.id);
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
	}
})

router.post('/questions', (req, res) => {
  try {
    const img = QuestionImage.create({...req.body});
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/questions/:id', (req, res) => {
  try {
    res.status(201).json(QuestionImage.update(req.params.id, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/questions/:id', (req, res) => {
  try {
    QuestionImage.delete(req.params.id)
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err)
  }
})

//------------------answers
router.get('/answers', (req, res) => {
  try {
    const imgs = QuizImage.get();
      res.status(200).json(imgs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/answers/:id', (req, res) => {
  try {
    const img = QuizImage.getById(req.params.id);
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
	}
})

router.post('/answers', (req, res) => {
  try {
    const img = AnswerImage.create({...req.body});
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/answers/:id', (req, res) => {
  try {
    res.status(201).json(AnswerImage.update(req.params.id, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/answers/:id', (req, res) => {
  try {
    AnswerImage.delete(req.params.id)
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err)
  }
})


//------------------users
router.get('/users', (req, res) => {
  try {
    const imgs = QuizImage.get();
      res.status(200).json(imgs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/users/:id', (req, res) => {
  try {
    const img = QuizImage.getById(req.params.id);
    res.status(200).json(img)
  } catch (err) {
    manageAllErrors(res, err)
	}
})

router.post('/users', (req, res) => {
  try {
    const img = UserImage.create({...req.body});
    res.status(201).json(img)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/users/:id', (req, res) => {
  try {
    res.status(201).json(UserImage.update(req.params.id, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/users/:id', (req, res) => {
  try {
    UserImage.delete(req.params.id)
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router