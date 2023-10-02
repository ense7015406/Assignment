import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import SortableTable from "../../components/table/SortableTable";
import { TRUE } from "sass";

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

	return (
		<div className="container">
			<h1>Articles Index Page</h1>
			<p>Page containing a table of articles:</p>
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
