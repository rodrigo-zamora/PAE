const pets = require('../data/pets.json');
const {
  saveJSON,
  getJSON
} = require('../utils/fileHelpers');
const {
  NotFoundError
} = require('../utils/errors');
const res = require('express/lib/response');

class PetController {
  constructor(saverFunction = saveJSON, getterFunction = getJSON) {
    this.saverFunction = saverFunction;
    this.getterFunction = getterFunction;
  }

  list() {
    return pets;
  }

  getIndex(name) {
    const pets = this.getterFunction();
    return pets.findIndex(pet => pet.name == name);
  }

  get(name) {
    const petIndex = this.getIndex(name);
    const pets = this.getterFunction();
    const foundPet = pets[petIndex];
    if (foundPet) {
      return foundPet;
    } else {
      res.status(404);
      return new NotFoundError(`Pet ${name} not found`);
    }
  }

  create(pet) {
    const pets = this.getterFunction();
    pets.push(pet);
    this.saverFunction(pets);
    res.status(200);
    return pet;
  }

  update(name, petProperties) {
    const petIndex = this.getIndex(name);
    const pets = this.getterFunction();
    const foundPet = pets[petIndex];
    if (foundPet) {
      pets[petIndex] = {
        ...foundPet,
        ...petProperties
      };
      this.saverFunction(pets);
      res.status(200);
      return pets[petIndex];
    } else {
      res.status(404);
      return new NotFoundError(`pet with the name: ${name}`);
    }
  }

  delete(name) {
    const petIndex = this.getIndex(name);
    const pets = this.getterFunction();
    const foundPet = pets[petIndex];
    if (foundPet) {
      pets.splice(petIndex, 1);
      this.saverFunction(pets);
      res.status(200);
      return foundPet;
    } else {
      res.status(404);
      return new NotFoundError(`pet with the name: ${name}`);
    }
  }
};

module.exports = PetController;