var express = require('express');
var router = express.Router();
var sys = require('sys');
var geoipProvider = require('../src/geoipProvider');

/* GET GeoIP All */
router.get('/:ip', function(req, res) {
	geoipProvider.getAll(req.params.ip, function(info, err){
		if(err!==null){
			res.jsonp({
				error:err
			});
			return;
		}
		res.jsonp({
			country: info.country,
			city: info.city,
			as: info.as
		});
	});
});

/* GET GeoIP Country only */
router.get('/country/:ip', function(req, res) {
	geoipProvider.getCountry(req.params.ip, function(countryOutput,err){
		if(err!==null){
			res.jsonp({
				error:err
			});
			return;
		}
		res.jsonp(countryOutput);
	});
});

/* GET GeoIP City only */
router.get('/city/:ip', function(req, res) {
	geoipProvider.getCity(req.params.ip, function(cityOutput,err){
		if(err!==null){
			res.jsonp({
				error:err
			});
			return;
		}
		res.jsonp(cityOutput);
	});
});

/* GET GeoIP AS only */
router.get('/as/:ip', function(req, res) {
	geoipProvider.getAs(req.params.ip, function(asOutput,err){
		if(err!==null){
			res.jsonp({
				error:err
			});
			return;
		}
		res.jsonp({
			as: asOutput
		});
	});
});

/* GET Latitude and Longitude only */
router.get('/location/:ip', function(req, res) {
	geoipProvider.getLocation(req.params.ip, function(lat,lon,err){
		if(err!==null){
			res.jsonp({
				error:err
			});
			return;
		}
		res.jsonp({
			latitude: lat,
			longitude: lon
		});
	});
});



/* GET Latitude and Longitude only */
router.get('/test/:ip', function(req, res) {
	geoipProvider.testGeoip(req.params.ip, function(infos,err){
		if(err!==null){
			res.jsonp({
				error:err
			});
			return;
		}
		res.jsonp(infos);
	});
});


module.exports = router;
