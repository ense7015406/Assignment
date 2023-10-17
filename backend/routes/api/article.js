const express = require("express");
const bibtexParser = require('bibtex-parser');
const bodyParser = require("body-parser");
const router = express.Router();
const Article = require("../../models/Article");

// Lets router handle text.
router.use(bodyParser.text({ type: "text/plain" }));

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

// Add a new article via bibtex upload
router.post("/upload-bibtex", async (req, res) => {
	try {
		const bibtexContent = req.body;

		//Parse bibtex data.
		const bibData = bibtexParser(bibtexContent);

		//Make a new object out of the first attribute of bibData(for some reason it puts the object inside an object).
		const entryKeys = Object.keys(bibData);
		const firstEntry = bibData[entryKeys[0]];
		
		const title = firstEntry.TITLE;	
		let authors = firstEntry.AUTHOR;
		const journal = firstEntry.JOURNAL;
		const volume = firstEntry.VOLUME;
		const number = firstEntry.NUMBER;
		const pages = firstEntry.PAGES;
		const pubyear = firstEntry.YEAR;
		const doi = '';

		// Create a new Article object
		const article = new Article({
			title,
			authors,
			journal,
			volume,
			number,
			pages,
			pubyear,
			doi,
		});

		Article.create(article);

	} catch(err) {
		console.error(err);
		res.status(400).json({ error: "Unable to add this article" });
	}
})

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
