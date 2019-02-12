const jwt = require("jsonwebtoken");

module.exports.toSingleLine = (literals, ...values) => {
  // concatenate template
  let single_line_string = 
    values.reduce((acum, cString, i)=> (acum + literals[i] + cString), '')
  single_line_string += literals[values.length];

  // remove carriage returns and new lines
  single_line_string = single_line_string.replace(/(?:\r\n|\n|\r)/gm, '');

  // remove identations and extra spaces
  single_line_string = single_line_string.replace(/(\s{2,}|\t)/g, ' ');

  // and trim the result
  return single_line_string.trim();;
}

// set defined placeholders
// @param query: query string
// @param placeholders: placeholders objects to be replaced on
// the final query needed for node-pg to prevent SQLinjection
module.exports.setPlaceholders = (query, placeholders) => {
  for (let ph in placeholders){
    query = query.replace(`${ph}_ph`, placeholders[ph]);
  }

  return query;
}

module.exports.orderBy_toSQL = (queryParamString) => {
  let orderBy = queryParamString.split(',').map((expression) => {
    if(expression.charAt(0) === '-'){
      expression = expression.substring(1);
      return expression + 'DESC'
    } else {
      return expression
    }
  })

  return orderBy
}

module.exports.generateToken = (user) => {
  return jwt.sign( 
    { // payload
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.SECRET, // secret
    { expiresIn: '1 days' } // expiration time
  )
}