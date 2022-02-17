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

describe('/', () => {
  it('should return "Hello World!!!"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World!!!');
  });
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
        specie: "Dog",
        gender: "Female",
        name: "Spark",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
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
    it('should return 404 if the pet is incomplete', async () => {
      // Arrange
      const newPet = {
        specie: "Dog",
        gender: "Female",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
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
      expect(status).toEqual(404);
      expect(obtainedPet).toEqual({});
      
    });
  });

  describe('PUT', () => {
    it('should update a pet', async () => {
      // Arrange
      const updatedPet = {
        specie: "Dog",
        gender: "Female",
        name: "Spark II",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
    };
      const name = 'Spark';

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
        specie: "Dog",
        gender: "Female",
        name: "Spark II",
        description: "Hi there, my name is Sparkly Spark, my age is at 10-month-old Spayed female with Samoyed, Siberian husky, and a bit of shepherd breed in me...",
        url: "https://www.petfinder.com/dog/spark-54652919/ca/san-juan-bautista/harperhuskyhouse-ca2442/",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/54652919/1/?bust=1645081307&width=300"
    };
      const name = 'SparkNotFound';

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
      const name = 'Spark II';

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
      const name = 'SparkNotFound II';

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