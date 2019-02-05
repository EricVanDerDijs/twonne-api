// modules imports
const { Router } = require('express');
// local imports
const { 
  index,
  create,
  read,
  update,
  destroy
  } = require('../controllers/twonnes');
const { 
  tokenCheck,
  denyUser,
  denySuperUser,
  denyAdmin
} = require('../middleware/auth');
// local definitions
const router = Router();

// Index
router.get('/', tokenCheck, denyUser, denySuperUser, denyAdmin, index);

// Create
router.post('/', tokenCheck, denyUser, denySuperUser, denyAdmin, create);

// Read
router.get('/:id', tokenCheck, denyUser, denySuperUser, denyAdmin, read);

// Update
router.patch('/:id', tokenCheck, denyUser, denySuperUser, denyAdmin, update);

// Delete
router.delete('/:id', tokenCheck, denyUser, denySuperUser, denyAdmin, destroy);

module.exports = router;