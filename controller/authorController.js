// include validater library 
const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');


// Display list of all author 
exports.author_list = function(req,res){
    res.render('authors', {title:"Local Library | Authors"});
}

// Display detail page for specific author 
exports.author_details = function(req,res){
    res.send("author detail page not implemented.")
}
 
// Display form to create new Author on GET.
exports.author_create_get = function(req, res) {

    res.render('add-author', {title:"Add Author"});
 
};

exports.author_create_post = [

    // validate and sanitize 
    body("first-name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("last-name")
        .trim()
        .isLength({ min: 1 }) 
        .escape()
        .withMessage("Last name must be specified")
        .isAlphanumeric()
        .withMessage("Last name has a non-alphnumeric characters"),
    body("date_of_birth", "Invalid date of birth")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    body("date_of_death", "Invalid date of death")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

          // Create Author object with escaped and trimmed data
        const author = {
            first_name: req.body["first-name"],
            family_name: req.body["last-name"],
            date_of_birth: req.body["date-of-birth"],
            date_of_death: req.body["date-of-death"],
        };

        console.log("req body", req.body);
        

        if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        let user_error = errors.array();
        console.log(user_error);

        res.render("add-author", {
            title: "Add Author",
            author: author,
            errors: errors.array(),
        });
        return;
        } else {
            res.send({msg:"working"});
        }
    }),

    
    

];


// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};