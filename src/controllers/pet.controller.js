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
    const index =  pets.findIndex(pet => pet.name == name);
    if(index) return index;  //throw new NotFoundError(`pet with the petname: ${name}`);
  }

  get(name) {
    const pets =  pets.find(pet => pet.name == name);
    if(pets) return pets;
    throw new NotFoundError(`pet with the petname: ${name}`);
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
    //return this.get(name);
    //throw new NotFoundError(`pet with the petname: ${name}`);
    const pets =  pets.find(pet => pet.name == name);
    if(pets) return pets;
    throw new NotFoundError(`pet with the petname: ${name}`);
  }

};

module.exports = PetController;
