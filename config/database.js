// modules imports
const { Pool }   = require("pg");
// local definitions
const dbUrl = process.env.DB_URL 
  || "postgres://pipboy2300:admin123@localhost:5432/twonneDB";

function Database() {
  // private variable
  let _conectionsPool;

  // public getter
  this.getPool = () => { return _conectionsPool };
  
  // connectDB work as setter por _connectionsPool
  this.connectDB = () => {
    _conectionsPool = new Pool({
      connectionString: dbUrl,
      max: 10
    });
  }

  // expose query function
  this.query = (text, params) => {
    return this.getPool().query(text, params);
  }

}

const db =  new Database();

module.exports = db;