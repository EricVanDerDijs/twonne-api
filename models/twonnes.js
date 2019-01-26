const { Schema } = require("../utils/orm")

// ======================|| IMPORTANT ||======================
// This model *MUST* be updated if the twonnes TABLE is ALTER-ed
// to keep model info consistant in the code
// ===========================================================
const Twonnes = new Schema('twonnes', {
  id: { 
    type: 'SERIAL', 
    constraint: 'PRIMARY KEY' 
  },
  content: { 
    type: 'VARCHAR(280)',
    constraint: 'NOT NULL' 
  },
  author: {
    type: 'INT',
    constraint: 'NOT NULL'
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

module.exports.Twonnes =  Twonnes;