const express = require("express");
const router = express.Router();
const Article = require("../../models/Modarticle");

// Test route
router.get("/test/modarticle", (req, res) => {
	res.send("Article route testing!");
});

// Get all articles
router.get("/modarticle", async (req, res) => {
	try {
		const articles = await Article.find();
		res.json(articles);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "An error occurred while fetching articles" });
	}
});

// Add a new article
router.post("/modarticle/", async (req, res) => {
	try {
		const article = await Article.create(req.body);
		res.json({ msg: "Article added successfully", article });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: "Unable to add this article" });
	}
});

module.exports = router;
