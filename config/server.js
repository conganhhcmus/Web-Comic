const express = require('express');
const exphbs = require('express-handlebars')
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


// import Routers
const indexRouter = require(__dirname + "/../src/routers/index.R");
const readRouter = require(__dirname + "/../src/routers/read.R");
const accountRouter = require(__dirname + "/../src/routers/account.R");
const catalogRouter = require(__dirname + "/../src/routers/catalog.R"); //Import routes for "catalog" area of site

// use Routers
app.use('/',indexRouter)
app.use('/home', catalogRouter);
// app.use('/home', catalogRouter); // Add catalog routes to middleware chain.
// app.use('/login',catalogRouter);
app.use('/comic_detail',readRouter);
app.use('/account',accountRouter)

// middleware
require('./../src/middleware/errors')(app);


// show info server
const server = app.listen(3000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});

module.exports = app;