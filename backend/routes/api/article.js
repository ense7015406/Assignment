const express = require("express");
const router = express.Router();
const Article = require("../../models/Article");

// Test route
router.get("/test/article", (req, res) => {
	res.send("Article route testing!");
});

// Get all articles
router.get("/", async (req, res) => {
	try {
		const articles = await Article.find();
		res.json(articles);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "An error occurred while fetching articles" });
	}
});

// Get a single article by ID
router.get("/search", async (req, res) => {
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
router.post("/", async (req, res) => {
	try {
		const article = await Article.create(req.body);
		res.json({ msg: "Article added successfully", article });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: "Unable to add this article" });
	}
});

// Update an article by ID
router.put("/:id", async (req, res) => {
	try {
		const article = await Article.findByIdAndUpdate(req.params.id, req.body);
		if (!article) {
			return res.status(404).json({ error: "No article found" });
		}
		res.json({ msg: "Updated successfully", article });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: "Unable to update the article" });
	}
});

// Delete an article by ID
router.delete("/:id", async (req, res) => {
	try {
		const article = await Article.findByIdAndRemove(req.params.id);
		if (!article) {
			return res.status(404).json({ error: "No article found" });
		}
		res.json({ msg: "Article entry deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "An error occurred while deleting the article" });
	}
});

module.exports = router;
