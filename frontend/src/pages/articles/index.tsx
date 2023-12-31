import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import SortableTable from "../../components/table/SortableTable";
import SearchArticles from "../../components/searchBar/SearchBar";

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
  ];

  const [searchResults, setSearchResults] = useState<ArticlesInterface[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:8082/api/article/search?q=${query}`);
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
        <SearchArticles onSearch={handleSearch} />
      </div>
      <SortableTable headers={headers} data={searchResults.length > 0 ? searchResults : articles} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/article");
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
