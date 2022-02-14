const request = require('supertest');

const {
  restore,
  getJSON
} = require('../../src/utils/fileHelpers');
const app = require('../../src/app');
const endFunction = require('./helpers/supertest-jasmine');

afterEach(() => {
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
        name: 'perro',
        specie: 'Dog'
      };

      // Act
      await request(app)
        .post('/pets')
        .send(newPet)
        .set('Accept', 'application/json');

      const {
        status,
        body: pets
      } = await request(app)
        .get('/pets')
        .set('Accept', 'application/json');

      const foundPet = pets.find(pet => pet.name === 'net');

      // Assert
      expect(status).toEqual(200);
      expect(foundPet).toBe(true);

    });
  });
  /*describe('PUT', () => {
    it('200 OK with updated pet', async () => {
      // Arrange
      const updatedPet = {
        name: 'net',
        specie: 'Dog'
      };

      // Act
      await request(app)
        .put('/pets/perro')
        .send(updatedPet)
        .set('Accept', 'application/json');

      const {
        status,
        body: pets
      } = await request(app)
        .get('/pets')
        .set('Accept', 'application/json');

      const foundPet = pets.find(pet => pet.name === 'net');

      // Assert
      expect(status).toEqual(200);
      expect(foundPet).toEqual(updatedPet);

    });
  });*/
});