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

var Request = require( 'tedious' ).Request;



const express = require( 'express' );

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

app.get('/manage-product', (req, res) => {
    res.render('manage-products');
});

app.post('/manage-product', (req, res) => {
    res.render('manage-products');
});

app.get('/manage-company', (req, res) => {
    res.render('manage-company');
});


/* Add Student */
app.post('/addCompany', function (req, res) {
        var request= new Request("INSERT INTO Company(Company_id,Company_type,Company_name,company_address,company_phone_no,company_email) VALUES('"+1+"','" + req.body.type + "', '" + req.body.name + "', '" + req.body.address +"','" +req.body.phone +"', '" + req.body.email + "')", function ( err ) {
        if ( err ) {
            console.log( err );
        }
        console.log("1 record inserted");
    });

        request.on( "requestCompleted", function ( rowCount, more ) {
            connection.close();
        } );
        connection.execSql( request );
        return res.redirect('/admin/manage-company');

});


module.exports = {
    'routes': app,
};