// module imports
const 
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");
// local imports
const 
  db = require("../config/database"),
  { Users } = require("../models/users"),
  { generateToken } = require("../utils/general");
// local definitions
const saltRounds = 5;

module.exports.signup = async (req, res, next) => {
  try {
    let { 
      username,
      email,
      password } = req.body;

      // TODO - username, email and password validation

    let users = 
      await db.query(`SELECT * FROM ${Users.tableName} WHERE username = $1 OR email = $2`,
        [username,email]);

    if(users.rows.length > 0){
      // throw error
      throw new Error("USER_ALREADY_EXISTS");

    } else {
      password = await bcrypt.hash(password, saltRounds);
      let newUser = await Users.create({ username, email, password });
      newUser = newUser.rows[0];

      const token = generateToken( newUser );

      const response = {
        user: {
          username,
          email,
          role: newUser.role
        },
        token
      }

      res.status(200).json( response );
    }

  } catch (error) {
    // pass error to error handler
    next(error);
  }
}

module.exports.signin = async (req, res, next) => {
  try {
    let { 
      identifier,
      password } = req.body;

    let users = 
      await db.query(`SELECT * FROM ${Users.tableName} WHERE username = $1 OR email = $2`,
        [identifier,identifier]);
        
    users = users.rows
    
    // user does not exists
    if( users.length === 0 ){
      // pass error to error handler
      throw new Error("USER_NOT_FOUND");
      
    } else {
      
      if( await bcrypt.compare( password, users[0].password ) ){
        const token = generateToken( users[0] );

        const response = {
          user: {
            username: users[0].username,
            email: users[0].email,
            role: users[0].role
          },
          token
        }

        res.status(200).json(response);
      } else { // wrong password
        throw new Error("BAD_CREDENTIALS");
      }

    }
  } catch (error) {
    // pass error to error handler
    next(error);
  }
}