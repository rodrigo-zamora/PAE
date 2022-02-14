const PetController = require('../../../src/controllers/pet.controller');
const {NotFoundError} = require('../../../src/utils/errors');

const mockedData = {
  "pets": [
      {specie: 'Dog', gender: 'Male', name: 'Ruff', description: '...', url: 'https://www.petfinder.com/dog/ruff-48555420/il/batavia/starfish-animal-rescue-il599/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074', photo: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48555420/1/?bust=1595364732&width=300'},
      {specie: 'Dog', gender: 'Male', name: 'Red', description: '...', url: 'https://www.petfinder.com/dog/red-48550360/nc/raleigh/freedom-ride-rescue-nc1092/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074', photo: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48550360/2/?bust=1597342229&width=300'},
      {specie: 'Dog', gender: 'Female', name: 'Daisy Mea', description: '...', url: 'https://www.petfinder.com/dog/daisy-mea-48555066/mt/billings/help-for-homeless-pets-mt46/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074', photo: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48555066/2/?bust=1595362488&width=300'},
      {specie: 'Dog', gender: 'Female', name: 'Tia', description: '...', url: 'https://www.petfinder.com/dog/tia-48549696/tx/georgetown/williamson-county-regional-animal-shelter-tx993/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074', photo: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48549696/1/?bust=1595334565&width=300'}
  ]
};

const fileHelpers = jasmine.createSpyObj('MockedHelpers', ['save', 'get']);

describe('test', () => {
  let petController;
  beforeEach(() => {
    petController = new PetController(fileHelpers.save, fileHelpers.get);
  });

  it('hello', () => {
    petController.list();
    expect(2).toBe(2);
  });
});

describe('list', () => {
  let petController;
  beforeEach(() => {
    petController = new PetController(fileHelpers.save, fileHelpers.get);
  });
  it('should return all pets', () => {
    
  });
});