const bodyParser = require( 'body-parser' );
const { request } = require('express');
'use strict';
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');
const app = express();


app.use( express.static( "public" ) );
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( {
    extended: true
} ) );

/* Add Student */
app.post('/addProduct', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("INSERT INTO products(contact_name,contact_phone_no,contact_email,contact_message) VALUES('" +a+ "', '" +b+ "','"+c+"','"+d+"')");
    }).then(result => {
        res.redirect('back')
    }).catch(err => {
        console.log(err)
    })
});



module.exports = {
    'routes': app,
};