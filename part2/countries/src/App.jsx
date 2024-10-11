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
  const [countryNames, setCountryNames] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountries(response.data)
    })
  }, [])

  const handleCountryChange = (event) => {
    setSearchedCountry(event.target.value)
  };

  const showCountry = (country) => {
    console.log(country)

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        setDisplayedCountry(response.data)
      })
      setSearchedCountry('')
  }

  return (
    <>
      <div>
        <h1>Country fact-o-meter</h1>
        
        <SearchInput
          searchCountry={searchedCountry}
          handleCountryChange={handleCountryChange}
        />

        <MatchingCountries
        searchedCountry={searchedCountry} allCountries={allCountries}
        showCountry={showCountry}
        />

        <Country country={displayedCountry} />

        <Weather displayedCountry={displayedCountry} />


      </div>
    </>
  )
}

export default App
