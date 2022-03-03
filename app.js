const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// initialize express application 
let app = express();

// connect Local Library sqlite database 
let db = new sqlite3.Database('./model/library.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the Local Library database.');
});


// execute sql commands one after the other 
db.serialize(
 ()=>{

  // create book table 
  db.run(
    ` CREATE TABLE IF NOT EXISTS book(
      id INTERGER PRIMARY KEY ,
      title STRING ,
      summary STRING, 
      isbn STRING,
      url STRING,
      author_id INTEGER,
      genre_id INTEGER )`, (err)=>{
      if(err){
        console.log(err);
        throw err;
        return
      }
      
      console.log("Book table created.");
    }
  )
 }
)


// close database 
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
}); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
