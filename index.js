require("dotenv").config();
// module imports
const 
  express = require("express"),
  bodyParser = require("body-parser");
// local imports
const
  db = require('./config/database'),
  { createTables, seedDB } = require('./utils/db-seeder');


const 
  app  = express(),
	port = process.env.PORT || 3000;

// App Config
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json({ limit: '5mb' }) );

// initialize DB
db.connectDB();

// Create tables
process.env.INIT_TABLES === 'true' && createTables()
  .then( results => {
    console.log(`${results.length} tables created!`);
    // Seed the DB
    process.env.SEED_DB === 'true' && seedDB();
  })


//=================
// ROUTERS
//=================
app.use("/users", 
	require("./routes/users"));

app.use("/twonnes", 
  require("./routes/twonnes"));
  
app.use("/", 
	require("./routes/authentication"));

// ------ Server Start -----
app.listen(port, function(req, res){
	console.log("magic happens at: " + port);
});