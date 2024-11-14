import React from 'react';

const CountryList = ({ countries, setSelectedCountry }) => {
  return (
    <div>
      {countries.map(country => (
        <p key={country.cca3} onClick={() => setSelectedCountry(country)}>
          {country.name.common}
        </p>
      ))}
    </div>
  );
};

export default CountryList;
