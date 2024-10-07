const MatchingCountries = ({ searchedCountry, matchingCountries }) => {

  if (searchedCountry === null) {
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

  if (matchingCountries.length <= 1000) {
    return (
      <>
        {matchingCountries.map((country) => {
          return (
            <ul key={country}>
              <li>{country}</li>
            </ul>
          )
          })}
      </>
    )
  }
}

export default MatchingCountries