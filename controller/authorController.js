// include validater library 
const { body, validationResult } = require("express-validator");


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

// Handle Author create on POST.
// exports.author_create_post = function(req, res) {

//     let new_author = req.body;

//     // validate new author 
//     body("first-name")
//         .trim()
//         .isLength({ min: 1 })
//         .escape()
//         .withMessage("First name must be specified.")
//         .isAlphanumeric()
//         .withMessage("First name has non-alphanumeric characters.")

    
//     // Process request after validation and sanitization.
//     const error = validationResult(req);
//     if(error.isEmpty()){

//         res.send({"new author":new_author}); 

//     }
//     else{

//         console.log(error.array());

//     }

    

// };

exports.author_create_post = [

    // validate and sanitize 
    body("first-name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),

    // Process request after validation and sanitization.
    (async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data
        

        if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        let user_error = errors.array();
        console.log(user_error);
        return;
        } else {
        // Data from form is valid.

        // Save author.
        await author.save();
        // Redirect to new author record.
        res.redirect(author.url);
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