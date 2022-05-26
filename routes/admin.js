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


app.get('/add-product', (req, res) => {
    res.render('add-product');
});

app.post('/add-product', (req, res) => {
    res.render('add-product');
});


app.get('/manage-company', (req, res) => {
    sql.connect(dbConfig.dbConnection(), function(err){
      if(err){
        console.log("ERROR CONNECT: ", err);
      }
  
      let sqlRequest = new sql.Request();
      let sqlShowTable = 'SELECT * FROM Company ';
  
      sqlRequest.query(sqlShowTable, function(err, data){
        if(err){
          console.log("ERROR SQL SHOW: ", err);
        } else {
            res.render('manage-company', { title: 'Company', data: data});
            sql.close();
        }
        
      });// </ sql.Request >
    });// </ sql.connect >
  });


app.post('/addCompany',function(req,res) {
    var a=req.body.type;
    var b=req.body.name;
    var c=req.body.address;
    var d=req.body.phone;
    var e=req.body.email;

    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("INSERT INTO company VALUES('" +a+ "', '" +b+ "','"+c+"','"+d+"','"+e+"')");
    }).then(result => {
        res.redirect('back')
    }).catch(err => {
        console.log(err)
    })
});



module.exports = {
    'routes': app,
};