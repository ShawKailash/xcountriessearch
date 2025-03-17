// src/components/SearchBar.js

import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;