// modules imports
const { Router } = require('express');
// local imports
const { 
  index,
  create,
  read,
  update,
  destroy,
  followsTwonnes,
  toggleLike
  } = require('../controllers/twonnes');
const { 
  tokenCheck,
  denyUser,
  denySuperUser,
  denyAdmin
} = require('../middleware/auth');
// local definitions
const router = Router();

router.route('/:id/like')
  .post(tokenCheck, toggleLike);

router.route('/follows')
  .get(tokenCheck, followsTwonnes);

router.route('/:id')
  // Read
  .get(tokenCheck, read)
  // Update
  .patch(tokenCheck, update)
  // Delete
  .delete(tokenCheck, destroy);

router.route('/')
  // Index
  .get(tokenCheck, denyUser, denySuperUser, denyAdmin, index)
  // Create
  .post(tokenCheck, create);

module.exports = router;