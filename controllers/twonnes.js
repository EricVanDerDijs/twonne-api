//local imports
const { Twonnes } = require('../models/twonnes');

module.exports.index = async (req, res) => {
  try {
    let twonnes = await Twonnes.findAll();
    res.send( twonnes.rows )
  } catch (error) {
    res.send(error)
  }
}

module.exports.create = async (req, res) => {
  try {
    let newTwonne = await Twonnes.create( req.body );
    res.send( newTwonne.rows[0] )
  } catch (error) {
    res.send( error )
  }
}

module.exports.read = async (req, res) => {
  try {
    let id = req.params.id;
    let twonne = await Twonnes.findById( id );
    twonne = twonne.rows[0];
    res.send( twonne )
  } catch (error) {
    res.send( error )
  }
}

module.exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    let updatedTwonne = await Twonnes.updateById( id, req.body );
    updatedTwonne = updatedTwonne.rows[0];
    res.send( updatedTwonne )
  } catch (error) {
    res.send( error )
  }
}

module.exports.destroy = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedTwonne = await Twonnes.deleteById( id );
    deletedTwonne = deletedTwonne.rows[0];
    res.send( deletedTwonne )
  } catch (error) {
    res.send( error )
  }
}