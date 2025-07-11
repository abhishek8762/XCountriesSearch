import React from 'react';

import './style.css';
const Card = ({country}) => {
  return (
    <div className="countryCard">
      <div className="card-image" key={country.altSpellings[0]}>
          <img src={country.flags.svg} alt={country.altSpellings[0]} />
      </div>
      <h2>{country.name.common}</h2>
    </div>
  )
}

export default Card;