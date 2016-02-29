//////////////
// Requires //
//////////////

var sys  = require('sys');
var exec = require('child_process').exec;
var geoiplite = require('geoip-lite');

//////////////////
// End Requires //
//////////////////


/////////////////
// Declaration //
/////////////////

/* Private */
var computeErrors = computeErrors;
var ipMatchRegEx = ipMatchRegEx;
var doesNotComplyMessage = 'IP does not comply !';

/* Public */
var publicFunctions = {
		getAll: getAll,
		getCountry: getCountry,
		getCity: getCity,
		getAs: getAs,
		getLocation: getLocation,
};
module.exports = publicFunctions;


////////////////////
// Implementation //
////////////////////
/**
 * Concat errors
 * @return {String} Errors
 */
function computeErrors() {
	var error = null;
	for (var i = 0; i < arguments.length; i++) {
    	if(arguments[i]!==null){
    		error += arguments[i];
    	}
  	}
  	return error;
}

/**
 * Check if input match an IP ([0-255].[0-255].[0-255].[0-255])
 * @param  {String} ip IP string in input
 * @return {Boolean}    true if IP match
 */
function ipMatchRegEx(ip) {
	var regex = /^([0-9]\.|[0-9][0-9]\.|[01][0-9][0-9]\.|2[0-4][0-9]\.|25[0-5]\.){3}([0-9]|[0-9][0-9]|[01][0-9][0-9]|2[0-4][0-9]|25[0-5]){1}$/;
	return ip.match(regex);
}

/* Getting all informations about IP or Host */
/**
 * Getting all informations about IP or Host
 * @param  {String}   ip       IP
 * @param  {Function} callback Callback function : callback(informations,error)
 */
function getAll(ip, callback) {
	if(ipMatchRegEx(ip)){
		exec('geoiplookup '+ip+' -f /usr/share/GeoIP/GeoLiteCountry.dat', function(error1, country, stderr1) {
			if(error1!==null){
				error1 = String(error1).replace('GeoIP Country Edition: ','').replace('\n','');
			}
			exec('geoiplookup '+ip+' -f /usr/share/GeoIP/GeoLiteCity.dat', function(error2, city, stderr2) {
				if(error2!==null){
					error2 = String(error2).replace('GeoIP City Edition, ','').replace('\n','');
				}
				exec('geoiplookup '+ip+' -f /usr/share/GeoIP/GeoLiteASNum.dat', function(error3, as, stderr3) {
					if(error3!==null){
						error3 = String(error3).replace('GeoIP ASNum Edition: ','').replace('\n','');
					}
					var error = computeErrors(error1,error2,error3);

					var fullCountryArray = country.replace('GeoIP Country Edition: ','').replace('\n','').split(', ');
					var fullCityArray = city.replace('\n','').split(', ');
					var informations = {
						country: {
							code: fullCountryArray[0],
							name: fullCountryArray[1]
						},
						city:{
							name1: fullCityArray[3],
							name2: fullCityArray[4],
							postal: fullCityArray[5],
							latitude: fullCityArray[6],
							longitude: fullCityArray[7],
						},
						as: String(as).replace('GeoIP ASNum Edition: ','').replace('\n','')
					};

					/* Success Callback */
					callback(informations,
						error
					);

				});
			});
		});
	}else{
		/* Error Callback */
		callback(null,doesNotComplyMessage);
	}
}

/**
 * Getting Country information about IP or Host
 * @param  {String}   ip       IP
 * @param  {Function} callback Callback function : callback(informations,errors)
 */
function getCountry(ip, callback) {
	if(ipMatchRegEx(ip)){
		exec('geoiplookup '+ip+' -f /usr/share/GeoIP/GeoLiteCountry.dat', function(error, stdout, stderr) {
			if(error!==null){
				error = String(error).replace('GeoIP Country Edition: ','').replace('\n','');
			}

			var fullCountryArray = stdout.replace('GeoIP Country Edition: ','').replace('\n','').split(', ');
			var country = {
				code: fullCountryArray[0],
				name: fullCountryArray[1]
			};

			/* Success Callback */
			callback(
				country,
				error
			);

		});
	}else{
		/* Error Callback */
		callback(null,doesNotComplyMessage);
	}
}

/**
 * Getting City information about IP or Host
 * @param  {String}   ip       IP
 * @param  {Function} callback Callback function : callback(informations,errors)
 */
function getCity(ip, callback) {
	if(ipMatchRegEx(ip)){
		exec('geoiplookup '+ip+' -f /usr/share/GeoIP/GeoLiteCity.dat', function(error, stdout, stderr) {
			if(error!==null){
				error = String(error).replace('GeoIP City Edition, ','').replace('\n','');
			}

			var fullCityArray = stdout.replace('\n','').split(', ');
			var city = {
				name1: fullCityArray[3],
				name2: fullCityArray[4],
				postal: fullCityArray[5],
				latitude: fullCityArray[6],
				longitude: fullCityArray[7],
			};

			/* Success Callback */
			callback(
				city,
				error
			);
		});
	}else{
		/* Error Callback */
		callback(null,doesNotComplyMessage);
	}
}

/**
 * Getting Location (latitude, longitude) informations about IP or Host
 * @param  {String}   ip       IP
 * @param  {Function} callback Callback function : callback(latitude,longitude,errors)
 */
function getLocation(ip, callback) {
	if(ipMatchRegEx(ip)){
		exec('geoiplookup '+ip+' -f /usr/share/GeoIP/GeoLiteCity.dat', function(error, stdout, stderr) {
			var fullOutputArray = stdout.split(', ');
			var latitude = fullOutputArray[6],
				longitude = fullOutputArray[7];

			/* Success Callback */
			callback(
				latitude,
				longitude,
				error
			);

		});
	}else{
		/* Error Callback */
		callback(null,null,doesNotComplyMessage);
	}
}

/**
 * Getting AS information about IP or Host
 * @param  {String}   ip       IP
 * @param  {Function} callback Callback function : callback(informations,errors)
 */
function getAs(ip, callback) {
	if(ipMatchRegEx(ip)){
		exec('geoiplookup '+ip+' -f /usr/share/GeoIP/GeoLiteASNum.dat', function(error, stdout, stderr) {
			if(error!==null){
				error = String(error).replace('GeoIP ASNum Edition: ','').replace('\n','');
			}

			/* Success Callback */
			callback(
				String(stdout).replace('GeoIP ASNum Edition: ','').replace('\n',''),
				error
			);

		});
	}else{
		callback(null,doesNotComplyMessage);
	}
}
