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
    const petIndex = this.getIndex(name);
    pets[petIndex] = petProperties;
    this.saverFunction(pets);
    if (pets[petIndex] >= 0) return pets[petIndex];
    throw new NotFoundError(`pet with the petname: ${name}`);
  }

  delete(name) {
    const pets = this.getterFunction();
    const petIndex = this.getIndex(name);
    const copyPet = {...pets[petIndex]};
    if(pets[petIndex]>=0){
      delete pets[petIndex];
      return copyPet;
    }
    throw new NotFoundError(`pet with the petname: ${name}`);
  }

  getPet(name) {
    const pets = this.getterFunction();
    const petIndex = this.getIndex(name);
    if(pets[petIndex]>=0){
      return pets[petIndex];
    } else {
      throw new NotFoundError(`pet with the petname: ${name}`);
    }
  }

};

module.exports = PetController;
