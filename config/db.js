// grab the mongoose module
var mongoose = require('mongoose');
mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});
mongoose.connect('mongodb://localhost/registrationsdb');

//Students Schema
var students = new mongoose.Schema({
	name: String,
	studentType:String,
	segmentName : String,//hostels
	sessionsSelected : String,//education
	firstName : String,
	lastName : String,
	username : String,
	password : String,
	email:String,
	dateOfBirth:{ type: Date, default: Date.now },
	occupation:String,
	education:String, //degree
	officeAddress:String,
	officeAcheievements:String,
  phone: Number
});
mongoose.model('Students', students);
