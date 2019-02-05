const 
  { Schema } = require("../utils/orm"),
  { Users } = require("./users");


// ======================|| IMPORTANT ||======================
// This model *MUST* be updated if the users TABLE is ALTER-ed
// to keep model info consistant in the code
// ===========================================================
const Followers = new Schema('followers', {
  user_id: { 
    type: 'INT', 
    constraint: `REFERENCES ${Users.tableName} ON DELETE CASCADE`
  },
  follows: { 
    type: 'INT',
    constraint: `REFERENCES ${Users.tableName} ON DELETE CASCADE`
  },
  created_at: {
    type: 'TIMESTAMPTZ',
    constraint: 'NOT NULL DEFAULT NOW()'
  },
  updated_at: {
    type: 'TIMESTAMPTZ',
    constraint: 'NOT NULL DEFAULT NOW()'
  }
})

module.exports.Followers =  Followers;