// database model 
const { Sequelize, DataTypes } = require('sequelize');
const Author = require('../model/author');
const Genre = require('../model/genre');

// express validator
const {body, validationResult} = require('express-validator');


// Display list of all books.
exports.book_list = async function(req, res) {
    res.render('books', {title:"Local Library | Books"});
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = async function(req, res) {

    
    

    // Get  all authors from db
    let author_names = [];
    const authors = await Author.findAll();
    authors.forEach((author)=>{

        author_names.push(
            {
                id : `${author.id}`,
                full_name : `${author.firstName} ${author.FamilyName}`
            }
        );
        
    });


    // Get  all genre from db
    let genre_list = [];
    const genres = await Genre.findAll(); //query genres from db
    genres.forEach((genre)=>{

        genre_list.push(
            {
                id : `${genre.id}`,
                name : `${genre.name}`
            }
        );
        
    });

    console.log("genre list", genre_list);
   
    //Render page with dynamic data
    res.render('add-book', {title:"Add Book", author_names, genre_list});

};

// Handle book create on POST.
exports.book_create_post = [

    body("title")
        .trim()
        .isLength({min:2})
        .escape()
        .withMessage("Title must be more than one character.")
        .isAlphanumeric()
        .withMessage("Title name has non-alphanumeric characters."),
    body("summary")
        .trim()
        .isLength({min:2})
        .escape()
        .withMessage("Summary must be more than one character.")
        .isAlphanumeric()
        .withMessage("Title name has non-alphanumeric characters."),
    body("isbn")
        .trim()
        .isLength({min:1})
        .escape()
        .withMessage("ISBN is required.")
        .isNumeric()
        .withMessage("ISBN should be numbers only"),

    (async (req, res)=> {

        const errors = validationResult(req);
        
        // new book details 
        let book = {
            title: req.body.title,
            summary: req.body.summary,
            isbn: req.body.isbn
        }

        if(!errors.isEmpty()){

            // render the same same page with errors and page title 
            res.render ("add-book",{

                title: "New Book",
                book:book,
                errors:errors

            })
            return;
        }
        else{
            res.send('NOT IMPLEMENTED: Book create POST');
        }
        
    })
]

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
