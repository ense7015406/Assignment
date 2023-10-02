const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	authors: {
		type: String, // Assuming authors is an array of strings
		required: true,
	},
	source: {
		type: String,
		required: true,
	},
	pubyear: {
		type: String,
		required: true,
	},
	doi: {
		type: String,
	},
	summary: {
		type: String,
	},
	// updated_date: {
	// 	type: Date,
	// 	default: Date.now,
	// },
});

module.exports = Article = mongoose.model("Article", ArticleSchema);
