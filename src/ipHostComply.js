var sys = require('sys');

/* Public Functions Declaration */
var publicFunctions = {
	comply: comply,
	message: message
};

module.exports = publicFunctions;
/* End Public Functions Declaration */


/* Public Vars */
var errorMessage = "IP does not comply !"
/* End public Vars */

/* Public Functions Implementation */
function comply(ip){
	return ip.match(/^([0-9]\.|[0-9][0-9]\.|[01][0-9][0-9]\.|2[0-4][0-9]\.|25[0-5]\.){3}([0-9]|[0-9][0-9]|[01][0-9][0-9]|2[0-4][0-9]|25[0-5]){1}$/);
};

function message(){
	return { 'error':errorMessage  };
};
/* End Public Functions Implementation */
