//local imports
const { Users } = require('../models/users');
const followersQ = require('../queries/followers');
const { orderBy_toSQL } = require('../utils/general');

module.exports.index = async (req, res, next) => {
  try {
    let users = await Users.find();
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

module.exports.getFollows = async (req, res, next) => {
  try {
    if( req.params.id === res.locals.payload.id ){
      // get required data for db request
      const GET_FOLLOWS_ID = followersQ.GET_FOLLOWS_ID({user_id: '$1'});
      const orderBy = req.query.sort ? 
        orderBy_toSQL(req.query.sort) : ['username DESC'];

      let userFollows = 
        await Users.find({
          select: ['id', 'username', 'email'],
          where: [`id IN (${GET_FOLLOWS_ID})`],
          orderBy: orderBy
        }, [req.params.id]);

        res.status(200).json({ follows: userFollows.rows });

    } else {
      throw new Error('USER_NOT_ALLOWED'); 
    }
  } catch (error) {
    next(error); // pass the error to error handler
  }
}

module.exports.getFollowers = async (req, res, next) => {
  try {
    if( req.params.id === res.locals.payload.id ){
      // get required data for db request
      const GET_FOLLOWERS_ID = followersQ.GET_FOLLOWERS_ID({follows: '$1'});
      const orderBy = req.query.sort ? 
        orderBy_toSQL(req.query.sort) : ['username DESC'];

      let userFollowers = 
        await Users.find({
          select: ['id', 'username', 'email'],
          where: [`id IN (${GET_FOLLOWERS_ID})`],
          orderBy: orderBy
        }, [req.params.id]);

        res.status(200).json({ followers: userFollowers.rows });
        
    } else {
      throw new Error('USER_NOT_ALLOWED'); 
    }
  } catch (error) {
    next(error); // pass the error to error handler
  }
}

