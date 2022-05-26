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


app.get('/signIn', (req, res) => {
    res.render('SignIn');
});

app.get('/ContactUs', (req, res ) => {
    res.render('ContactUs');
});

app.get('/CreateAccount', (req, res ) => {
    res.render('CreateAccount');
});

app.get('/shop', (req, res ) => {
    res.render('shop');
});

app.get('/product', (req, res ) => {
    res.render('product');
});



app.get('/', (req, res ) => {
    res.render('index');
} );

app.post('/CreateAccount',function(req,res) {
    var a=req.body.fname;
    var b=req.body.lname;
    var c=req.body.adress;
    var d=req.body.phone;
    var e=req.body.email;
    var f=req.body.password;
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("INSERT INTO users([user_first_name],[user_last_name],[user_phone_no],[user_email],[user_address],[user_password]) VALUES('" +a+ "', '" +b+ "','"+d+"','"+e+"','"+c+"','"+f+"')");
    }).then(result => {
        res.redirect('back')
    }).catch(err => {
        console.log(err)
    })
});


app.post('/ContactUs',function(req,res) {
    var a=req.body.name;
    var b=req.body.phone;
    var c=req.body.email;
    var d=req.body.message;
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("INSERT INTO contact_us(contact_name,contact_phone_no,contact_email,contact_message) VALUES('" +a+ "', '" +b+ "','"+c+"','"+d+"')");
    }).then(result => {
        res.redirect('back')
    }).catch(err => {
        console.log(err)
    })
});

app.get('/past-orders', (req, res) => {
    sql.connect(dbConfig.dbConnection(), function(err){
      if(err){
        console.log("ERROR CONNECT: ", err);
      }
  
      let sqlRequest = new sql.Request();
      let sqlShowTable = 'SELECT * FROM Orders_details ';
  
      sqlRequest.query(sqlShowTable, function(err, data){
        if(err){
          console.log("ERROR SQL SHOW: ", err);
        } else {
            res.render('past-orders', { title: 'Orders', data: data});
            sql.close();
        }
        
      });// </ sql.Request >
    });// </ sql.connect >
  })
module.exports = {
    'routes': app
};