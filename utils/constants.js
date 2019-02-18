module.exports.e = {
  "USER_ALREADY_EXISTS": {
    httpCode: 409,
    code: '0001',
    description: 'A user has already registered with given username or email.'
  },
  "USER_NOT_FOUND": {
    httpCode: 404,
    code: '0002',
    description: 'Email or username does not exists.',
  },
  "BAD_CREDENTIALS": {
    httpCode: 403,
    code: '0003',
    description: 'Your username/email or password is not correct.',
  },
  "TOKEN_MISSING": {
    httpCode: 403,
    code: '0004',
    description: 'No token provided.',
  },
  "INVALID_TOKEN": {
    httpCode: 403,
    code: '0005',
    description: 'Token is not valid.',
  },
  "ROLE_NOT_ALLOWED": {
    httpCode: 403,
    code: '0006',
    description: 'Your user is not allowed to access this resource.',
  },
  "USER_NOT_ALLOWED": {
    httpCode: 403,
    code: '0007',
    description: 'Your user is not allowed to access this resource.',
  },
  "NO_SELF_FOLLOW": {
    httpCode: 400,
    code: '0008',
    description: 'A user is not able to follow itself',
  },
  "MISSING_REQUIRED_FIELDS": {
    httpCode: 400,
    code: '0009',
    description: 'Your request is missing some required fields',
  }
};

module.exports.DEFAULT_ERROR = {
  httpCode: 500,
  code: '0000',
  description: 'Something unexpectedly went wrong.',
}