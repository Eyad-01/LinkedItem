const bodyParser = require( 'body-parser' )

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
module.exports = {
    'routes': app
};

app.post( '/ContactUs', ( req, res ) => {
    console.log( req.body.phone );
} );
module.exports = {
    'routes': app
};