var express = require('express');
var router = express.Router();
var sys = require('sys');
var geoipProvider = require('../src/geoipProvider');

/* GET GeoIP All */
router.get('/geoip/:ip', function(req, res) {
	geoipProvider.getAll(req.params.ip, function(info, err){
		if(err!==null){
			res.json({
				error:err
			});
			return;
		}
		res.json({
			country: info.country,
			city: info.city,
			as: info.as
		});
	});
});

/* GET GeoIP Country only */
router.get('/geoip/country/:ip', function(req, res) {
	geoipProvider.getCountry(req.params.ip, function(countryOutput,err){
		if(err!==null){
			res.json({
				error:err
			});
			return;
		}
		res.json({
			countryOutput
		});
	});
});

/* GET GeoIP City only */
router.get('/geoip/city/:ip', function(req, res) {
	geoipProvider.getCity(req.params.ip, function(cityOutput,err){
		if(err!==null){
			res.json({
				error:err
			});
			return;
		}
		res.json({
			cityOutput
		});
	});
});

/* GET GeoIP AS only */
router.get('/geoip/as/:ip', function(req, res) {
	geoipProvider.getAs(req.params.ip, function(asOutput,err){
		if(err!==null){
			res.json({
				error:err
			});
			return;
		}
		res.json({
			as: asOutput
		});
	});
});

/* GET Latitude and Longitude only */
router.get('/geoip/location/:ip', function(req, res) {
	geoipProvider.getLocation(req.params.ip, function(lat,lon,err){
		if(err!==null){
			res.json({
				error:err
			});
			return;
		}
		res.json({
			latitude: lat,
			longitude: lon
		});
	});
});

/* Default, send 404 not found */
router.use(function(req,res,err){
	res.json({
		error:'Not Found'
	});
});

module.exports = router;
