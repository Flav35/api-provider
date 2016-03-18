var express = require('express');
var router = express.Router();
var path = require('path');
var mime = require('mime');

/* GET angularJSPDF */
router.get('/angularjs', function(req, res){

  var file = '/opt/ninjaSquad_AngularJS.pdf';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

/* GET home page. */
router.use(function(req, res, next) {
  res.json({
		error:'Not Found'
	});
});

module.exports = router;
