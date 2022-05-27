const bodyParser = require( 'body-parser' );
'use strict';
var express = require( 'express' );
const sql = require( 'mssql' );
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


app.get( '/signIn', ( req, res ) => {
    res.render( 'SignIn' );
} );

app.get( '/ContactUs', ( req, res ) => {
    res.render( 'ContactUs' );
} );

app.get( '/CreateAccount', ( req, res ) => {
    res.render( 'CreateAccount' );
} );

app.get( '/shop', ( req, res ) => {
    res.render( 'shop' );
} );

app.get( '/product', ( req, res ) => {
    res.render( 'product' );
} );
app.get( '/', ( req, res ) => {
    res.render( 'index' );
} );

app.post( '/CreateAccount', function ( req, res ) {
    try {
        var a = req.body.fname;
        var b = req.body.lname;
        var c = req.body.adress;
        var d = req.body.phone;
        var e = req.body.email;
        var f = req.body.password;
        CreateAccountAsyncFunction( a, b, d, e, f, c, 1 );
        res.redirect( 'back' );
    } catch {
        console.log( err )
    }
} );


app.post( '/ContactUs', function ( req, res ) {
    try {
        var a = req.body.name;
        var b = req.body.phone;
        var c = req.body.email;
        var d = req.body.message;
        ContactUSAsyncFunction( a, b, c, d );
        res.redirect( 'back' );
    } catch {
        console.log( err )
    }
} );

app.get( '/past-orders', ( req, res ) => {
    try {
        selectOrders_detailsfunction().then( function ( result ) {
            res.render( 'past-orders', {
                title: 'Orders',
                data: result
            } );
        } );
    } catch ( err ) {
        console.log( err.message );
    }
} );

async function selectOrders_detailsfunction() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        let pool = await sql.connect( sqlConfig )
        let result1 = await pool.request().query( "SELECT TOP (1000) * FROM Orders_details" );
        sql.close();
        return result1;
    } catch ( err ) {
        console.log( err );
        sql.close();

    }
};

async function ContactUSAsyncFunction( name, phone, email, message ) {
    try {
        let pool = await sql.connect( sqlConfig );
        let result1 = await pool
            .request().input( "name", sql.Char, name ).input( "phone", sql.Char, phone ).input( "email", sql.Char, email ).input( "message", sql.Char, message )
            .query( "INSERT INTO contact_us(contact_name,contact_phone_no,contact_email,contact_message) VALUES(@name,@phone,@email,@message)" );
        sql.close();
    } catch ( error ) {
        console.log( error );
        sql.close();
    }
};
async function CreateAccountAsyncFunction( fname, lname, phone, email, message, address, type ) {
    try {
        let pool = await sql.connect( sqlConfig );
        let result1 = await pool
            .request().input( "fname", sql.Char, fname ).input( "lname", sql.Char, lname ).input( "phone", sql.Char, phone ).input( "email", sql.Char, email ).input( "message", sql.Char, message ).input( "address", sql.Char, address ).input( "type", sql.Int, type )
            .query( "INSERT INTO users(user_first_name,user_last_name,user_phone_no,user_email,user_address,user_password,user_type) VALUES(@fname,@lname,@phone,@email,@address,@message,@type)" );
        sql.close();
    } catch ( error ) {
        console.log( error );
        sql.close();
    }
};

app.post( '/signIn', ( req, res ) => {
    try {
        const user_email = req.body.user_email;
        const password = req.body.password;
        AccountAsyncFunction( user_email, password ).then( function ( result ) {
            if ( result ) {
                return res.redirect( '/shop' );
            } else {
                return res.redirect( '/signIn' );
            }
        } );
    } catch ( err ) {
        console.log( err.message )
    }

} );
async function AccountAsyncFunction( user_email, password ) {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        let pool = await sql.connect( sqlConfig )
        let result1 = await pool.request().input( "user_email", sql.Char, user_email ).input( "password", sql.Char, password )
            .query( "SELECT TOP (1) [user_id] FROM users WHERE user_email=@user_email AND user_password=@password;" );
        sql.close();
        return result1;
    } catch ( err ) {
        console.log( err );
        sql.close();

    }
};

module.exports = {
    'routes': app
};