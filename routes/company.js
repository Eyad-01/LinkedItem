const bodyParser = require( 'body-parser' );
'use strict';
var express = require('express');
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

/* Add Student */
app.post( '/addProduct', function ( req, res ) {
            try {
                AddproductAsyncFunction( a, b, c, d, e, f );
                res.redirect( 'back' );
            } catch ( error ) {
                console.log( error.message );
            }
});

async function AddproductAsyncFunction( Company_id, Category_id, product_name, product_price, Product_Instock, Product_availability ) {
    try {
        let pool = await sql.connect( sqlConfig );
        let result1 = await pool
            .request().input( "Company_id", sql.Int, id ).input( "Category_id", sql.Int, Category_id ).input( "product_name", sql.Char, product_name ).input( "product_price", sql.Int, product_price ).input( "Product_availability", sql.Int, Product_availability )
            .query( "INSERT INTO products (Company_id,Category_id,product_name,product_price,Product_availability) VALUES(@Company_id,@Category_id,@product_name,@product_price,@Product_availability)" );
        productAsyncFunction( Company_id, Product_Instock );
        sql.close();
    } catch ( error ) {
        console.log( error.message );
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
        console.log( error.message );
        sql.close();
    }
};

module.exports = {
    'routes': app
};