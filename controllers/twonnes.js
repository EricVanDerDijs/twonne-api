//local imports
const { Twonnes } = require('../models/twonnes');

module.exports.index = async (req, res, next) => {
  try {
    let twonnes = await Twonnes.find();
    res.status(200).json( twonnes.rows );
  } catch (error) {
    next(error);
  }
}

module.exports.create = async (req, res, next) => {
  try {
    let newTwonne = await Twonnes.create( req.body );
    res.status(200).json( newTwonne.rows[0] );
  } catch (error) {
    next(error);
  }
}

module.exports.read = async (req, res, next) => {
  try {
    let id = req.params.id;
    let twonne = await Twonnes.findById( id );
    twonne = twonne.rows[0];
    res.status(200).json( twonne );
  } catch (error) {
    next(error);
  }
}

module.exports.update = async (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedTwonne = await Twonnes.updateById( id, req.body );
    updatedTwonne = updatedTwonne.rows[0];
    res.status(200).json( updatedTwonne );
  } catch (error) {
    next(error);
  }
}

module.exports.destroy = async (req, res, next) => {
  try {
    let id = req.params.id;
    let deletedTwonne = await Twonnes.deleteById( id );
    deletedTwonne = deletedTwonne.rows[0];
    res.status(200).json( deletedTwonne );
  } catch (error) {
    next(error);
  }
}



module.exports.followsTwonnes = async (req, res, next) => {
  try {
    if( req.params.user_id === res.locals.payload.id ){
      // get required data for db request
      const GET_FOLLOWS_ID = followersQ.GET_FOLLOWS_ID({user_id: '$1'});
      const orderBy = req.query.sort ? 
        orderBy_toSQL(req.query.sort) : ['created_at DESC'];

      let followsTwonnes = 
        await Twonnes.find({
          select: ['*'],
          where: [`author IN (${GET_FOLLOWS_ID})`],
          orderBy: orderBy
        }, [req.params.user_id]);

      res.status(200).json({ twonnes: followsTwonnes.rows });

    } else {
      throw new Error('USER_NOT_ALLOWED');
    }
  } catch (error) {
    next(error); // pass the error to error handler
  }
}