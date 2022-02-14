const request = require('supertest');

const {
  restore,
  getJSON
} = require('../../src/utils/fileHelpers');
const app = require('../../src/app');
const endFunction = require('./helpers/supertest-jasmine');

afterAll(() => {
  console.log('RESTORING DATA');
  restore();
});

describe('/pets', () => {
  describe('GET', () => {
    it('should return a list of all pets', async ()  => {
      // Arrange
      const expected = getJSON();

      // Act
      request(app)
        .get('/pets')
        .set('Accept', 'application/json');

      const {status, body: pets} = await request(app)
        .get('/pets')
        .set('Accept', 'application/json');

      // Assert
      expect(status).toEqual(200);
      expect(pets).toEqual(expected);

    });
  });

  describe('POST', () => {
    it('200 OK with new pet', async () => {
      // Arrange
      const newPet = {
        name: 'Firulais',
        specie: 'Dog'
      };
      // Act
      await request(app)
        .post('/pets')
        .send(newPet)
        .set('Accept', 'application/json');

      const { status , body: obtainedPet } = await request(app)
        .get(`/pets/${newPet.name}`);

      console.log(obtainedPet);

      // Assert
      expect(status).toEqual(200);
      expect(obtainedPet).toEqual(newPet);

    });
  });

  describe('PUT', () => {
    it('200 OK with updated pet', async () => {
      // Arrange
      const updatedPet = {
        name: 'Firulais II',
        specie: 'Dog'
      };
      const name = 'Firulais';

      // Act
      await request(app)
        .put(`/pets/${name}`)
        .send(updatedPet)
        .set('Accept', 'application/json');
      
      const { status , body: obtainedPet } = await request(app)
        .get(`/pets/${updatedPet.name}`);

      // Assert
      expect(status).toEqual(200);
      expect(obtainedPet).toEqual(updatedPet);

      });
    });
});