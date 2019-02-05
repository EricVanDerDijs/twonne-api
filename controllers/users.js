//local imports
const { Users } = require('../models/users');

module.exports.index = async (req, res, next) => {
  try {
    let users = await Users.findAll();
    res.status(200).json( users.rows )
  } catch (error) {
    next(error);
  }
}

module.exports.create = async (req, res, next) => {
  try {
    let newUser = await Users.create( req.body );
    res.status(200).json( newUser )
  } catch (error) {
    next(error);
  }
}

module.exports.read = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await Users.findById( id );
    user = user.rows[0];
    res.status(200).json( user )
  } catch (error) {
    next(error);
  }
}

module.exports.update = async (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedUser = await Users.updateById( id, req.body );
    updatedUser = updatedUser.rows[0];
    res.status(200).json( updatedUser )
  } catch (error) {
    next(error);
  }
}

module.exports.destroy = async (req, res, next) => {
  try {
    let id = req.params.id;
    let deletedUser = await Users.deleteById( id );
    deletedUser = deletedUser.rows[0];
    res.status(200).json( deletedUser )
  } catch (error) {
    next(error);
  }
}