// local imports
const { Twonnes } = require("../models/twonnes");
const { toSingleLine, setPlaceholders } = require("../utils/general");

// queries are functions that return a query string that has the expected 
// placeholders for node-pg
// @param placeholders:
//  {
//    key: placeholderString i.e.: '$1'
//  }

module.exports = {
  GET_TWONNES_BY_AND_WITH_AUTHOR: (placeholders) => {
    let query = toSingleLine`
      SELECT
        twonnes.id, 
        twonnes.content, 
        twonnes.created_at, 
        twonnes.updated_at, 
        users.username AS author, 
        users.email AS author_email 
      FROM ${Twonnes.tableName} 
      JOIN users 
      ON twonnes.author = users.id
      WHERE author IN ( users_id_ph )
    `;
    
    return setPlaceholders(query, placeholders);
  },

  GET_TWONNES_BY_ID_WITH_AUTHOR: (placeholders) => {
    let query = toSingleLine`
      SELECT
        twonnes.id, 
        twonnes.content, 
        twonnes.created_at, 
        twonnes.updated_at, 
        users.username AS author, 
        users.email AS author_email 
      FROM ${Twonnes.tableName} 
      JOIN users 
      ON twonnes.author = users.id
      WHERE twonnes.id = twonne_id_ph
    `;
    
    return setPlaceholders(query, placeholders);
  },
}