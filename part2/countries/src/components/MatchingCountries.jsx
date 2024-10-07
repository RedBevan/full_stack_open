const MatchingCountries = ({ searchedCountry, matchingCountries, displayedCountry, showCountry }) => {

  if (searchedCountry === null) {
    return (
        null
    )
  }

  if (displayedCountry != null) {
    return (
      null
    )
  }

  if (matchingCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter </p>
      </div>
    )
  }

  if (matchingCountries.length <= 10) {
    return (
      <>
        {matchingCountries.map((country) => {
          return (
            <ul key={country}>
              <li>{country}</li><button onClick={() => showCountry(country)}>show</button>
            </ul>
          )
          })}
      </>
    )
  }
  return null
}

export default MatchingCountries