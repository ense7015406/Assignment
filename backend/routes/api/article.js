const express = require("express");
const router = express.Router();
const Article = require("../../models/Article");

// Test route
router.get("/test/article", (req, res) => {
	res.send("Article route testing!");
});

// Get all articles
router.get("/article", async (req, res) => {
	try {
		const articles = await Article.find();
		res.json(articles);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "An error occurred while fetching articles" });
	}
});

// Search an article based on Title, Author and Pub Year
router.get("/article/search", async (req, res) => {
	const query = req.query.q; // Retrieve the search query from the request query parameters

	try {
		const searchResults = await Article.find({ title: { $regex: query, $options: "i" } });
		res.json(searchResults);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "An error occurred while searching for articles" });
	}
});

// Add a new article
router.post("/article/", async (req, res) => {
	try {
		const article = await Article.create(req.body);
		res.json({ msg: "Article added successfully", article });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: "Unable to add this article" });
	}
});
module.exports = router;
