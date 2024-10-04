const Country = ( {country} ) => {

  if (!country) {
    return (
      null
    )
  }

  return (
    <>
      <div>
        <h2>{country.name.common}</h2>
        <h3>(Officially known as {country.name.official})</h3>
      </div>
      <div>
        <p>Capital city: {country.capital}</p>
        <p>Borders {country.borders.length} {country.borders.length === 1 ? 'other country' : 'other countries'}</p>
      </div>
      <div>
        <img src={country.flags.png} alt="country flag"></img>

      </div>
    </>
  )
}

export default Country