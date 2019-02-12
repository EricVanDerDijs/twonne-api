// modules imports
const { Router } = require('express');
// local imports
const { 
  index,
  create,
  read,
  update,
  destroy,
  getFollows,
  getFollowers,
  toggleFollow
  } = require('../controllers/users');
const { 
  tokenCheck,
  denyUser,
  denySuperUser,
  denyAdmin
} = require('../middleware/auth');
// local definitions
const router = Router();


router.route('/:id/followers')
  // get user followers
  .get(tokenCheck, getFollowers);

router.route('/:id/follows')
  // get user follows
  .get(tokenCheck, getFollows);

router.route('/:id/follow')
  // follow/unfollow
  .post(tokenCheck, toggleFollow);

router.route('/:id')
  // Read
  .get(tokenCheck, read)
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