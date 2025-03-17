// src/components/CountryFlagsContainer.js

import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import "./style.css";

const CountryFlagsContainer = () => {
  const API_ENDPOINT =
    "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
  const [flagData, setFlagData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetching the country flag data from the new API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(API_ENDPOINT);
        const jsonData = await data.json();

        // Remove duplicates based on country name (if the API returns duplicates)
        const uniqueCountries = Array.from(
          new Set(jsonData.map((country) => country.common)) // Ensure uniqueness by country name
        ).map((name) => {
          return jsonData.find((country) => country.common === name);
        });

        setFlagData(uniqueCountries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter countries based on the search term (with safety checks)
  const filteredCountries = flagData.filter((country) => {
    // Check if country.common is defined and is a string before using toLowerCase
    return (
      country.common &&
      typeof country.common === "string" &&
      country.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      {/* Pass search term and handleSearchChange to SearchBar component */}
      <SearchBar
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      {/* Display filtered countries */}
      <div className="country-flag-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard
              key={country.common} // Ensure unique key for each country by name
              name={country.common}
              flag={country.png}
            />
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default CountryFlagsContainer;