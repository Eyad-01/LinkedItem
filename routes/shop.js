const bodyParser = require( 'body-parser' );
const { request } = require('express');

var Connection = require( 'tedious' ).Connection;
var config = {
    server: 'linkeditem.database.windows.net', //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'admin-Eyad', //update me
            password: 'Linked-item' //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'linkeditem' //update me
    }
};
var connection = new Connection( config );
connection.on( 'connect', function ( err ) {
    // If no error, then good to proceed.
    console.log( "Connected" );

} );
connection.connect();

var Request = require( 'tedious' ).Request



const express = require('express');

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



app.post('/ContactUs',function(req,res) {
    var a=req.body.name;
    var b=req.body.phone;
    var c=req.body.email;
    var d=req.body.message;
   var request = new Request( "insert into contact_us(contact_name,contact_phone_no,contact_email,contact_message)values('"+a+"','"+b+"','"+c+"','"+d+"')", function ( err ) {
        if ( err ) {
            console.log( err );
        }
        console.log("1 record inserted");

    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on( "requestCompleted", function ( rowCount, more ) {
        connection.close();
} );
    connection.execSql( request );
    return res.redirect('/ContactUs');


});



app.post('/CreateAccount',function(req,res) {
    var a=req.body.fname;
    var b=req.body.sname;
    var c=req.body.phone;
    var d=req.body.email;
    var e=req.body.password;
    var f=0;
   var request = new Request( "insert into users(user_first_name,user_last_name,user_phone_no,user_email,user_password,user_type)values('"+a+"','"+b+"','"+c+"','"+d+"','"+e+"','"+f+"')", function ( err ) {
        if ( err ) {
            console.log( err );
        }
        console.log("1 record inserted");

    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on( "requestCompleted", function ( rowCount, more ) {
        connection.close();
    } );
    connection.execSql( request );
    return res.redirect('/SignIn');


});


module.exports = {
    'routes': app
};