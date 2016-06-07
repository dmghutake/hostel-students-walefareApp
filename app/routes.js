
module.exports = function(app) {

	// =====================================
	// HOME PAGE                          ==
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.html'); 
	});


	//general handling for finding a book by id
	app.param('id', function(req, res, next, id) {

		db.findOne({ _id : req.params.book_id}, function(err, book) {
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

		db.find({}).sort({ _id : 1}).exec(function(err, entries) {
  			if (err) 
  				return res.send(500, err);
  			
  			if (!entries) {
    			return res.send(500, 'Error failed to load entries');
  			}

  			return res.json(entries);
		});
	});

	//save a new book
	app.post('/api/registrations', function(req, res) {

		if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('segmentName')) {
			return res.send(400, 'Error - post sytnax incorrect');
		}

		var book = {
			name : req.body.name,
			segmentName : req.body.segmentName,
		    productName : req.body.productName,
   		    sessionsSelected : req.body.sessionsSelected
		}

		db.insert(book, function(err) {
			if(err)
				res.send(err);

			res.send(book);
		});

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