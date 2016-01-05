var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');

var userSchema = new mongoose.Schema({
	email: {type:String, required: true},
	password: {type:String, required: true},
	wallet: Number,
	cart: Array,
	itemsOfInterest: Array,
	roles: [
		{
			type: String, 
			enum: ['normal', 'admin', 'moderator'],
			default: 'normal'
		}
	]
});

userSchema.methods.verifyPassword = function(givenPassword) {
	var deferred = q.defer();
	bcrypt.compare(givenPassword, this.password, function(err, result) {
		if (result) {
			deferred.resolve(true);
		}
		else {
			deferred.reject(false);
		}
	});
	return deferred.promise;
};

userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.genSalt(12, function(err, result) {
		bcrypt.hash(user.password, result, function(err, hash) {
			user.password = hash;
			next();
		})
	});
});

module.exports = mongoose.model('User', userSchema);