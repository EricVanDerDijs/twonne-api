//local imports
const { Users } = require('../models/users');

module.exports.index = async (req, res) => {
  try {
    let users = await Users.findAll();
    res.send( users.rows )
  } catch (error) {
    res.send(error)
  }
}

module.exports.create = async (req, res) => {
  try {
    let newUser = await Users.create( req.body );
    res.send( newUser )
  } catch (error) {
    res.send( error )
  }
}

module.exports.read = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await Users.findById( id );
    user = user.rows[0];
    res.send( user )
  } catch (error) {
    res.send( error )
  }
}

module.exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    let updatedUser = await Users.updateById( id, req.body );
    updatedUser = updatedUser.rows[0];
    res.send( updatedUser )
  } catch (error) {
    res.send( error )
  }
}

module.exports.destroy = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedUser = await Users.deleteById( id );
    deletedUser = deletedUser.rows[0];
    res.send( deletedUser )
  } catch (error) {
    res.send( error )
  }
}