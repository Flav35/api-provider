var sys = require('sys');

/* Start Public Functions */
module.exports = {
	comply: function(ip){
		return ip.match(/^[A-Za-z0-9\-\_\.]+$/);
	},
};

/* End Public Functions */