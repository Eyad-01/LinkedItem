const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const mongoConnect = require('./util/database').mongoConnect;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const homeRoutes = require('./routes/home');

app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes.routes);
app.use('/shop',shopRoutes.routes);
app.use(homeRoutes.routes);
app.use((req, res, next) => {
    res.status(404).render('404');
});

mongoConnect(() => {
    app.listen(8000);
} );