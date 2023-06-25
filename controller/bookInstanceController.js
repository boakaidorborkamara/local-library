const { Sequelize, DataTypes } = require('sequelize');
const Book = require('../model/book');

// Display list of all BookInstances.
exports.bookinstance_list = function(req, res) {
    res.render('book-instance', {title:"Local Library | Book Instance"});
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async function(req, res) {


    // Get  all books from db
    let book_names = [];
    const books = await Book.findAll();
    books.forEach((book)=>{

        book_names.push(
            {
                id : `${book.id}`,
                title : `${book.title}`
            }
        );
        
        
    });

    res.render('add-book-instance', {title:"Create BookInstance", book_names});
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = async function(req, res) {

    res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};
