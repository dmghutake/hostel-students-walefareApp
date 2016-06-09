
module.exports = function(app) {
mongoose = require('mongoose');
	// =====================================
	// HOME PAGE                          ==
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.html');
	});


	//general handling for finding a book by id
	app.param('id', function(req, res, next, id) {

		mongoose.findOne({ _id : req.params.book_id}, function(err, book) {
			if(err)
				return next(err);
			if(!book)
				return next('Error - failed to load records');

			req.book = book;
			return next();
		});

	});

	//get all books, sort by id
	app.get('/api/registrations', function(req, res) {

		// db.find({}).sort({ _id : 1}).exec(function(err, entries) {
  	// 		if (err)
  	// 			return res.send(500, err);
		//
  	// 		if (!entries) {
    // 			return res.send(500, 'Error failed to load entries');
  	// 		}
		//
  	// 		return res.json(entries);
		// });


		mongoose.model('Students').find({}, function (err, students) {
					if (err) {
							return res.send(500, err);
					}
					if (!students) {
						return res.send(500, 'Error failed to load students');
					}
					return res.json(students);
		});



	});

	//save a new book
	app.post('/api/registrations', function(req, res) {

		// if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('segmentName')) {
		// 	return res.send(400, 'Error - post sytnax incorrect');
		// }

		// db.insert(registration, function(err) {
		// 	if(err)
		// 		res.send(err);
		//
		// 	res.send(registration);
		// });


		mongoose.model('Students').create({
			studentType:req.body.studentType,
			productName : req.body.productName,
			segmentName : req.body.segmentName,
			sessionsSelected : req.body.sessionsSelected,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			phone:req.body.phone,
			email:req.body.email,
			dateOfBirth:req.body.dateOfBirth,
			occupation:req.body.occupation,
			education:req.body.education,
			officeAddress:req.body.officeAddress,
			officeAcheievements:req.body.officeAcheievements
		}, function (err, students) {
					if (err) {
							res.send(err);
					}
					res.send(students);
		})
	});

	//deleting a book by id
	app.delete('/api/registrations/:id', function(req, res) {

		db.remove({ _id : req.params.book_id } , function(err) {
			if(err)
				return res.send(500, err);
			res.send(req.book);
		});

	});



};
