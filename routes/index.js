var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // redirect to catalog each time you visit the home route 
  res.redirect('/catalog');
});

module.exports = router;
