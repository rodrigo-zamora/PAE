const PetController = require('../../../src/controllers/pet.controller');
const {NotFoundError} = require('../../../src/utils/errors');
const petsData = require('../../../src/data/pets.json');

/* const mockedData = {
  "pets": [
      {specie: 'Dog', gender: 'Male', name: 'Ruff', description: '...', url: 'https://www.petfinder.com/dog/ruff-48555420/il/batavia/starfish-animal-rescue-il599/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074', photo: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48555420/1/?bust=1595364732&width=300'},
      {specie: 'Dog', gender: 'Male', name: 'Red', description: '...', url: 'https://www.petfinder.com/dog/red-48550360/nc/raleigh/freedom-ride-rescue-nc1092/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074', photo: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48550360/2/?bust=1597342229&width=300'},
      {specie: 'Dog', gender: 'Female', name: 'Daisy Mea', description: '...', url: 'https://www.petfinder.com/dog/daisy-mea-48555066/mt/billings/help-for-homeless-pets-mt46/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074', photo: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48555066/2/?bust=1595362488&width=300'},
      {specie: 'Dog', gender: 'Female', name: 'Tia', description: '...', url: 'https://www.petfinder.com/dog/tia-48549696/tx/georgetown/williamson-county-regional-animal-shelter-tx993/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074', photo: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48549696/1/?bust=1595334565&width=300'}
  ]
}; */

const fileHelpers = jasmine.createSpyObj('MockedHelpers', ['save', 'get']);

describe('test', () => {
  let petController;
  beforeEach(() => {
    petController = new PetController(fileHelpers.save, fileHelpers.get);
  });

  it('hello', () => {
    petController.list();
    //console.log( petController.list());
    expect(2).toBe(2);
  });

  describe('list', () => {
    it('should return a list of all pets', () => {
      //Arrange
      const expectedRes = petsData;

      //Act
      const result = petController.list();

      //Assert
      expect(result).toEqual(expectedRes);
    });
  });

  describe('getIndex', () => {
    it('throw error with invalid index', () => {
      //Arrange
      const name = 'doesNotExist';
     
      //Act
      const fn = () => petController.getIndex(name);

      //Assert
      expect(fn).toThrowError();
    });

    it('should return the index of a pet', () => {
      // Arrange
      const name = 'Ruff';
      const expectedRes = petsData.findIndex(pet => pet.name === name);

      // Act
      const result = petController.getIndex(name);

      // Assert
      expect(result).toEqual(expectedRes);
    }); 
  });

  describe('get', () => {
    it('return the pet', () => {
      //Arrange
      const expectedRes = petsData[0];
      const name = petsData[0].name;

      //Act
      const result = petController.get(name);
  
      //Assert
      expect(result).toEqual(expectedRes);
    });

    it('throw error with empty string', () => {
      //Arrange
      const name = 'doesNotExist';

      //Act
      const fn = () => petController.get(name);
  
      //Assert
      expect(fn).toThrowError(NotFoundError, /doesNotExist/);
    });
  });

  describe('create', () => {
    it('create new pet', () => {
      // Arrange
     
  
      // Act


      // Assert
    });
  });

  describe('update', () => {
    it('update  pet', () => {
      // Arrange
     
  
      // Act


      // Assert
    });
  });

  describe('delete', () => {
    it('delete pet', () => {
      // Arrange
      const name = 'doesNotExist';
      // Act
      const fn = () => petController.delete(name);
      // Assert
      expect(fn).toThrowError();
    });
  });

});
