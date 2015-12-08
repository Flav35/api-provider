/* Requires */
var sys  = require('sys');
var exec = require('child_process').exec;

/* End Requires */

/* Private Functions */
var computeErrors = function() {
	var error = null;
	for (var i = 0; i < arguments.length; i++) {
    	if(arguments[i]!==null){
    		error += arguments[i];
    	}
  	}
  	return error;
};

/* End Private Functions */

/* Public Functions */
module.exports = {
	
	/* Getting all informations about IP or Host */
	getAll: function(ip, callback){
		if(ip.match(/^[A-Za-z0-9\-\_\.]+$/)){
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
						console.log(fullCountryArray);
						console.log(fullCityArray);
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
			callback(null,'IP or host does not comply !');
		}
	},
	
	/* Getting Country information about IP or Host */
	getCountry: function(ip, callback){
		if(ip.match(/^[A-Za-z0-9\-\_\.]+$/)){
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
			callback(null,'IP or host does not comply !');
		}
	},
	
	/* Getting City information about IP or Host */
	getCity: function(ip, callback){
		if(ip.match(/^[A-Za-z0-9\-\_\.]+$/)){
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
			callback(null,'IP or host does not comply !');
		}
	},
	
	/* Getting Location (latitude, longitude) informations about IP or Host */
	getLocation: function(ip, callback){
		if(ip.match(/^[A-Za-z0-9\-\_\.]+$/)){
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
			callback(null,'IP or host does not comply !');
		}
	},
	
	/* Getting AS information about IP or Host */
	getAs: function(ip, callback){
		if(ip.match(/^[A-Za-z0-9\-\_\.]+$/)){
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
			callback(null,'IP or host does not comply !');
		}
	},


};
/* End Public Functions */


/* 
echo "Country :";
geoiplookup $1 -f /usr/share/GeoIP/GeoLiteCountry.dat;
echo "City :";
geoiplookup $1 -f /usr/share/GeoIP/GeoLiteCity.dat;
echo "AS Number :";
geoiplookup $1 -f /usr/share/GeoIP/GeoLiteASNum.dat;
*/