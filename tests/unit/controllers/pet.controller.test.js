const PetController = require('../../../src/controllers/pet.controller');
const {
  NotFoundError
} = require('../../../src/utils/errors');

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
        specie: "Dog",
        gender: "Female",
        name: "Spark",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
      });
      expect(pet).toEqual({
        specie: "Dog",
        gender: "Female",
        name: "Spark",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
      });
    });
  });
  describe('update', () => {
    it('should update the pet', () => {
      const pet = petContoller.update('Spark', {
        specie: "Dog",
        gender: "Female",
        name: "Spark II",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
      });
      expect(pet).toEqual({
        specie: "Dog",
        gender: "Female",
        name: "Spark II",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
      });
    });
    it('should return an error if the pet is not found', () => {
      const name = 'NotFound';
      const pet = petContoller.update(name, {
        specie: "Dog",
        gender: "Female",
        name: "Spark II",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
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