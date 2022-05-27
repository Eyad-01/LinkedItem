const bodyParser = require( 'body-parser' );
'use strict';
var express = require( 'express' );
var sql = require( "mssql" );
const sqlConfig = {
  user: "SA",
  password: "Docker@123",
  database: "master",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}
const app = express();
app.use( express.static( "public" ) );
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( {
  extended: true
} ) );


app.get( '/add-product', ( req, res ) => {
  res.render( 'add-product' );
} );

app.post( '/add-product', ( req, res ) => {
  try {
    productAsyncFunction();
    res.redirect( 'back' );
  } catch {
    console.log( "ERROR SQL SHOW: " );
  }
} );


app.get( '/manage-company', ( req, res ) => {
  try {
    selectcompanyfunction().then( function ( result ) {
      res.render( 'manage-company', {
        title: 'Company',
        data: result
      } );
    } );
  } catch {
    console.log( "ERROR SQL SHOW: " );
  }
} );

app.post( '/addCompany', function ( req, res ) {
  try {
    var a = req.body.type;
    var b = req.body.name;
    var c = req.body.address;
    var d = req.body.phone;
    var e = req.body.email;
    companyAsyncFunction( a, b, c, d, e );
    res.redirect( 'manage-company' );
  } catch {
    console.log( err );
  }
} );

async function selectcompanyfunction() {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let pool = await sql.connect( sqlConfig )
    let result1 = await pool.request().query( "SELECT TOP (1000) * FROM Company" );
    sql.close();
    return result1;
  } catch ( err ) {
    console.log( "err" );
    sql.close();

  }
};

async function companyAsyncFunction( type, name, address, phone, email ) {
  try {
    let pool = await sql.connect( sqlConfig );
    let result1 = await pool
      .request().input( "type", sql.Char, type ).input( "name", sql.Char, name ).input( "address", sql.Char, address ).input( "phone", sql.Char, phone ).input( "email", sql.Char, email )
      .query( "INSERT INTO company (Company_type,Company_name,company_address,company_phone_no,company_email) VALUES(@type,@name,@address,@phone,@email)" );
    sql.close();
  } catch ( error ) {
    console.log( error );
    sql.close();
  }
};
async function productAsyncFunction( id, instock ) {
  try {
    let pool = await sql.connect( sqlConfig );
    let result1 = await pool
      .request().input( "Company_id", sql.Int, id ).input( "instock", sql.Int, instock )
      .query( "UPDATE company_product SET item_Instock=@instock WHERE Company_id=@Company_id" );
    sql.close();
  } catch ( error ) {
    console.log( error );
    sql.close();
  }
};



module.exports = {
  'routes': app,
};