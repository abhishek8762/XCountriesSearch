import React from "react";
import "./CountryCard.css";

const CountryCard = ({ data }) => {
  return (
    <div className="countryCard">
      <div className="flag-div">
        <img src={data.png} alt={data.common}></img>
      </div>
      <div className="country-name-div">
        <p>{data.common}</p>
      </div>
    </div>
  );
};

export default CountryCard;
