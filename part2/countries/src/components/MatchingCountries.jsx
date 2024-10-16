import React from 'react';
import { useState, useEffect } from 'react'

const MatchingCountries = ({ searchedCountry, allCountries, showCountry }) => {

  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    if (!searchedCountry) {
      setFilteredCountries([]);
    }

    setFilteredCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())));
  }, [searchedCountry, allCountries])

  useEffect(() => {

    if (filteredCountries && filteredCountries.length === 1) {
      showCountry(filteredCountries[0].name.common)
    }
  }, [filteredCountries])
  
  allCountries.filter(country =>
    country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
  );

  if (!searchedCountry) {
    return <p>Start typing to search for countries...</p>;
  }

  if (filteredCountries.length === 0) {
    return <p>No matches found for "{searchedCountry}"</p>;
  }

  if (filteredCountries.length >= 11) {
    return <p>Too many matches, please refine your search</p>
  }

  if (filteredCountries.length === 1) {
    return null
  }

  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.name.common}>
          {country.name.common} 
          <button onClick={() => showCountry(country.name.common)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MatchingCountries;
