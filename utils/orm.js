const db = require("../config/database");
const { toSingleLine } = require('../utils/general');

generateSQLTableCreate = (tableName, model) => {
  let columnDeclarations = [];

  // map de model to generate all the columns declarations
  columnDeclarations =
    Object.keys(model).map( key => {
      // initialize type as empty string
      let type = '';
      
      if(model[key].type) { type = model[key].type; }
      
      else {
        throw new Error('Missing type on table column declaration');
      }

      let constraint = model[key].constraint || '';

      return `${key} ${type} ${constraint}`
    });
  
  return  `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDeclarations.join(', ')});`
  
}

class Schema{
  constructor(tableName, model) {
    this.tableName = tableName;
    this.model = { ...model };
    this.SQLTableCreate = generateSQLTableCreate(tableName, model);
  }

  mapObjectToRowArrays(dataObject) {
    // remove sensitive data
    delete dataObject.id;
    delete dataObject.created_at;
    delete dataObject.updated_at;

    // define result arrays
    let rowKeys = [];
    let rowPlaceholders = [];
    let rowData = [];

    // map the object to result arrays
    Object.keys(dataObject).forEach( (key, index) => {
      if( this.model.hasOwnProperty(key) ){
        rowKeys.push( key );
        rowPlaceholders.push( `$${ index + 1 }` );
        rowData.push( dataObject[key] )
      }
    })

    return { rowKeys, rowPlaceholders, rowData }
  }

  // Create
  create(dataObject) {
    const {
      rowKeys,
      rowPlaceholders,
      rowData
    } = this.mapObjectToRowArrays(dataObject)

    return db.query(
      `INSERT INTO ${this.tableName}(${rowKeys}) VALUES(${rowPlaceholders}) RETURNING *`,
      rowData )
  }

  // Read
  findById(id) {
    return db.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id] )
  }

  find(options = {}, params = []) {
    const select = options.select ? options.select.join(', ') : '*';
    const where = options.where ? options.where.join(', ') : '';
    const groupBy = options.groupBy ? options.groupBy.join(', ') : '';
    const orderBy = options.orderBy ? options.orderBy.join(', ') : '';

    const query = toSingleLine`
      SELECT ${select}
      FROM ${this.tableName}
      ${where && `WHERE ${where}`}
      ${groupBy && `GROUP BY ${groupBy}`}
      ${orderBy && `ORDER BY ${orderBy}`};
    `
    return db.query( query, params )

  }

  // Update
  updateById(id, dataObject) {
    const {
      rowKeys,
      rowPlaceholders,
      rowData
    } = this.mapObjectToRowArrays(dataObject);

    return db.query(
      `UPDATE ${this.tableName} SET (updated_at,${rowKeys}) = (NOW(),${rowPlaceholders}) WHERE id = $${rowKeys.length + 1} RETURNING *`,
      [...rowData, id ])

  }

  // Delete
  deleteById(id) {
    return db.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, [id] )
  }

}

module.exports.Schema = Schema;