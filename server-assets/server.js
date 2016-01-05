var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var port = process.env.PORT || 8080;
var q = require('q');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/rethread');

var User = require('./models/User.js');
var Shirt = require('./models/Shirt.js');

mongoose.Promise = require('q').Promise;

passport.use(new LocalStrategy({
		usernameField: 'email',
    	passwordField: 'password'
	},
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { 
      	return done(err);
      }
      if (!user) { 
      	return done(null, false); 
      }
      user.verifyPassword(password).then(function(result) {
      	if (!result) {
      		return done(null, false); 
      	}
      	return done(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


var app = express();
app.use(session({ secret: 'I hope this rethread thing works'}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use(passport.initialize());
app.use(passport.session());

var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		console.log("requireAuth did not work");
		return res.status(401).end();
	}
	console.log("requireAuth worked");
	next();
};

var requireRole = function(user, role) {
	if (user.roles.indexOf(role) > -1) {
		return true;
	}
	return false;
};

var requireAdmin = function(req, res, next) {
	if (!requireRole(req.user, 'admin')) {
		return res.status(403).end();
	}
	next();
}

app.get('/api/users/currentUser', requireAuth, function(req, res) {
	return res.json(req.user);
});

//registration
app.post('/api/users', function(req, res) {
	User.findOne({ email: req.body.email}).exec().then(function(user) {
		if (user) {
			return res.status(409).end();
		}
		user = new User({
			email: req.body.email,
			password: req.body.password
		});
		user.save().then(function() {
			return res.status(201).end();
		});
	});
});

//login
app.post('/api/auth/local', passport.authenticate('local'), function(req, res) {
	return res.status(200).end();
});

app.get('/api/auth/logout', function(req, res) {
	req.logout();
	return res.status(200).end();
});

//Shirts Endpoints
app.post('/api/shirts', function(req, res) {
	var newShirt = new Shirt(req.body);
	newShirt.save().then(function() {
			console.log("test");
			return res.send('Shirt added!');
		}).catch(function(err) {
			console.log(err);
			return res.status(500).json(err);
		});
});

app.get('/api/shirts', function(req, res) {
	console.log("GET shirts");
	Shirt.find().exec().then(function(shirts) {
		return res.json(shirts);
	});
});

// app.get('/api/shirts/:id', function(req, res) {
// 	console.log("Get specific shirt");
// 	Shirt.findById()
// });

app.listen(port, function() {
	console.log('Listening on port', port);
});




