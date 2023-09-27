import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import SortableTable from "../../components/table/SortableTable";

interface ArticlesInterface {
	id: string;
	title: string;
	authors: string;
	source: string;
	pubyear: string;
	doi: string;
	claim: string;
	evidence: string;
}
type ArticlesProps = {
	articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
	const headers: { key: keyof ArticlesInterface; label: string }[] = [
		{ key: "title", label: "Title" },
		{ key: "authors", label: "Authors" },
		{ key: "source", label: "Source" },
		{ key: "pubyear", label: "Publication Year" },
		{ key: "doi", label: "DOI" },
		{ key: "claim", label: "Claim" },
		{ key: "evidence", label: "Evidence" },
	];

	const [searchResults, setSearchResults] = useState<ArticlesProps[]>([]);

	const handleSearch = async (query: string) => {
		try {
			const response = await fetch(`/api/articles?q=${query}`);
			if (response.ok) {
				const data = await response.json();
				setSearchResults(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container">
			<h1>Articles Index Page</h1>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<p>Page containing a table of articles:</p>
				<SearchBar onSearch={handleSearch} />
			</div>
			<SortableTable headers={headers} data={articles} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
	try {
		const response = await fetch("http://localhost:8082/api/article"); // Update the URL to match your API endpoint
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
