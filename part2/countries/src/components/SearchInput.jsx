const SearchInput = ({ searchedCountry, handleCountryChange }) => {

  return (
    <div>
      Find countries: 
        <input 
        value={searchedCountry}
        onChange={handleCountryChange}
        />
    </div>
  )
}

export default SearchInput