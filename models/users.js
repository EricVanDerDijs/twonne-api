const { Schema } = require("../utils/orm")

// ======================|| IMPORTANT ||======================
// This model *MUST* be updated if the users TABLE is ALTER-ed
// to keep model info consistant in the code
// ===========================================================
const Users = new Schema('users', {
  id: { 
    type: 'SERIAL', 
    constraint: 'PRIMARY KEY' 
  },
  email: { 
    type: 'TEXT',
    constraint: 'NOT NULL UNIQUE' 
  },
  username: {
    type: 'VARCHAR(16)',
    constraint: 'NOT NULL UNIQUE'
  },
  password: {
    type: 'TEXT',
    constraint: 'NOT NULL'
  },
  role: {
    type: 'role',
    constraint: "NOT NULL DEFAULT 'user'"
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

module.exports.Users =  Users;