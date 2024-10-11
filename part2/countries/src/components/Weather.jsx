import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ( { displayedCountry } ) => {

  const [weatherCountry, setWeatherCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

useEffect(() => {
  if (displayedCountry) {
    setWeatherCountry(displayedCountry)

    console.log(displayedCountry.latlng)

    const [lat, lng] = displayedCountry.latlng

    console.log(displayedCountry)

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=51fcb93bc42538c4fc1b8437243c3bc7`)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data)
        console.log(response.data.main.temp)
      })
      .catch(error => {
        console.log('Error fethcing weather data:', error)
      })
  }
}, [displayedCountry])

  if(!displayedCountry) {
    return null
  }
  
  if (!weatherData) {
    return (
      null
    )
  }
  
  return (
    <>
      <div>
       <h2>Current weather in {displayedCountry.name.common}</h2>
      </div>
      <div>
        <p>Lat: {displayedCountry.latlng[0]}</p>
        <p>Long: {displayedCountry.latlng[1]}</p>
      </div>
      <div>
        <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}</p>
      </div>
    </>
  )
}

export default Weather