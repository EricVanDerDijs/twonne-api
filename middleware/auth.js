// module imports
const jwt = require("jsonwebtoken");

module.exports.tokenCheck =  function(req, res, next) {
  const token = req.get('x-access-token');

  if (!token){
    throw new Error("TOKEN_MISSING")

  } else {
    try {
      res.locals.payload = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      next(new Error("INVALID_TOKEN"));
    }
  }

}

module.exports.denyUser =  function(req, res, next) {
  if( res.locals.payload && res.locals.payload.role !== 'user' ) {
    next();
  } else {
    next( new Error("ROLE_NOT_ALLOWED"));
  }
}

module.exports.denySuperUser =  function(req, res, next) {
  if( res.locals.payload && res.locals.payload.role !== 'superuser' ) {
    next();
  } else {
    next( new Error("ROLE_NOT_ALLOWED"));
  }
}

module.exports.denyAdmin =  function(req, res, next) {
  if( res.locals.payload && res.locals.payload.role !== 'admin' ) {
    next();
  } else {
    next( new Error("ROLE_NOT_ALLOWED"));
  }
}

module.exports.denySuperAdmin =  function(req, res, next) {
  if( res.locals.payload && res.locals.payload.role !== 'superadmin' ) {
    next();
  } else {
    next( new Error("ROLE_NOT_ALLOWED"));
  }
}