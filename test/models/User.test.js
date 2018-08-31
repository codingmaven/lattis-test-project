const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const User = require('../../api/models/User');

let user;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  user = await User.build({
    username: 'martin',
    password: 'securepassword',
  }).save();
});

test('User is created correctly', async () => {
  const sendUser = user.toJSON();
  // check if user is created
  expect(user.username).toBe('martin');
  // check if password is not send to browser
  expect(sendUser.password).toBeFalsy();

  await user.destroy();
});

test('User is updated correctly', async () => {
  await user.update({
    username: 'peter',
  });

  expect(user.username).toBe('peter');

  await user.destroy();
});
