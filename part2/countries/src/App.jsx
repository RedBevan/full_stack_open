import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import MatchingCountries from './components/MatchingCountries'
import Weather from './components/Weather'
import SearchInput from './components/SearchInput'

const App = () => {
  const [searchedCountry, setSearchedCountry] = useState('')
  const [displayedCountry, setDisplayedCountry] = useState(null)
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountries(response.data)
    })
  }, [])

  useEffect(() => {

    if (!searchedCountry) {
      setDisplayedCountry(null)
    }
  }, [searchedCountry])

  const handleCountryChange = (event) => {
    setSearchedCountry(event.target.value)
  };

  const showCountry = (country) => {
    console.log(country)

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        setDisplayedCountry(response.data);
      })
      // setSearchedCountry('')
  }

  return (
    <>
      <div>
        <h1>Country fact-o-meter</h1>
        
        <SearchInput
          searchedCountry={searchedCountry}
          handleCountryChange={handleCountryChange}
        />

        <MatchingCountries
        searchedCountry={searchedCountry} allCountries={allCountries}
        showCountry={showCountry}
        />

        <Country displayedCountry={displayedCountry} searchedCountry={searchedCountry} />

        <Weather displayedCountry={displayedCountry} />


      </div>
    </>
  )
}

export default App
