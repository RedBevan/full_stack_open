const CountryDisplay = ({ displayedCountry }) => {

  if (!displayedCountry) {
    return (
      null
    )
  }

  return (
    <>

      <div>
        <h1>{displayedCountry.name.common}</h1>
        <h2>(Officially known as {displayedCountry.name.official})</h2>
      </div>
      <div>
        <p>Capital city: {displayedCountry.capital}</p>
        <p>Borders {displayedCountry.borders.length} {displayedCountry.borders.length === 1 ? 'other country' : 'other countries'}</p>
      </div>
      <div>
        <img src={displayedCountry.flags.png} alt="country flag" className='flag'></img>
      </div>

    </>
  )
}

export default CountryDisplay