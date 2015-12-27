var mongoose = require('mongoose');
var q = require('q');

var productSchema = new mongoose.Schema({
	name: {type: String, required: true},
	size: {type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', '2XL']},
	price: {type: Number, required: true},
	description: String,
	quantity: Number
});

module.exports = mongoose.model('Product', productSchema);