const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	authors: {
		type: String,
		required: true,
	},
	journal: {
		type: String,
		required: true,
	},
	volume: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
	},
	pages: {
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
	claim: {
		type: String,
		required: true,
	},
});

module.exports = Article = mongoose.model("Article", ArticleSchema);
