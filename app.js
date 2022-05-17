const express = require('express');

const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app = express();

app.use(express.static(path.join('public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes.routes);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen( process.env.PORT || 8000, function () {
    console.log( "Server is running on port 8000" );
} );