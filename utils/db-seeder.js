const 
  db = require("../config/database"),
  { Users } = require("../models/users"),
  { Twonnes } = require("../models/twonnes"),
  { Likes } = require("../models/likes"),
  { Followers } = require("../models/followes");

const fakeUsers = [
  { email: 'user_1@mail.com', username: 'user_1', password: '123456'  },
  { email: 'user_2@mail.com', username: 'user_2', password: '123456'  },
  { email: 'user_3@mail.com', username: 'user_3', password: '123456'  },
  { email: 'user_4@mail.com', username: 'user_4', password: '123456'  },
  { email: 'user_5@mail.com', username: 'user_5', password: '123456'  },
  { email: 'user_6@mail.com', username: 'user_6', password: '123456'  }
]

module.exports.createTables = async() => {

  // add role enum type
  try {
    await db.query( "CREATE TYPE role AS ENUM ('user','superuser','admin','superadmin');" );
    console.log('role type added !!');

  } catch (error) {
    if(error.routine === 'DefineEnum'){
      console.log('role type already exists');
    } else {
      throw error
    }
  }

  // order of creation matters due to references
  const models = [
    Users,
    Twonnes,
    Followers,
    Likes
  ]

  let results = [];

  for (const model of models){
    let result = await db.query( model.SQLTableCreate );
    results.push(result)
  }

  results = await Promise.all(results)

  return results

}

module.exports.seedDB = async() => {

  console.log('===== SEEDING =====');
  
  // delete all users
  let deletedUsers = await db.query(`DELETE FROM ${Users.tableName} RETURNING *`);
  console.log(`cleared ${Users.tableName} table (${deletedUsers.rowCount} entries) !!`);

  // delete all twonnes
  let deletedTwonnes = await db.query(`DELETE FROM ${Twonnes.tableName} RETURNING *`);
  console.log(`cleared ${Twonnes.tableName} table (${deletedTwonnes.rowCount} entries) !!`);

  // Seed users
  let newUsers = fakeUsers.map( async fakeUser => {
    let newUser = await Users.create( fakeUser );
    return newUser.rows[0]
  })

  newUsers = await Promise.all(newUsers);
  console.log(`${newUsers.length} users created !!`);

  // Seed twonnes
  let newTwonnes = newUsers.map( (user, index) => {
    if( index%2 === 0 ){
      let newTwonne = Twonnes.create({
        content: `1st twonne from ${user.username}`,
        author: user.id
      })
      return newTwonne;
    }
  })

  newTwonnes = await Promise.all(newTwonnes);
  console.log(`${newTwonnes.length} twonnes added !!`);

  console.log('==== END SEEDING =====');

}