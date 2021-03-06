const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const PetController = require('../controllers/pet.controller');
const petController = new PetController();
const { updateSchema, createSchema } = require('../../models/schemas/pets');

// path prefix /pets

// GET pets
router.get('/', handleError((req, res) => {
  res.send(petController.list());
}));

// GET pets/:name
router.get('/:name', handleError((req, res) => {
  const { params: {name}} = req;
  res.send(petController.get(name));
}));

// POST pets/
router.post('/', handleError((req, res, next) => {
  const {body} = req;
  const {error} = createSchema.validate(body);
  if(error) return next(error);
  res.send(petController.create(body));
}));

// PUT pets/:name
router.put('/:name', handleError((req, res, next) => {
  const {body, params: {name}} = req;
  const {error} = createSchema.validate(body);
  if(error) return next(error);
  res.send(petController.update(name, body));
}));

// DELETE pets/:name
router.delete('/:name', handleError((req, res) => {
  const {params: {name}} = req;
  res.send(petController.delete(name));
}));

module.exports = router;
