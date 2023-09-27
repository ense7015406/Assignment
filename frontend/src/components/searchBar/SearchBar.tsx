import { wrap } from "module";
import React, { useState } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = () => {
		onSearch(searchTerm);
	};

	return (
		<div>
			<input type="text" placeholder="Search Articles" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			<button onClick={handleSearch}>Search</button>
		</div>
	);
};

export default SearchBar;
