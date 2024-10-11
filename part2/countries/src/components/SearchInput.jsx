import { useState, useEffect } from 'react'

const SearchInput = ({ searchedCountry, handleCountryChange }) => {

  const [fieldInput, setFieldInput] = useState('')

  useEffect(() => {
    setFieldInput(searchedCountry)
  }, [searchedCountry])

  const handleChange = (event) => {
    const newValue = event.target.value;
    setFieldInput(newValue)
    handleCountryChange(event)
  }

  return (
    <div>
      Find countries: 
        <input 
        value={searchedCountry}
        onChange={handleChange}
        />
    </div>
  )
}

export default SearchInput