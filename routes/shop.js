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

app.post( '/CreateAccount', ( req, res ) => {
    console.log( req.body.Username );
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


module.exports = {
    'routes': app
};