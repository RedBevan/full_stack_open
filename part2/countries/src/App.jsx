import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import MatchingCountries from './components/MatchingCountries'

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

  useEffect(() => {
    const getAllCountryNames = (countries) => {
      return countries.map(country => country.name.common)
    }
    setCountryNames(getAllCountryNames(allCountries))
  }, [allCountries])

  useEffect(() => {
    console.log(`Searching for ${searchedCountry}`);

    const countryMatches = countryNames.filter(country => country.toLowerCase().includes(searchedCountry.toLowerCase()))

    console.log(countryMatches)
    
    const countryToShow = countryMatches[0]

    console.log(countryToShow)

    setMatchingCountries(countryMatches)

    if (countryMatches.length === 1) {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryToShow}`)
      .then(response => {
        setDisplayedCountry(response.data)
      })
    } else {
      setDisplayedCountry(null)
    }
    }, [searchedCountry, countryNames])

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

  }

  return (
    <>
      <div>
        <h1>Country fact-o-meter</h1>
        <form>
          <div>
            Find countries: 
            <input 
            value={searchedCountry}
            onChange={handleCountryChange}
            />
          </div>
        </form>
        <MatchingCountries searchedCountry={searchedCountry} matchingCountries={matchingCountries} displayedCountry={displayedCountry} showCountry={showCountry}/>
        <div>
          <Country country={displayedCountry} />
        </div>
      </div>
    </>
  )
}

export default App
