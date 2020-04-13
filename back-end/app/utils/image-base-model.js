const Joi = require('joi')
const BaseModel = require('./base-model.js')
const manageAllErrors = require('./routes/error-management')

const schema = {
  url: Joi.string(),
  name: Joi.string(),
  type: Joi.string()
}

//inherit from BaseModel
class ImageBaseModel extends BaseModel {
  constructor(name) {
    if(!name) throw new Error('You must provide a name in constructor of ImageBaseModel')
    super(name, schema)
  }


  

/*//:::::::::::get one image
  getById(id) {
    try {
      const img = super.getById(id);
      res.status(200).json(img)
    } catch (err) {
      manageAllErrors(res, err)
    }
  }

//:::::::::::create a new image
  create(body) {
    try {
      const img = super.create({...body});
      res.status(201).json(img)
    } catch (err) {
      manageAllErrors(res, err)
    }
  }

//:::::::::::modify one image
  update(id, body) {
    try {
      res.status(201).json(super.update(id, body))
    } catch (err) {
      manageAllErrors(res, err)
    }
  }

//:::::::::::delete one image
  delete(id){
    try {
      super.delete(id)
      res.status(204).end();
    } catch (err) {
      manageAllErrors(res, err)
    }
  }*/
}

module.exports = ImageBaseModel