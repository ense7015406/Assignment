import React, { useState } from "react";
import styles from './SearchArticles.module.scss'; // Import your SCSS file

interface SearchArticlesProps {
    onSearch: (query: string) => void;
}

const SearchArticles: React.FC<SearchArticlesProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div className={styles.searchcontainer}>
            <input
                type="text"
                placeholder="Search articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchinput}
            />
            <button onClick={handleSearch} className={styles.searchbutton}>
                Search
            </button>
        </div>
    );
};

export default SearchArticles;
