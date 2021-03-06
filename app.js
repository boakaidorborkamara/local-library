const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//PORT
const PORT = process.env.PORT || 3000;
// initialize express application 
let app = express();


// MIDDLEWARE 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//database connection
const database = require('./dbConfig/dbConfig');
//tables
const author_table = require('./model/author');


// ROUTES 
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');


app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
// app.use('/users', usersRouter);



app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})