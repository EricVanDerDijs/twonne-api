//local imports
const { Twonnes } = require('../models/twonnes');

module.exports.index = async (req, res) => {
  try {
    let twonnes = await Twonnes.findAll();
    res.json( twonnes.rows )
  } catch (error) {
    res.json(error)
  }
}

module.exports.create = async (req, res) => {
  try {
    let newTwonne = await Twonnes.create( req.body );
    res.json( newTwonne.rows[0] )
  } catch (error) {
    res.json( error )
  }
}

module.exports.read = async (req, res) => {
  try {
    let id = req.params.id;
    let twonne = await Twonnes.findById( id );
    twonne = twonne.rows[0];
    res.json( twonne )
  } catch (error) {
    res.json( error )
  }
}

module.exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    let updatedTwonne = await Twonnes.updateById( id, req.body );
    updatedTwonne = updatedTwonne.rows[0];
    res.json( updatedTwonne )
  } catch (error) {
    res.json( error )
  }
}

module.exports.destroy = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedTwonne = await Twonnes.deleteById( id );
    deletedTwonne = deletedTwonne.rows[0];
    res.json( deletedTwonne )
  } catch (error) {
    res.json( error )
  }
}