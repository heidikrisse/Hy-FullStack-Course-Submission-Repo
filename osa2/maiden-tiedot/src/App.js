import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './CountryList'
import CountryDetail from './CountryDetail'
import './App.css'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if (query) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filtered = response.data.filter(country =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          )
          setCountries(filtered);
          setSelectedCountry(null); // Reset selected country on new search
        })
    } else {
      setCountries([])
    }
  }, [query])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="App">
      <div className="search-container">
        <label htmlFor="search-input">find countries</label>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Type a country name..."
        />
      </div>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length === 1 ? (
        <CountryDetail country={countries[0]} />
      ) : selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <CountryList countries={countries} setSelectedCountry={setSelectedCountry} />
      )}
    </div>
  )
}

export default App
