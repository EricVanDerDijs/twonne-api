// modules imports
const { Router } = require('express');
// local imports
const { 
  index,
  create,
  read,
  update,
  destroy,
  userFollows,
  userFollowers
  } = require('../controllers/users');
const { 
  tokenCheck,
  denyUser,
  denySuperUser,
  denyAdmin
} = require('../middleware/auth');
// local definitions
const router = Router();

router.route('/:id/follows')
  .get(tokenCheck, userFollows);

router.route('/:id/followers')
  .get(tokenCheck, userFollowers);

router.route('/:id')
  // Read
  .get(tokenCheck, denyUser, denySuperUser, denyAdmin, read)
  // Update
  .patch(tokenCheck, denyUser, denySuperUser, denyAdmin, update)
  // Delete
  .delete(tokenCheck, denyUser, denySuperUser, denyAdmin, destroy);

router.route('/')
  // Index
  .get(tokenCheck, denyUser, denySuperUser, denyAdmin, index)
  // Create
  .post(tokenCheck, denyUser, denySuperUser, denyAdmin, create);


module.exports = router;