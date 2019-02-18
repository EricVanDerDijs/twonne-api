//local imports
const { Twonnes } = require('../models/twonnes');
const followersQ = require('../queries/followers');
const twonnesQ = require('../queries/twonnes');
const { orderBy_toSQL } = require('../utils/general');
const { toSingleLine } = require('../utils/general');
const db = require('../config/database');

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
    if(!req.body.content){
      throw new Error('MISSING_REQUIRED_FIELDS');
    }
    // get data for new Twonne
    const newTwonneData = { 
      author: res.locals.payload.id,
      content: req.body.content
    }
    let newTwonne = await Twonnes.create( newTwonneData );
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
    if(!req.body.content){
      throw new Error('MISSING_REQUIRED_FIELDS');
    }
    const newTwonneData = { content: req.body.content };
    // get data from token
    const { role: userRole, id: userId } = res.locals.payload;
    // Superadmin and authors are able to edit twonnes
    if(userRole !== 'superadmin'){
      let twonneToUpdate = 
        await Twonnes.findById( req.params.id );
      twonneToUpdate = twonneToUpdate.rows[0];

      if(twonneToUpdate.author === userId){
        let updatedTwonne = 
          await Twonnes.updateById( req.params.id, newTwonneData );
        updatedTwonne = updatedTwonne.rows[0];
        res.status(200).json( updatedTwonne );
      } else {
        throw new Error('USER_NOT_ALLOWED');
      }
    } else {
      let updatedTwonne = 
        await Twonnes.updateById( req.params.id, newTwonneData );
      updatedTwonne = updatedTwonne.rows[0];
      res.status(200).json( updatedTwonne );
    }
  } catch (error) {
    next(error);
  }
}

module.exports.destroy = async (req, res, next) => {
  try {
    // get data from token
    const { role: userRole, id: userId } = res.locals.payload;
    // Superadmin and authors are able to edit twonnes
    if(userRole !== 'superadmin'){
      let twonneToDelete = 
        await Twonnes.findById( req.params.id );
      twonneToDelete = twonneToDelete.rows[0];

      if(twonneToDelete.author === userId){
        let deletedTwonne = 
          await Twonnes.deleteById( req.params.id );
        deletedTwonne = deletedTwonne.rows[0];
        res.status(200).json( deletedTwonne );
      } else {
        throw new Error('USER_NOT_ALLOWED');
      }
    } else {
      let deletedTwonne = 
        await Twonnes.deleteById( req.params.id );
      deletedTwonne = deletedTwonne.rows[0];
      res.status(200).json( deletedTwonne );
    }
  } catch (error) {
    next(error);
  }
}



module.exports.followsTwonnes = async (req, res, next) => {
  try {
    // get required data for db query
    const user_id = res.locals.payload.id;

    const GET_FOLLOWS_ID = 
      followersQ.GET_FOLLOWS_ID({user_id: '$1'});

    const GET_TWONNES_BY_AND_WITH_AUTHOR = 
      twonnesQ.GET_TWONNES_BY_AND_WITH_AUTHOR({users_id: GET_FOLLOWS_ID});

    // put together follos twones query
    const userFollowsQuery = toSingleLine`
      WITH follows_twonnes AS (
        ${GET_TWONNES_BY_AND_WITH_AUTHOR}
      )
      SELECT 
        id,
        content,
        follows_twonnes.created_at,
        follows_twonnes.updated_at,
        author, author_email,
        count(user_id) AS likes
      FROM follows_twonnes
      LEFT OUTER JOIN likes
      ON likes.twonne_id = follows_twonnes.id
      GROUP BY 
        id,
        content,
        follows_twonnes.created_at,
        follows_twonnes.updated_at,
        author,
        author_email
      ORDER BY follows_twonnes.created_at DESC;
    `;

    let followsTwonnes = 
      await db.query(userFollowsQuery, [user_id])

    res.status(200).json({ twonnes: followsTwonnes.rows });
  } catch (error) {
    next(error); // pass the error to error handler
  }
}