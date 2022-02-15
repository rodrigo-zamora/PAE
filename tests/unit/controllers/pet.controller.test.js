const PetController = require('../../../src/controllers/pet.controller');
const { NotFoundError } = require('../../../src/utils/errors');

const fileHelpers = jasmine.createSpyObj('MockedHelpers', ['save', 'get'])

describe('PetController', () => {
  let petContoller;
  beforeEach(() => {
    petContoller = new PetController(fileHelpers.save, fileHelpers.get);
  });
  describe('list', () => {
    it('should return an array of pets', () => {
      // Arrange
      fileHelpers.get.and.returnValue(require('../../../src/data/pets.json'));
      // Act
      const pets = petContoller.list();
      // Assert
      expect(pets).toEqual(require('../../../src/data/pets.json'));
    });
  });
  describe('getIndex', () => {
    it('should return the index of the pet', () => {
      const index = petContoller.getIndex('Ruff');
      expect(index).toBe(0);
    });
    it('should return -1 if the pet is not found', () => {
      const index = petContoller.getIndex('NotFound');
      expect(index).toBe(-1);
    });
  });
  describe('get', () => {
    it('should return the pet', () => {
      const pet = petContoller.get('Ruff');
      expect(pet).toEqual(require('../../../src/data/pets.json')[0]);
    });
    it('should return an error if the pet is not found', () => {
      const name = 'NotFound';
      const pet = petContoller.get(name);
      expect(pet).toEqual(new NotFoundError(`Pet ${name} not found`));
    });
  });
  describe('create', () => {
    it('should create a new pet', () => {
      const pet = petContoller.create({
        name: 'Firulais I',
        specie: 'Dog'
      });
      expect(pet).toEqual({
        name: 'Firulais I',
        specie: 'Dog'
      });
    });
  });
  describe('update', () => {
    it('should update the pet', () => {
      const pet = petContoller.update('Firulais I', {
        name: 'Firulais III',
        specie: 'Cat'
      });
      expect(pet).toEqual({
        name: 'Firulais III',
        specie: 'Cat'
      });
    });
    it('should return an error if the pet is not found', () => {
      const name = 'NotFound';
      const pet = petContoller.update(name, {
        name: 'Firulais III',
        specie: 'Cat'
      });
      expect(pet).toEqual(new NotFoundError(`pet with the name: ${name}`));
    });
  });
  describe('delete', () => {
    it('should delete the pet', () => {
      const toBeDeleted = require('../../../src/data/pets.json')[0];
      const pet = petContoller.delete('Ruff');
      expect(pet).toEqual(toBeDeleted);
    });
    it('should return an error if the pet is not found', () => {
      const name = 'NotFound';
      const pet = petContoller.delete(name);
      expect(pet).toEqual(new NotFoundError(`pet with the name: ${name}`));
    });
  });
});