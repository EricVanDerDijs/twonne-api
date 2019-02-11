// modules imports
const { Router } = require('express');
// local imports
const { 
  index,
  create,
  read,
  update,
  destroy,
  followsTwonnes
  } = require('../controllers/twonnes');
const { 
  tokenCheck,
  denyUser,
  denySuperUser,
  denyAdmin
} = require('../middleware/auth');
// local definitions
const router = Router();

router.route('/follows/:user_id')
  .get(tokenCheck, followsTwonnes);

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