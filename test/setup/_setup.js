const bodyParser = require('body-parser');
const express = require('express');
const routes = require('../../api/routes/routes');
const request = require('supertest');

const database = require('../../api/config/database');
const User = require('../../api/models/User');

const TEST_USER = {
  username: 'martin',
  password: 'securepassword',
};

const beforeAction = async () => {
  const testapp = express();

  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());


  testapp.use('/api', routes);


  await database.authenticate();
  await database.drop();
  await database.sync().then(() => console.log('Connection to the database has been established successfully'));

  return testapp;
};

const afterAction = async () => {
  await database.close();
};

const createTestUser = async () => {
  await User.create(TEST_USER);
};

const clearTestUser = async () => {
  await User.findOneAndRemove({
    username: TEST_USER.username,
  });
};

const getAuthToken = async (api) => {
  const res = await request(api)
    .post('/api/login')
    .set('Accept', /json/)
    .send(TEST_USER)
    .expect(200);

  return res.body.token;
};

module.exports = {
  beforeAction,
  afterAction,
  createTestUser,
  clearTestUser,
  getAuthToken,
  TEST_USER,
};
