var Datastore = require('nedb');
	
module.exports = {
	init: function() {
		return new Datastore({ filename: 'registrationsdb',autoload: true });
	}
};