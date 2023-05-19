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
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

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