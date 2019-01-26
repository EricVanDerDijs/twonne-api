//local imports
const { Users } = require('../models/users');

module.exports.index = async (req, res) => {
  try {
    let users = await Users.findAll();
    res.json( users.rows )
  } catch (error) {
    res.json(error)
  }
}

module.exports.create = async (req, res) => {
  try {
    let newUser = await Users.create( req.body );
    res.json( newUser )
  } catch (error) {
    res.json( error )
  }
}

module.exports.read = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await Users.findById( id );
    user = user.rows[0];
    res.json( user )
  } catch (error) {
    res.json( error )
  }
}

module.exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    let updatedUser = await Users.updateById( id, req.body );
    updatedUser = updatedUser.rows[0];
    res.json( updatedUser )
  } catch (error) {
    res.json( error )
  }
}

module.exports.destroy = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedUser = await Users.deleteById( id );
    deletedUser = deletedUser.rows[0];
    res.json( deletedUser )
  } catch (error) {
    res.json( error )
  }
}