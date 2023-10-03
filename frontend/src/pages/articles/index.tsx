import { GetServerSideProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";

interface ArticlesInterface {
	id: string;
	title: string;
	authors: string;
	pubyear: string;
	volume: string;
	number: string;
	pages: string;
	doi: string;
}
type ArticlesProps = {
	articles: ArticlesInterface[];
};
const Articles: NextPage<ArticlesProps> = ({ articles }) => {
	const headers: { key: keyof ArticlesInterface; label: string }[] = [
		{ key: "title", label: "Title" },
		{ key: "authors", label: "Authors" },
		{ key: "pubyear", label: "Publication Year" },
		{ key: "volume", label: "Volume" },
		{ key: "number", label: "Number" },
		{ key: "pages", label: "Pages" },
		{ key: "doi", label: "DOI" },
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
