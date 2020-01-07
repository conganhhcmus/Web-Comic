const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

const {
    join
} = require('path');
const app = express();

// set handle-bar
const hbs = exphbs.create({
    defaultLayout: 'home',
    extname: 'hbs',
});

//set engine
app.use(express.static(__dirname + "/../src/public"));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../src/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize());
app.use(passport.session());

// //set up passport
require('./../config/passport') (passport);

// import Routers
const indexRouter = require(__dirname + "/../src/routers/index.R");
const readRouter = require(__dirname + "/../src/routers/read.R");
const adminRouter = require(__dirname + "/../src/routers/admin.R");
const catalogRouter = require(__dirname + "/../src/routers/catalog.R"); //Import routes for "catalog" area of site

// use Routers
app.use('/',indexRouter)
app.use('/home', catalogRouter);
app.use('/comic_detail',readRouter);
app.use('/admin',adminRouter)

// middleware
require('./../src/middleware/errors')(app);


// show info server
const server = app.listen(PORT, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("SERVER: http://%s:%s", host, port)
});

module.exports = app;