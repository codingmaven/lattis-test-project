const request = require('supertest');
const {
  beforeAction,
  afterAction,
  createTestUser,
  clearTestUser,
  getAuthToken,
} = require('../setup/_setup');
// const Lock = require('../../api/models/Lock');

let api;

const TEST_LOCK = {
  name: 'testlock',
};

beforeAll(async () => {
  api = await beforeAction();
  await createTestUser();
});

afterAll(async () => {
  afterAction();
  await clearTestUser();
});

test('Lock | e2e test', async () => {
  const token = await getAuthToken(api);

  const res = await request(api)
    .post('/api/locks')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(TEST_LOCK)
    .expect(200);

  expect(res.body.lock).toBeTruthy();
  expect(res.body.lock.name).toBe(TEST_LOCK.name);
  const { lock } = res.body;

  // Shouldn't allow duplicate name
  await request(api)
    .post('/api/locks')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(TEST_LOCK)
    .expect(400);

  // Get locks
  const res2 = await request(api)
    .get('/api/locks')
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(200);

  expect(res2.body.locks).toBeTruthy();
  expect(res2.body.locks.length).toBe(1);

  // Get lock by id
  const res3 = await request(api)
    .get(`/api/locks/${lock.id}`)
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(200);

  expect(res3.body.lock).toBeTruthy();
  expect(res3.body.lock.name).toBe(lock.name);

  // Get lock by macId
  const res4 = await request(api)
    .get(`/api/locks/macid/${lock.macId}`)
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(200);

  expect(res4.body.lock).toBeTruthy();
  expect(res4.body.lock.name).toBe(lock.name);

  // update lock by id
  const res5 = await request(api)
    .patch(`/api/locks/${lock.id}`)
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ name: 'updated' })
    .expect(200);

  expect(res5.body.lock).toBeTruthy();
  expect(res5.body.lock.name).toBe('updated');

  // delete lock by id
  const res6 = await request(api)
    .delete(`/api/locks/${lock.id}`)
    .set('Accept', /json/)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .expect(200);

  expect(res6.body.success).toBe(true);
});
