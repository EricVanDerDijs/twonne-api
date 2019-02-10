// local imports
const { Followers } = require("../models/followers");
const { toSingleLine, setPlaceholders } = require("../utils/general");

// queries are functions that return a query string that has the expected 
// placeholders for node-pg
// @param placeholders:
//  {
//    key: placeholderString i.e.: '$1'
//  }

module.exports = {
  GET_FOLLOWS_ID: (placeholders) => {
    let query = toSingleLine`
      SELECT follows 
      FROM ${Followers.tableName} 
      WHERE user_id = user_id_ph`
    
    return setPlaceholders(query, placeholders);
  },

  GET_FOLLOWERS_ID: (placeholders) => {
    let query = toSingleLine`
      SELECT user_id 
      FROM ${Followers.tableName} 
      WHERE follows = follows_ph`
    
    return setPlaceholders(query, placeholders);
  }
}