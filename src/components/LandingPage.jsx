import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import "./LandingPage.css";

const LandingPage = () => {
  // functions to handle the state of array of countries
  const [countries, setCountries] = useState([]);

  // functions to handle the search inputs
  const [searchInput, setSearchInput] = useState("");

  // for debouncing
  const [debounceValue, setDebounceValue] = useState("");

  // for handling loading
  const [loading, setLoading] = useState(true);

  // function to handle change in search input
  const handleInputChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(debounceValue)
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(searchInput);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput]);

  // function to fetch the countries
  async function fetchCountries() {
    setLoading(true);
    try {
      let data = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
      );

      if (!data.ok) {
        throw new Error("Failed to fetch countries");
      }

      let json = await data.json();

      setCountries(json);
      console.log(json);
    } catch (error) {
      console.error("Error fetching countries: ", error);
    } finally {
      setLoading(false);
    }
  }

  // using useEffect to call the api on initial render
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="parent-div">
      <div className="search-div">
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search For Countries"
          className="search-input"
        />
      </div>
      <div className="countries-div">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="countries-container">
            {filteredCountries.map((country) => (
              <CountryCard key={country.common} data={country} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
