var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.use(function(req, res, next) {
  res.json({
		error:'Not Found'
	});
});

module.exports = router;
