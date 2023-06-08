const { Sequelize, DataTypes } = require('sequelize');
const Author = require('../model/author');
const Genre = require('../model/genre');


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

    
    let author_names = [];

    // Get  all authors from db
    const authors = await Author.findAll();
    authors.forEach((author)=>{
        console.log("TEST", author.firstName);
        author_names.push(
            {
                id : `${author.id}`,
                full_name : `${author.firstName} ${author.FamilyName}`
            }
        )
        
    });
    console.log("authors", author_names);

    // Get  all genre from db
    const genres = await Genre.findAll();
   
    //Render page with dynamic data
    res.render('add-book', {title:"Add Book", author_names, genres});

};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

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
