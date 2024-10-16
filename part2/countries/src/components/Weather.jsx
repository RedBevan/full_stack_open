import axios from 'axios'
import { useState, useEffect } from 'react'

const api_key = import.meta.env.VITE_SOME_KEY

const Weather = ( { displayedCountry } ) => {

  const [weatherCountry, setWeatherCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

useEffect(() => {
  if (displayedCountry) {
    setWeatherCountry(displayedCountry)

    const [lat, lng] = displayedCountry.latlng

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
      })
      .catch(error => {
        console.log('Error fetching weather data:', error)
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
       <h2>Current weather in {displayedCountry.name.common}: {weatherData.weather[0].main}</h2>
      </div>
      <div>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='weather-icon'/>
        <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C </p>
        <p>Wind speed: {weatherData.wind.speed} m/s</p>
      </div>
    </>
  )
}

export default Weather