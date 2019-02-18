// local imports
const { Likes } = require("../models/likes");
const { toSingleLine, setPlaceholders } = require("../utils/general");

// queries are functions that return a query string that has the expected 
// placeholders for node-pg
// @param placeholders:
//  {
//    key: placeholderString i.e.: '$1'
//  }

module.exports = {
  GET_USERS_ID_FROM_LIKES: (placeholders) => {
    let query = toSingleLine`
      SELECT user_id 
      FROM ${Likes.tableName} 
      WHERE twonne_id = twonne_id_ph`
    
    return setPlaceholders(query, placeholders);
  },
}