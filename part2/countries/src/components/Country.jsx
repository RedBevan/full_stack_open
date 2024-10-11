const Country = ( {country} ) => {

  if (!country) {
    return (
      null
    )
  }

  return (
    <>

      <div>
        <h1>{country.name.common}</h1>
        <h2>(Officially known as {country.name.official})</h2>
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