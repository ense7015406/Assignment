import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import SortableTable from "../components/table/SortableTable";
import SearchArticles from "../components/searchBar/SearchBar";
import styles from "../../styles/HomePage.module.scss";

interface ArticlesInterface {
	title: string;
	authors: string;
	journal: string;
	volume: string;
	number: string;
	pages: string;
	pubyear: string;
	doi: string;
	claim: string;
	actions: string;
	
}
type ArticlesProps = {
	articles: ArticlesInterface[];
};


const Articles: NextPage<ArticlesProps> = ({ articles }) => {
	const headers: { key: keyof ArticlesInterface; label: string }[] = [
	{ key: "title", label: "Title" },
	{ key: "authors", label: "Authors" },
	{ key: "journal", label: "Journal" },
	{ key: "volume", label: "Volume" },
	{ key: "number", label: "Number" },
	{ key: "pages", label: "Pages" },
	{ key: "pubyear", label: "Publication Year" },
	{ key: "doi", label: "DOI" },
	{ key: "claim", label: "Claim" },
	{ key: "actions", label: "Actions" }, // "actions" is a valid key
  ];

	const [searchResults, setSearchResults] = useState<ArticlesProps[]>([]);

	const handleSearch = async (query: string) => {
		try {
			const response = await fetch(`http://localhost:8082/api/modarticle/search?q=${query}`);
			if (response.ok) {
				const data = await response.json();
				setSearchResults(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Function to add an article to the main database
	const handleAddArticle = async (articleData: ArticlesInterface) => {
		try {
		  const response = await fetch("http://localhost:8082/api/article/add/" + articleData.title, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(articleData),
		  });
	  
		  if (response.ok) {
			const data = await response.json();
			if (data.msg === "Article added successfully") {
			  console.log("Article added successfully");
			  handleDeleteArticle(articleData.title);
			  window.location.reload();
			  alert("Article added successfully");
			} else if (data.msg === "Article already exists") {
			  alert("Article already exists");
			}
		  } else {
			console.error("Failed to add the article");
			alert("Something went wrong, please try again!");
		  }
		} catch (error) {
		  console.error(error);
		}
	  };
	  
	  
	  
	
	// Function to delete an article
	const handleDeleteArticle = async (articleTitle: string) => {
		try {
			const response = await fetch(`http://localhost:8082/api/modarticle/delete/${articleTitle}`, {
			  method: "DELETE",
			});
			if (response.ok) {

			  console.log("Article deleted successfully");
			  window.location.reload();
			  alert("Article added successfully");
			} else {
			  console.error("Failed to delete the article");
			  alert("Something wrong, please try again!");
			}
		  } catch (error) {
			console.error(error);
		  }
	};

	return (
		<div className="container">
		  <h1>Moderator View</h1>
		  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
			<p>Page containing a table of articles:</p>
			<SearchArticles onSearch={handleSearch} />
		  </div>
		  <SortableTable
			headers={headers}
			data={searchResults.length ? searchResults : articles}
			renderCell={(article, key) => {
			  if (key === "actions") {
				return (
				  <div style={{display: "flex", justifyContent: "space-evenly"}}>
					<button className={styles.addButton} onClick={() => handleAddArticle(article)}>Add</button>
					<button className={styles.deleteButton} onClick={() => handleDeleteArticle(article.title)}>Delete</button>
				  </div>
				);
			  }
			  return article[key];
			}}
		  />
		</div>
	  );
	};

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
	try {
		const response = await fetch("http://localhost:8082/api/modarticle"); // Update the URL to match your API endpoint
		if (!response.ok) {
			throw new Error("Failed to fetch articles");
		}
		const articles = await response.json();

		return {
			props: {
				articles,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				articles: [],
			},
		};
	}
};

export default Articles;
