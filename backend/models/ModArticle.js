const mongoose = require("mongoose");

const ModArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	authors: {
		type: String, // Assuming authors is an array of strings
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

module.exports = ModArticle = mongoose.model("ModArticle", ModArticleSchema);
