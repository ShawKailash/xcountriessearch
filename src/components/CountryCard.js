// src/components/CountryCard.js

import React from "react";
import "./CountryCard.css";

const CountryCard = ({ name, flag }) => {
  return (
    <div className="countryCard">
      <img src={flag} alt={`Flag of ${name}`} className="flag-img" />
      <h2>{name}</h2>
    </div>
  );
};

export default CountryCard;