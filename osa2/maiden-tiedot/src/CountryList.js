import React from 'react'
import './CountryList.css'

const CountryList = ({ countries, setSelectedCountry }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3} className="country-item">
          <p>{country.name.common}</p>
          <button className="show-button" onClick={() => setSelectedCountry(country)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
