import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing or invalid.")
      return
    }

    const capital = country.capital[0]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
      .then((response) => {
        setWeather(response.data)
        setError(null)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error)
        setError("Could not fetch weather data.")
      });
  }, [country, apiKey])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital?.[0]}</p>
      <p>area {country.area} km²</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags?.png}
        alt={`Flag of ${country.name.common}`}
        width="200px"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetail

