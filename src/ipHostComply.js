var sys = require('sys');

/* Public Functions Declaration */
var publicFunctions = {
	comply: comply
};

module.exports = publicFunctions;
/* End Public Functions Declaration */


/* Public Functions Implementation */
function comply(ip){
	return ip.match(/^([0-9]\.|[0-9][0-9]\.|[01][0-9][0-9]\.|2[0-4][0-9]\.|25[0-5]\.){3}([0-9]|[0-9][0-9]|[01][0-9][0-9]|2[0-4][0-9]|25[0-5]){1}$/);
};

/* End Public Functions Implementation */
