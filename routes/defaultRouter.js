var express = require('express');
var router = express.Router();

/* GET home page. */
router.any(function(req, res, next) {
  res.json({
		error:'Not Found'
	});
});

module.exports = router;
