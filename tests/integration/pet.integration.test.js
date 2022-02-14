const request = require('supertest');

const {
  restore,
  getJSON
} = require('../../src/utils/fileHelpers');
const app = require('../../src/app');
const endFunction = require('./helpers/supertest-jasmine');

afterAll(() => {
  restore();
});

describe('/pets', () => {
  describe('GET', () => {
    it('should return a list of all pets', async () => {
      // Arrange
      const expected = getJSON();

      // Act
      request(app)
        .get('/pets')
        .set('Accept', 'application/json');

      const {
        status,
        body: pets
      } = await request(app)
        .get('/pets')
        .set('Accept', 'application/json');

      // Assert
      expect(status).toEqual(200);
      expect(pets).toEqual(expected);
    });
  });
});

describe('/pets/:name', () => {
  describe('GET', () => {
    it('should return a pet if it is found', async () => {
      // Arrange
      const expected = getJSON().find(pet => pet.name === 'Ruff');

      // Act
      const {
        status,
        body
      } = await request(app)
        .get('/pets/Ruff')
        .set('Accept', 'application/json');

      // Assert
      expect(status).toEqual(200);
      expect(body).toEqual(expected);
    });

    it('should return a 404 if the pet is not found', async () => {
      // Arrange
      const expected = {};

      // Act
      const {
        status,
        body
      } = await request(app)
        .get('/pets/unknown')
        .set('Accept', 'application/json');

      // Assert
      expect(status).toEqual(404);
      expect(body).toEqual(expected);
    });
  });

  describe('POST', () => {
    it('should create a new pet', async () => {
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

      const {
        status,
        body: obtainedPet
      } = await request(app)
        .get(`/pets/${newPet.name}`);

      // Assert
      expect(status).toEqual(200);
      expect(obtainedPet).toEqual(newPet);

    });
  });

  describe('PUT', () => {
    it('should update a pet', async () => {
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

      const {
        status,
        body: obtainedPet
      } = await request(app)
        .get(`/pets/${updatedPet.name}`);

      // Assert
      expect(status).toEqual(200);
      expect(obtainedPet).toEqual(updatedPet);

    });

    it('should return a 404 if the pet is not found', async () => {
      // Arrange
      const updatedPet = {
        name: 'Firulais II',
        specie: 'Dog'
      };
      const name = 'FirulaisNotFound';

      // Act
      const {
        status,
        body
      } = await request(app)
        .put(`/pets/${name}`)
        .send(updatedPet)
        .set('Accept', 'application/json');

      // Assert
      expect(status).toEqual(404);
      expect(body).toEqual({});
    });
  });

  describe('DELETE', () => {
    it('should delete a pet', async () => {
      // Arrange
      const name = 'Firulais II';

      // Act
      const {
        status,
        body: obtainedPet
      } = await request(app)
        .delete(`/pets/${name}`);

      // Assert
      expect(status).toEqual(200);
      expect(obtainedPet.name).toEqual(name);

    });

    it('should return a 404 if the pet is not found', async () => {
      // Arrange
      const name = 'FirulaisNotFound II';

      // Act
      const {
        status,
        body
      } = await request(app)
        .delete(`/pets/${name}`);

      // Assert
      expect(status).toEqual(404);
      expect(body).toEqual({});
    });
  });
});