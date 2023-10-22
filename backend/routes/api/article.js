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
		const searchResults = await Article.find({
			$or: [{ title: { $regex: query, $options: "i" } }, { authors: { $regex: query, $options: "i" } }, { pubyear: { $regex: query, $options: "i" } }],
		});
		res.json(searchResults);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "An error occurred while searching for articles" });
	}
});

// Add an article to the main database
router.post("/article/add/:title", async (req, res) => {
  const title = req.params.title; // Retrieve the article title from the URL parameter
  const articleData = req.body; // Retrieve article data from the request body

  try {
    const existingArticle = await Article.findOne({ title });

    if (existingArticle) {
      return res.json({ msg: "Article already exists", article: existingArticle });
    }

    const newArticle = new Article(articleData);
    
    newArticle.title = title;

    await newArticle.save();

    res.json({ msg: "Article added successfully", article: newArticle });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Unable to add this article" });
  }
});
  
  
module.exports = router;
