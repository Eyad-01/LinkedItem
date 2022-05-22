const bodyParser = require( 'body-parser' )

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


module.exports = {
    'routes': app,
};