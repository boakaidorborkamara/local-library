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


// using serialize to enable sql command to be executed one after the other
db.serialize(()=>{

    // create book table 
    db.run(
      ` CREATE TABLE IF NOT EXISTS book(
        book_id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_title STRING ,
        book_summary STRING, 
        isbn STRING,
        book_url STRING,
        author_id INTEGER,
        genre_id INTEGER,
        
        FOREIGN KEY(author_id)
          REFERENCES author(author_id)

        FOREIGN KEY(genre_id)
          REFERENCES genre(genre_id)
       
        )`, (err)=>{
        if(err){
          console.log(err);
          throw err;
          return
        }
        
        console.log("Book table created.");
      }
    );

    // create author table 
    db.run(
      `CREATE TABLE IF NOT EXISTS author(
            author_id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name STRING,
            last_name STRING,
            date_of_birth TEXT,
            date_of_death TEXT,
            life_span STRING,
            url STRING
        )`,(err)=>{
        if(err){
          console.log(err);
          throw err;
          return;
        }

        console.log("Author table created");
      }
    );

    // create genre table 
    db.run(`
      CREATE TABLE IF NOT EXISTS genre(
        genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
        genre_name STRING,
        genre_url STRING
      )
    `, (err)=>{
      if(err){
        console.log(err);
        throw err;
        return
      }

      console.log("Genre table create");
    });

    // create book instance table 
    db.run(`
      CREATE TABLE IF NOT EXISTS book_instance(
        instance_id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER,
        imprint STRING,
        status STRING,
        due_back STRING,
        instance_url STRING,

        FOREIGN KEY(book_id)
         REFERENCES book(book_id)
      )`,(err)=>{
        if(err){
          console.log(err);
          throw err;
          return;
        }

        console.log("Book Instance table created");
      }
    )

    
  }
)

// insert data into tables 
db.run(`INSERT INTO author(first_name, last_name, date_of_birth, url) VALUES("Mary", "Kanneh", "Feb 1, 1694", "www.facebook.com")`,(err)=>{
  if(err){
    console.log(err);
    return;
  }

  console.log(`New author added`);
});


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
  res.status(err.status || 3000);
  res.render('error');
});

module.exports = app;
