var express = require('express');
var router = express.Router();
var sys = require('sys');
var geoipLite = require('geoip-lite');
var ipHostComply = require('../src/ipHostComply');

/* GET GeoIP All */
router.get('/:ip', function(req, res) {
	if(!ipHostComply.comply(req.params.ip)){
		res.json(
			ipHostComply.message()
		);
		return;
	}
	res.json(
		geoipLite.lookup(req.params.ip)
	);
});

/* GET GeoIP Country only */
router.get('/country/:ip', function(req, res) {
	if(!ipHostComply.comply(req.params.ip)){
		res.json(
			ipHostComply.message()
		);
		return;
	}
	res.json({
		country:geoipLite.lookup(req.params.ip).country
	});
});

/* GET GeoIP Region only */
router.get('/region/:ip', function(req, res) {
	if(!ipHostComply.comply(req.params.ip)){
		res.json(
			ipHostComply.message()
		);
		return;
	}
	res.json({
		region:geoipLite.lookup(req.params.ip).region
	});
});

/* GET GeoIP City only */
router.get('/city/:ip', function(req, res) {
	if(!ipHostComply.comply(req.params.ip)){
		res.json(
			ipHostComply.message()
		);
		return;
	}
	res.json({
		city:geoipLite.lookup(req.params.ip).city
	});
});


/* GET Latitude and Longitude only */
router.get('/location/:ip', function(req, res) {
	if(!ipHostComply.comply(req.params.ip)){
		res.json(
			ipHostComply.message()
		);
		return;
	}
	res.json({
		location:geoipLite.lookup(req.params.ip).ll
	});
});


module.exports = router;
