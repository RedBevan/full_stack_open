import axios from 'axios'
import { useState, useEffect } from 'react'

const api_key = import.meta.env.VITE_SOME_KEY

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
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data)

        console.log(response.data.weather[0].icon)
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