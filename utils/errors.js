const errors = {
  userAlreadyExists: {
    httpCode: 409,
    body: {
      code: '0001',
      message: 'A user has already registered with given username or email.',
    }
  },
  userNotFound: {
    httpCode: 404,
    body: {
      code: '0002',
      message: 'Email or username does not exists.',
    }
  },
  badCredentials: {
    httpCode: 403,
    body: {
      code: '0003',
      message: 'Your username/email or password is not correct.',
    }
  }
};

module.exports = errors;

