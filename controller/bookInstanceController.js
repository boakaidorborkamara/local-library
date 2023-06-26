const { Sequelize, DataTypes } = require('sequelize');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator'); //express validator 
const Book = require('../model/book');
const BookInstance = require('../model/book_instance');

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
exports.bookinstance_create_post = [

    body("book-title")
        .trim()
        .isLength({min:2})
        .escape()
        .withMessage("Book Title must be more than one character.")
        .isAlpha('es-ES', {ignore: ' '})
        .withMessage("Book title has non-alphanumeric characters."),
    body("imprint")
        .trim()
        .isLength({min:2})
        .escape()
        .withMessage("Imprint must be more than one character.")
        .isAlpha('es-ES', {ignore: ' '})
        .withMessage("Imprint has non-alphanumeric characters."),
    body("available-date")
        .trim()
        .isLength({min:1})
        .escape()
        .withMessage("Date is required."),
    body("book-status")
        .trim()
        .isLength({min:1})
        .escape()
        .withMessage("Imprint must be more than one character.")
        .isAlpha('es-ES', {ignore: ' '})
        .withMessage("Imprint has non-alphanumeric characters."),

    async (req, res)=>{

        // new book details 
        let book_instance = {
            title: req.body["book-title"],
            imprint: req.body["imprint"],
            available_date: req.body['available-date'],
            status:req.body['book-status']
        }

        console.log("Book Instance", book_instance);
        // console.log("BOOK INSTANCE", req.body);
        const results = validationResult(req);
        const errors = results.array();
        

        if(!results.isEmpty()){
            console.log("Error exist")
            console.log(errors);
            res.render("add-book-instance" , {
                title: "Create Book Instance",
                book_instance:book_instance,
                errors:errors
            });
            return;
        }
        else{
            // Add a new book
            const new_book_instance = await BookInstance.create(book_instance);
            console.log("new book", new_book_instance);
            res.render("add-book-instance", {title: "Add Book"});
        }

    }
        
]

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
