// grab the mongoose module
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/registrationsdb');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
// module.exports = mongoose.model('Nerd', {
// 	name : {type : String, default: ''}
// });

var registrationsdb = new mongoose.Schema({
	name: String,
	studentType:String,

	segmentName : String,
	sessionsSelected : String,
	firstName : String,
	lastName : String,
	username : String,
	password : String,
	email:String,
	dateOfBirth:{ type: Date, default: Date.now },
	occupation:String,
	education:String,
	officeAddress:String,
	officeAcheievements:String,
  phone: Number
});
mongoose.model('Students', registrationsdb);
