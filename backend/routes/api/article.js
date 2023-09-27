const express = require("express");
const router = express.Router();

// Load Book model
const Article = require("../../models/Article");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test/articles", (req, res) => res.send("article route testing!"));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
	const searchQuery = req.query.q;

	// If a search query is provided, filter articles by title or other relevant fields
	const query = searchQuery
		? {
				$or: [
					{ title: { $regex: new RegExp(searchQuery, "i") } }, // Case-insensitive title search
					// Add more fields as needed for searching
				],
		  }
		: {};

	Article.find(query)
		.then((articles) => res.json(articles))
		.catch((err) => res.status(404).json({ nobooksfound: "No Articles found" }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req, res) => {
	const { id } = req.params;
	const searchQuery = req.query.q; // Get the search query from the URL

	// If a search query is provided, search by title; otherwise, search by ID
	const query = searchQuery
		? { title: { $regex: new RegExp(searchQuery, "i") } } // Case-insensitive title search
		: { _id: id }; // Search by ID if no query is provided

	Article.findOne(query)
		.then((article) => {
			if (!article) {
				return res.status(404).json({ nobookfound: "No Article found" });
			}
			return res.json(article);
		})
		.catch((err) => res.status(404).json({ nobookfound: "No Article found" }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post("/", (req, res) => {
	Article.create(req.body)
		.then((article) => res.json({ msg: "Article added successfully" }))
		.catch((err) => res.status(400).json({ error: "Unable to add this article" }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
	Article.findByIdAndUpdate(req.params.id, req.body)
		.then((article) => res.json({ msg: "Updated successfully" }))
		.catch((err) => res.status(400).json({ error: "Unable to update the Database" }));
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
	Article.findByIdAndRemove(req.params.id, req.body)
		.then((article) => res.json({ mgs: "Article entry deleted successfully" }))
		.catch((err) => res.status(404).json({ error: "No such an article" }));
});

module.exports = router;
