// genre model
const { Sequelize, DataTypes } = require('sequelize');
const Genre = require('../model/genre');


const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');


// Display list of all Genre.
exports.genre_list = async function(req, res) {

    const genres = await Genre.findAll();
    console.log(genres);
    res.render('genres', {title:"Local Library | Genres", genres});

};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    res.render('genre-details');
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: Genre create GET');
    res.render('add-genre', {title:"Add Genre"});
};

// Handle Genre create on POST.
// exports.genre_create_post = function(req, res) {
//     console.log(req.body);
//     res.send('NOT IMPLEMENTED: Genre create POST');
// };
exports.genre_create_post = [
    // validate and sanitize values from input fields 
    body('genre')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("First name must be more than one character.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

    asyncHandler(async(req,res)=>{

        const errors = validationResult(req);

        const genre = {
            name:req.body["genre"]
        }

        

        // check if there's an error from validation 
        if(!errors.isEmpty()){

            console.log(errors);

            // render page with error message and user input 
            res.render("add-genre",{
                title: "Add Genre",
                genre:genre,
                errors:errors.array()
            })
            return;
        }
        else{
            console.log("Genre", genre);
            // Add new genre
            const new_genre = await Genre.create(genre);
            console.log("new author", new_genre);
            res.render("add-genre", {title: "Add Genre"});
        }
       

    })

]

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
