// modules imports
const { Router } = require('express');
// local imports
const { 
  index,
  create,
  read,
  update,
  destroy
  } = require('../controllers/users');
// local definitions
const router = Router();

// Index
router.get('/', index);

// Create
router.post('/', create);

// Read
router.get('/:id', read);

// Update
router.patch('/:id', update);

// Delete
router.delete('/:id', destroy);

module.exports = router;