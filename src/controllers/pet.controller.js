const pets = require('../data/pets.json');
const {saveJSON, getJSON} = require('../utils/fileHelpers');
const {NotFoundError} = require('../utils/errors');

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
    const foundPet = pets.find(pet => pet.name == name);
    if(foundPet) return foundPet;
    throw new NotFoundError(`pet with the name: ${name}`);
  }

  create(pet) {
    const pets = this.getterFunction();
    pets.push(pet);
    this.saverFunction(pets);
    return pet;
  }

  update(name, petProperties) {
    const pets = this.getterFunction();
    const toBeUpdated = this.getPet(name);
    const petIndex = this.getIndex(name);
    const updatedPet = {...toBeUpdated, ...petProperties};
    pets[petIndex] = updatedPet;
    this.saverFunction(pets);
    return updatedPet;
  }

  delete(name) {
    const pets = this.getterFunction();
    const toBeDeleted = this.getPet(name);
    const petIndex = this.getIndex(name);
    pets.splice(petIndex, 1);
    this.saverFunction(pets);
    return toBeDeleted;
  }

  getPet(name) {
    const pets = this.getterFunction();
    const foundPet = pets.find(pet => pet.name == name);
    if (foundPet) return foundPet;
    throw new NotFoundError(`pet with the name: ${name}`);
  }
};

module.exports = PetController;
